# ServeFlow — Tenant Isolation & Row-Level Security (RLS)

## 1. Principles of Tenant Isolation

1. **Logical Separation with Strong Cryptographic Verification**: In ServeFlow, all tenant data is housed in a high-performance shared PostgreSQL database. Logical isolation is strictly guaranteed at every application and database layer.
2. **Double-Barricade Isolation Architecture**:
   - **Layer 1 (Application / ORM Guardrails via Prisma Client Extensions)**: Every Prisma database query automatically injects `tenantId` and `outletId` filters via NestJS contextual execution scoping (`AsyncLocalStorage`) and Prisma Client Extensions.
   - **Layer 2 (PostgreSQL Row-Level Security - RLS)**: The database engine enforces row-level policies on every table containing `tenant_id` and `outlet_id`. Queries attempting to access data across tenant boundaries are rejected at the database engine level.

---

## 2. PostgreSQL Row-Level Security (RLS) Blueprint

### 2.1 RLS Migration & Policies
```sql
-- Enable Row Level Security on Core Multi-Tenant Operational Tables
ALTER TABLE "outlets" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "dining_areas" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "tables" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "table_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "kitchen_stations" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "menu_categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "menu_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "modifier_groups" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "orders" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "order_items" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "bills" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "payments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "audit_logs" ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation Policies
CREATE POLICY tenant_isolation_policy ON "orders"
    AS RESTRICTIVE
    USING (
      tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid
      OR NULLIF(current_setting('app.bypass_rls', true), 'false')::boolean = true
    );

CREATE POLICY outlet_isolation_policy ON "orders"
    AS RESTRICTIVE
    USING (
      outlet_id = NULLIF(current_setting('app.current_outlet_id', true), '')::uuid
      OR NULLIF(current_setting('app.bypass_rls', true), 'false')::boolean = true
    );
```

### 2.2 PostgreSQL Connection Pooling & PgBouncer Context Safety
> [!IMPORTANT]
> When using connection pooling (such as PgBouncer in transaction mode or Prisma Accelerate), session-level variables (`SET app.current_tenant_id`) can leak across pooled connections if not scoped strictly to transactions.
>
> **Strict Implementation Invariant**:
> In ServeFlow, RLS session settings MUST use transaction-local configuration:
> ```sql
> SET LOCAL app.current_tenant_id = 'tenant-uuid';
> SET LOCAL app.current_outlet_id = 'outlet-uuid';
> ```
> `SET LOCAL` guarantees that the variable scope expires automatically as soon as the transaction (`COMMIT` or `ROLLBACK`) completes, ensuring zero cross-connection contamination in pooled environments.

### 2.3 Prisma Client Extension & AsyncLocalStorage Integration
```typescript
import { AsyncLocalStorage } from 'async_hooks';
import { PrismaClient } from '@prisma/client';

export interface RequestTenantContext {
  tenantId?: string;
  outletId?: string;
  userId?: string;
  bypassRls?: boolean;
}

export const tenantStorage = new AsyncLocalStorage<RequestTenantContext>();

export const createPrismaExtendedClient = (prisma: PrismaClient) => {
  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          const context = tenantStorage.getStore();
          
          // Execute within interactive transaction applying SET LOCAL for PostgreSQL RLS
          if (context?.tenantId && !context.bypassRls) {
            return prisma.$transaction(async (tx) => {
              await tx.$executeRawUnsafe(
                `SET LOCAL app.current_tenant_id = '${context.tenantId}';`
              );
              if (context.outletId) {
                await tx.$executeRawUnsafe(
                  `SET LOCAL app.current_outlet_id = '${context.outletId}';`
                );
              }
              // Automatically reinforce with Prisma-level where clause filter
              if (args && 'where' in args && args.where) {
                args.where = { ...args.where, tenantId: context.tenantId };
              }
              return query(args);
            });
          }
          return query(args);
        },
      },
    },
  });
};
```

---

## 3. Background Jobs, Asynchronous Queues & RLS

When executing asynchronous background jobs (e.g., BullMQ workers processing Razorpay webhooks, automated night-audit reports, WhatsApp delivery jobs):
1. **Explicit Context Rehydration**: Background job payloads MUST encapsulate `{ tenantId, outletId }`.
2. The worker handler wraps execution inside `tenantStorage.run({ tenantId, outletId }, async () => { ... })`.
3. System-wide background sweeps (e.g., archiving expired 30-day trial subscriptions across all tenants) MUST explicitly set `bypassRls: true` via an internal `SuperAdminExecutionContext` with audit logging.

---

## 4. QR Token Isolation & Tamper Resistance

- Dynamic QR codes do **not** rely on plain table IDs in URLs (e.g., `serveflow.in/order?tableId=5` is strictly forbidden).
- Every QR code embeds a cryptographically signed HMAC-SHA256 token:
  $$\text{QR Token} = \text{Base64Url}(\text{TenantID} \mathbin{\Vert} \text{OutletID} \mathbin{\Vert} \text{TableID} \mathbin{\Vert} \text{Version} \mathbin{\Vert} \text{HMAC})$$
- When resolved, the backend verifies the signature using the platform QR secret (`QR_SIGNING_SECRET`). If verified, the session is isolated strictly to that table and outlet.
- Revoking a table's QR code updates `table.qr_version` in the database, instantly invalidating any printed or photographed old QR codes across memory caches and database queries.
