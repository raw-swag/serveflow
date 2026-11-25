# ServeFlow — Implementation Prompt: Phase 03

## 1. Phase Title
**PHASE 03 — Authentication Engine & Fine-Grained Role-Based Access Control (RBAC)**

---

## 2. Objective
Implement secure multi-tenant authentication and fine-grained authorization in NestJS and Next.js, including JWT access/refresh token rotation, password hashing (bcrypt/Argon2), role guards, permission decorators, and user profile management.

---

## 3. Business Context
ServeFlow supports multiple roles (Super Admin, Restaurant Owner, Branch Manager, Cashier, Waiter, Chef). Staff must log into their specific tenant and outlet securely with individual accounts, maintaining complete audit trails.

---

## 4. Prerequisites
- Phase 01 & Phase 02 completed.
- User and Tenant tables populated in database.

---

## 5. Exact Scope
- Backend `AuthModule` in NestJS: Login, Token Refresh, Logout, and Current User (`/me`).
- Password security: Hashing with salt rounds >= 12; password strength validation.
- Guards & Decorators: `@Roles(...)`, `@RequirePermissions(...)`, `JwtAuthGuard`, `RolesGuard`.
- Context Scoping: `TenantContext` interceptor extracting `tenantId` and `outletId` from verified JWT claims.
- Frontend Auth: Login form in `apps/web/app/(auth)/login/page.tsx` using React Hook Form and Zod.
- Secure cookie storage for refresh tokens and Bearer token management in API clients.

---

## 6. Out-of-Scope Features
- OAuth2 social login (restaurants use staff PINs or email credentials).
- Self-service public signup (reserved for Phase 05 / 14).

---

## 7. Required Frontend Implementation
- Clean, responsive login page with tenant slug or auto-detection.
- Auth state management (Zustand or React Context) storing user session and active outlet.
- Route protection middleware in Next.js redirecting unauthenticated users to `/login`.

---

## 8. Required Backend Implementation
- `AuthService` handling credential verification and JWT generation.
- `JwtStrategy` and `JwtRefreshStrategy` via Passport.js.
- Role and Permission guards checking user permissions against `docs/ROLE_PERMISSION_MATRIX.md`.

---

## 9. Database Changes
- None (User and Role models established in Phase 02). Refresh token hash stored in User model if applicable.

---

## 10. API Endpoints and Contracts
- `POST /api/v1/auth/login`: `{ email, password }` -> returns `{ user, accessToken }` and sets HttpOnly refresh cookie.
- `POST /api/v1/auth/refresh`: Refreshes expired access token.
- `POST /api/v1/auth/logout`: Clears session cookie and invalidates token.
- `GET /api/v1/auth/me`: Returns verified user identity, tenant, outlet, and granted permissions.

---

## 11. Authentication and Authorization Requirements
- Strict RBAC enforcement. A user with role `WAITER` must be rejected from administrative endpoints.

---

## 12. UI/UX Requirements
- Professional login UI adhering to `docs/UI_UX_GUIDELINES.md`. Clear validation error messages.

---

## 13. Edge Cases
- Inactive user accounts (`isActive: false`) must be denied login immediately.
- Suspended tenant accounts must prevent all affiliated staff from authenticating.

---

## 14. Error Handling
- Return `401 Unauthorized` for invalid credentials without revealing whether email exists.
- Return `403 Forbidden` when permission check fails.

---

## 15. Security Considerations
- Rate limiting on `/auth/login` to prevent brute-force credential stuffing.
- HttpOnly, SameSite, and Secure flags on auth cookies.

---

## 16. Unit Testing
- Unit tests for `AuthService` (valid credentials, invalid passwords, inactive users).
- Unit tests for RBAC permission resolver.

---

## 17. Integration Testing
- Integration tests verifying protected endpoints block unauthenticated or unauthorized requests.

---

## 18. End-to-End Testing
- Playwright test: User navigates to `/login`, enters credentials, successfully redirects to dashboard.

---

## 19. Acceptance Criteria
1. Successful authentication returns valid JWT and sets HttpOnly refresh cookie.
2. Token expiration and refresh cycle works seamlessly.
3. RBAC guards successfully block unauthorized role access.
4. Next.js route middleware protects administrative pages.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 03 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/auth/**`
- `apps/api/src/common/guards/**`
- `apps/web/app/(auth)/**`
- `apps/web/middleware.ts`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(auth): complete phase 03 authentication and rbac system`.

---

## 23. Final Completion Report Format
- Authentication flow summary.
- Test coverage logs for AuthModule.
- Security audit checklist.
