# ServeFlow — Implementation Prompt: Phase 06

## 1. Phase Title
**PHASE 06 — Employee, Designation & Kitchen Station Management**

---

## 2. Objective
Build comprehensive employee account management, custom job titles/designations, kitchen station definitions (e.g., Tandoor, Main Kitchen, Bar), and staff-to-station routing assignments.

---

## 3. Business Context
Restaurants have diverse staffing structures. Owners must be able to invite staff (managers, cashiers, waiters, chefs), assign custom designations (e.g., "Senior Mixologist", "Head Halwai"), and route orders to specific kitchen prep stations.

---

## 4. Prerequisites
- Phase 01 through Phase 05 completed.
- Active restaurant tenant and outlet configured.

---

## 5. Exact Scope
- Staff management backend in `UsersModule`: Create, update, deactivate staff accounts; assign roles and custom designations.
- Kitchen station management in `OutletsModule`: Define preparation stations (`Tandoor`, `Chinese & Wok`, `Curry`, `Beverage & Bar`, `Dessert`).
- Staff dashboard interface under `apps/web/app/(dashboard)/staff`:
  - Employee roster with role badges, status switches, and edit modals.
  - Add Employee modal with temporary password generation or invite link.
- Kitchen stations interface under `apps/web/app/(dashboard)/stations`:
  - Create station, assign designated chefs, and configure optional station ticket printers.

---

## 6. Out-of-Scope Features
- Clock-in/clock-out attendance logging.
- Tip distribution calculations (reserved for Phase 12).

---

## 7. Required Frontend Implementation
- Staff data table with search by name, email, or role filter.
- Role selector adhering to `docs/ROLE_PERMISSION_MATRIX.md`.
- Station assignment multi-select tags.

---

## 8. Required Backend Implementation
- `UsersService` with password hashing and tenant isolation checks.
- Guard preventing managers from editing owner credentials or elevating their own privileges.
- `KitchenStationsService` handling CRUD operations on `KitchenStation` records.

---

## 9. Database Changes
- None (Models created in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/users`: List staff assigned to outlet.
- `POST /api/v1/outlets/:outletId/users`: Create employee `{ fullName, email, phone, role, designation, password }`.
- `PATCH /api/v1/outlets/:outletId/users/:userId`: Update employee details or status (`isActive`).
- `GET /api/v1/outlets/:outletId/stations`: List kitchen stations.
- `POST /api/v1/outlets/:outletId/stations`: Create kitchen station `{ name, printerIp }`.

---

## 11. Authentication and Authorization Requirements
- Restricted to `RESTAURANT_OWNER` and `RESTAURANT_MANAGER` roles.

---

## 12. UI/UX Requirements
- Clean, responsive layouts. Status toggle switches for immediate account activation/deactivation.

---

## 13. Edge Cases
- Preventing an owner from accidentally deactivating their own account.
- Ensuring unique emails across active users.

---

## 14. Error Handling
- Return clear error if email already exists within the tenant.

---

## 15. Security Considerations
- Zero plaintext password storage.
- Deactivating an employee immediately invalidates their active JWT sessions and refresh tokens in Redis.

---

## 16. Unit Testing
- Unit tests for user creation service and role hierarchy validation.

---

## 17. Integration Testing
- Integration tests ensuring managers cannot escalate privileges or create super-admin accounts.

---

## 18. End-to-End Testing
- Playwright test: Owner creates a Chef account, creates a "Grill" station, and assigns the chef to the station.

---

## 19. Acceptance Criteria
1. Owner and Manager can create and deactivate staff accounts.
2. Custom designations can be assigned without altering underlying RBAC permissions.
3. Kitchen stations can be created and managed per outlet.
4. Deactivated employees cannot log into any interface.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 06 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/users/**`
- `apps/api/src/modules/outlets/**`
- `apps/web/app/(dashboard)/staff/**`
- `apps/web/app/(dashboard)/stations/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(staff): complete phase 06 employee and kitchen station management`.

---

## 23. Final Completion Report Format
- Summary of user and station management features.
- Test logs and security verification.
