# ServeFlow — Testing Strategy & Quality Assurance

## 1. Testing Pyramid Architecture

```
        ▲
       / \
      /E2E\         10% Playwright (Critical Customer & POS Journeys)
     /-----\
    / Integ \       30% NestJS Supertest & Prisma Test Container
   /---------\
  /   Unit    \     60% Vitest / Jest (Business Logic, GST, RBAC, Zod)
 /-------------\
```

---

## 2. Test Suites & Tooling

### 2.1 Unit Tests (Vitest / Jest)
- **Scope**: GST calculation algorithms, split-bill rounding logic, Zod validation schemas, QR HMAC generation & verification, RBAC permission resolvers.
- **Requirement**: Target > 85% branch coverage on core business calculation modules (`billing`, `tax`, `auth`, `qr`).

### 2.2 Integration Tests (NestJS Supertest + PostgreSQL)
- **Scope**: Controller endpoints, Prisma database persistence, transaction rollbacks, tenant isolation leaks (testing that Tenant A cannot query Tenant B's data).
- **Setup**: Dedicated ephemeral test database with isolated schema fixtures per test suite.

### 2.3 End-to-End (E2E) Tests (Playwright)
- **Scope**:
  1. Complete Customer Journey: Scan QR -> Browse Menu -> Add Modifiers -> Place Order -> Verify KDS Ticket.
  2. Complete POS Journey: Open Table -> Add Items -> Apply Discount -> Settle Split Bill -> Generate Invoice.
  3. Super Admin Journey: Onboard Tenant -> Configure Outlet -> Provision Owner.

---

## 3. Continuous Integration Quality Gates

Before merging any pull request or completing any implementation phase:
1. `pnpm run lint`: Zero ESLint or Prettier warnings.
2. `pnpm run typecheck`: Strict TypeScript compilation across all apps and packages (`tsc --noEmit`).
3. `pnpm run test`: All unit and integration test suites pass with zero failures.
4. `pnpm run test:e2e`: Core Playwright smoke tests pass.
