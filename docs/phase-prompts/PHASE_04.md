# ServeFlow — Implementation Prompt: Phase 04

## 1. Phase Title
**PHASE 04 — Super Admin SaaS Control Plane & Global Operations**

---

## 2. Objective
Build the platform Super Admin control plane for ServeFlow operators to manage restaurant tenants, monitor subscriptions, audit platform telemetry, provision manual tenants, and inspect global health.

---

## 3. Business Context
During initial commercial launch, the ServeFlow team manually onboards restaurants. The Super Admin interface provides the master operational cockpit for our engineering and support staff.

---

## 4. Prerequisites
- Phase 01, 02, and 03 completed.
- Super Admin user seeded in database.

---

## 5. Exact Scope
- Super Admin API endpoints in NestJS under `/api/v1/super-admin`: Tenant listing, creation, suspension, subscription modification, and global metrics.
- Frontend Super Admin Dashboard under `apps/web/app/(super-admin)`:
  - Tenant directory with search, filtering, and status badges.
  - Tenant provisioning modal (Name, slug, owner email, initial plan).
  - Tenant detail view showing outlets, active tables, and monthly volume.
  - Global system telemetry (Total Active Tenants, Monthly Recurring Revenue, System Health).

---

## 6. Out-of-Scope Features
- End-user restaurant operations (KDS, POS, Waiter).
- Customer self-ordering.

---

## 7. Required Frontend Implementation
- Professional enterprise data table using shadcn/ui components (`DataTable`, `Dialog`, `Badge`, `DropdownMenu`).
- Sidebar navigation dedicated to Super Admin (`/super-admin/tenants`, `/super-admin/subscriptions`, `/super-admin/audit-logs`).
- Real-time client search and server-side pagination.

---

## 8. Required Backend Implementation
- `SuperAdminModule` in NestJS with `SuperAdminController` and `SuperAdminService`.
- Guard enforcing `Role.SUPER_ADMIN` on all routes.
- Transactional tenant creation: Provisions `Tenant`, primary `Outlet`, and initial `User` (Owner) with a temporary secure password.

---

## 9. Database Changes
- None (Leverages core tables created in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/super-admin/tenants`: Returns paginated list of tenants with outlet count.
- `POST /api/v1/super-admin/tenants`: Body `{ name, slug, ownerEmail, ownerName, planTier }`.
- `PATCH /api/v1/super-admin/tenants/:id/status`: Body `{ status: "ACTIVE" | "SUSPENDED" }`.
- `GET /api/v1/super-admin/metrics`: Platform aggregated stats.

---

## 11. Authentication and Authorization Requirements
- Only authenticated users with `role: "SUPER_ADMIN"` can access these endpoints. Attempting access with any other role returns `403 Forbidden`.

---

## 12. UI/UX Requirements
- Clean, high-density layout. Strict visual status indicators (Active = Emerald, Suspended = Crimson).

---

## 13. Edge Cases
- Tenant slug collision: Slugs must be unique; return user-friendly validation error if slug is already taken.
- Deactivating a tenant must immediately revoke access for all associated employees.

---

## 14. Error Handling
- Structured error envelopes with clear error codes.

---

## 15. Security Considerations
- Comprehensive audit logging: Every Super Admin action (tenant creation, status change) must generate an immutable entry in `AuditLog`.

---

## 16. Unit Testing
- Unit tests for `SuperAdminService` validating tenant provisioning transactions.

---

## 17. Integration Testing
- Integration tests verifying non-super-admin roles receive `403 Forbidden`.

---

## 18. End-to-End Testing
- Playwright test: Super Admin logs in, opens tenant list, creates new tenant, and verifies tenant appears in table.

---

## 19. Acceptance Criteria
1. Super Admin can list, filter, and search tenants.
2. Super Admin can provision a new restaurant tenant and primary owner in a single transaction.
3. Suspending a tenant prevents staff login.
4. All actions recorded in audit logs.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 04 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/super-admin/**`
- `apps/web/app/(super-admin)/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(super-admin): complete phase 04 super admin control plane`.

---

## 23. Final Completion Report Format
- Summary of Super Admin endpoints and UI views.
- Screenshots or test logs of tenant creation flow.
