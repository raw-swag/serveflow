# ServeFlow — Implementation Prompt: Phase 14

## 1. Phase Title
**PHASE 14 — SaaS Subscriptions, Feature Gates & Customization Engine**

---

## 2. Objective
Implement the multi-tier SaaS subscription engine, automated feature gating (Starter, Growth, Business, Enterprise), tenant resource limit enforcement (table limits, employee quotas, outlet limits), and dynamic tenant white-label branding customization.

---

## 3. Business Context
ServeFlow is a commercial subscription business. We monetize via tiered subscription plans. The platform must enforce plan limits automatically (e.g., blocking table creation if Starter plan table limit is reached) and allow tenant branding customizations.

---

## 4. Prerequisites
- Phase 01 through Phase 13 completed.
- Core operational modules and Super Admin dashboard operational.

---

## 5. Exact Scope
- Subscription Engine in `SubscriptionsModule`:
  - Tier definitions (Starter, Growth, Business, Enterprise) with resource limits and feature entitlement flags.
  - Limit enforcement interceptors/guards:
    - Max tables per outlet.
    - Max employee accounts.
    - Advanced analytics access.
    - Multi-outlet management access.
  - Subscription lifecycle management: Active, Trial, Past Due, Suspended.
- Tenant Customization Engine:
  - Dynamic theme injection in Next.js: CSS variables populated based on active tenant's brand settings (primary color, logo, typography).
  - Custom invoice header/footer and receipt branding customization.
- Subscription management interface in `apps/web/app/(dashboard)/subscription`:
  - Current plan overview, usage meters (e.g., "12 / 20 Tables Used"), upgrade triggers, and billing history.

---

## 6. Out-of-Scope Features
- Custom native Android/iOS white-label app binary generation.
- Automated dunning workflows via debt collection agencies.

---

## 7. Required Frontend Implementation
- Usage progress bars showing active resource consumption against plan quotas.
- Upgrade modal with feature comparison matrix adhering to `docs/BUSINESS_MODEL.md`.
- Dynamic CSS theme provider applying tenant colors across all dashboard and QR client views.

---

## 8. Required Backend Implementation
- `SubscriptionGuard` and `@RequireFeature(...)` decorator checking tenant entitlements.
- Service evaluating usage limits before creating tables, outlets, or staff members.

---

## 9. Database Changes
- None (Model `subscriptions` and tenant settings established in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/tenants/current/subscription`: Current plan, entitlements, and resource usage.
- `POST /api/v1/tenants/current/subscription/upgrade`: Initiate plan change.
- `GET /api/v1/super-admin/subscriptions`: Super Admin view of all tenant subscriptions.

---

## 11. Authentication and Authorization Requirements
- Subscription viewing and upgrades restricted to `RESTAURANT_OWNER`.
- Plan limits enforced globally on all creation endpoints.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Non-intrusive upgrade banners when approaching 80% quota.

---

## 13. Edge Cases
- Tenant downgrades plan: Existing resources remain intact, but creation of new resources is blocked until within the new quota.
- Expired subscription: Tenant is shifted to read-only mode with clear renewal prompts.

---

## 14. Error Handling
- Return `403 Forbidden` with error code `PLAN_LIMIT_EXCEEDED` when a quota is breached.

---

## 15. Security Considerations
- Quota validation must occur inside database transactions to prevent race conditions during concurrent additions.

---

## 16. Unit Testing
- Unit tests for feature flag evaluation and quota limit checks.

---

## 17. Integration Testing
- Integration tests verifying table creation is rejected once tenant reaches plan limit.

---

## 18. End-to-End Testing
- Playwright test: Owner on Starter plan attempts to add table #11; system displays upgrade modal with plan limits.

---

## 19. Acceptance Criteria
1. Feature flags restrict access to advanced features according to plan tier.
2. Resource quotas (tables, staff) are strictly enforced by backend guards.
3. Tenant branding customizations dynamically theme the customer and dashboard interfaces.
4. Plan usage meters display real-time consumption metrics.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 14 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/subscriptions/**`
- `apps/web/app/(dashboard)/subscription/**`
- `apps/web/components/theme-provider.tsx`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(subscriptions): complete phase 14 subscriptions feature gates and customization engine`.

---

## 23. Final Completion Report Format
- Feature gating verification logs.
- Quota enforcement test reports.
- UI screenshots of subscription management and theme customization.
