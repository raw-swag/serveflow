# ServeFlow — Implementation Prompt: Phase 02

## 1. Phase Title
**PHASE 02 — Database Schema, Prisma ORM, RLS Migrations & Multi-Tenant Foundations**

---

## 2. Objective
Establish the relational PostgreSQL database schema using Prisma ORM in `packages/database`, incorporating complete multi-tenant models (`Tenant`, `Outlet`, `User`, `DiningArea`, `Table`, `TableSession`, `KitchenStation`, `MenuCategory`, `MenuItem`, `ItemVariant`, `ModifierGroup`, `ModifierOption`, `Order`, `OrderItem`, `Bill`, `Payment`, `AuditLog`, `Subscription`), composite performance indexing, soft-deletes, PostgreSQL Row-Level Security (RLS) migration scripts with `SET LOCAL` transaction context, and idempotent seeders.

---

## 3. Business Context
ServeFlow is a multi-tenant commercial SaaS platform. Data isolation must be baked into the relational foundations from day one, ensuring no possibility of cross-restaurant data leakage while supporting multi-outlet restaurant hierarchies.

---

## 4. Prerequisites
- Phase 01 completed and verified.
- PostgreSQL 16+ database available (local Docker container or cloud instance).

---

## 5. Exact Scope
- Implement complete `schema.prisma` in `packages/database/prisma/schema.prisma` conforming strictly to `docs/DATABASE_SCHEMA.md`.
- Configure models with all required relations:
  - Multi-tenant hierarchy: `Tenant`, `Outlet`, `Subscription`.
  - Identity & RBAC: `User`, `CustomRole`, `AuditLog`.
  - Operations & Floor: `DiningArea`, `Table`, `TableSession`, `KitchenStation`.
  - Catalog & Modifiers: `MenuCategory`, `MenuItem`, `ItemVariant`, `ModifierGroup`, `ModifierOption`.
  - Orders & POS: `Order`, `OrderItem`, `OrderItemModifier`, `Bill`, `Payment`.
- Implement Prisma Client service in `apps/api/src/database/prisma.service.ts` with extended client hooks for `tenantStorage` (AsyncLocalStorage).
- Implement RLS SQL migration applying tenant isolation policies using `SET LOCAL app.current_tenant_id` compatible with connection pooling.
- Create comprehensive seed script (`packages/database/prisma/seed.ts`) populating demo tenants, outlets, tables, sample menus, and staff roles with hashed passwords.

---

## 6. Out-of-Scope Features
- Full HTTP CRUD controllers (reserved for upcoming domain phases).
- Live Razorpay payment gateway API calls or webhook processing (Phase 12).
- Real-time WebSocket gateway connections (Phase 10).

---

## 7. Required Frontend Implementation
- None in this phase. Prisma client models and types are exported and consumed by shared packages.

---

## 8. Required Backend Implementation
- Database module (`DatabaseModule`) in NestJS with connection pooling configuration.
- Prisma extension or query middleware enforcing `tenantId` filtering and injecting transaction-scoped `SET LOCAL app.current_tenant_id`.
- Graceful shutdown hooks for database connections in NestJS lifecycle.

---

## 9. Database Changes
- Initial PostgreSQL migration creating all core relational tables, foreign key constraints, composite indexes (`[tenant_id, outlet_id]`, `[outlet_id, status]`, `[outlet_id, created_at]`), and RLS security policies.

---

## 10. API Endpoints and Contracts
- Internal database health check in `HealthController` (`GET /api/v1/health`) verifying PostgreSQL query response time and migration version.

---

## 11. Authentication and Authorization Requirements
- Database connection strings secured via environment variables (`DATABASE_URL`, `DATABASE_DIRECT_URL`).
- System-level seeder runs with elevated database user; application operates under least-privilege connection.

---

## 12. UI/UX Requirements
- None.

---

## 13. Edge Cases
- Cascade delete handling: Deleting an outlet must soft-delete or protect historical financial bills and orders to comply with tax audit regulations.
- Decimal precision for Indian currency (INR) and fractional tax percentages (e.g., `Decimal(10, 2)`).
- PgBouncer / Connection Pool recycling: Verifying `SET LOCAL` resets completely upon transaction commit/rollback.

---

## 14. Error Handling
- Catch and normalize Prisma unique constraint violations (`P2002`) into clean HTTP 409 Conflict responses.
- Catch foreign key constraint violations (`P2003`) into HTTP 400 Bad Request responses.

---

## 15. Security Considerations
- No plaintext credentials in seeders; sample users must have bcrypt-hashed passwords (cost >= 12).
- RLS enabled on all multi-tenant tables.
- Zero raw unescaped SQL queries.

---

## 16. Unit Testing
- Unit tests for Prisma extension verifying `tenantId` is automatically injected into queries.
- Unit tests validating decimal rounding behavior on monetary models.

---

## 17. Integration Testing
- Integration tests executing database queries against a test PostgreSQL instance.
- Dedicated multi-tenant security test: Assert that a query under Tenant A context cannot view records belonging to Tenant B under PostgreSQL RLS.

---

## 18. End-to-End Testing
- Seeder execution test confirming all relational entities populate correctly without foreign key or constraint errors.

---

## 19. Acceptance Criteria
1. `prisma migrate dev` executes without error, producing a valid schema migration.
2. `prisma db seed` successfully populates demo tenants, outlets, and users.
3. Prisma Client compiles and exports type definitions into `packages/database`.
4. Multi-tenant isolation verified by integration tests under PostgreSQL RLS.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 02 completion details.

---

## 21. Files/Modules Expected to Change
- `packages/database/prisma/schema.prisma`
- `packages/database/prisma/migrations/**`
- `packages/database/prisma/seed.ts`
- `apps/api/src/database/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(database): complete phase 02 schema and tenant isolation`.

---

## 23. Final Completion Report Format
- Schema migration summary.
- List of seeded test records.
- Integration test verification logs proving RLS cross-tenant rejection.
