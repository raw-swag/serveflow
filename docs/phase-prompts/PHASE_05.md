# ServeFlow — Implementation Prompt: Phase 05

## 1. Phase Title
**PHASE 05 — Restaurant Onboarding Wizard & Outlet Setup**

---

## 2. Objective
Develop the guided restaurant onboarding wizard and outlet management interface for restaurant owners and support staff, enabling full configuration of business profiles, branding (logos, brand colors), outlet details, FSSAI numbers, and GST tax settings.

---

## 3. Business Context
Once a tenant is created, the restaurant profile and outlets must be configured. Restaurant owners must be able to customize their branding and tax configurations without developer intervention.

---

## 4. Prerequisites
- Phase 01 through Phase 04 completed.
- Restaurant Owner account provisioned.

---

## 5. Exact Scope
- Backend `TenantsModule` & `OutletsModule` for outlet configuration and brand customization.
- File upload integration with S3/MinIO for restaurant logos and brand banners.
- Onboarding Setup Wizard in Next.js (`apps/web/app/(dashboard)/onboarding`):
  - Step 1: Restaurant Brand & Visual Identity (Logo, primary color, invoice tagline).
  - Step 2: Outlet Profile & Contact (Address, phone, operating hours).
  - Step 3: Tax & Legal Compliance (GSTIN, FSSAI registration number, default GST rate).
  - Step 4: Summary & Launch.

---

## 6. Out-of-Scope Features
- Table generation (reserved for Phase 07).
- Menu creation (reserved for Phase 08).

---

## 7. Required Frontend Implementation
- Multi-step interactive onboarding wizard with progress bar and step persistence.
- Color picker for brand accent selection with live preview of dining menu header.
- Image upload component with drag-and-drop, client-side resizing, and preview.

---

## 8. Required Backend Implementation
- Endpoints for updating tenant branding and outlet configurations.
- Media upload service generating pre-signed S3 URLs or handling direct multipart uploads.
- Tax configuration validator enforcing valid Indian GST formats (15-digit alphanumeric) and FSSAI (14-digit numeric).

---

## 9. Database Changes
- None (Uses existing `tenants` and `outlets` models).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/tenants/current`: Get current tenant branding and settings.
- `PATCH /api/v1/tenants/current`: Update brand identity (`name`, `logoUrl`, `primaryColor`, `tagline`).
- `GET /api/v1/outlets`: List outlets under the current tenant.
- `POST /api/v1/outlets`: Create new outlet branch.
- `PATCH /api/v1/outlets/:id`: Update outlet address, phone, GSTIN, FSSAI, and tax configuration.

---

## 11. Authentication and Authorization Requirements
- Restricted to `RESTAURANT_OWNER` and authorized `RESTAURANT_MANAGER` roles.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Real-time validation feedback on GSTIN and FSSAI input fields.

---

## 13. Edge Cases
- Invalid GSTIN checksum or length rejected gracefully with clear message.
- Multi-outlet switching: Users with access to multiple outlets can switch active outlet from the header.

---

## 14. Error Handling
- Structured 422 Unprocessable Entity responses for invalid tax registration formats.

---

## 15. Security Considerations
- S3 upload restrictions: Allowed file extensions strictly limited to `.png`, `.jpg`, `.jpeg`, `.webp`; max file size 5MB.

---

## 16. Unit Testing
- Unit tests for Indian GSTIN and FSSAI validation regex and logic.

---

## 17. Integration Testing
- Integration tests verifying tenant owners can only update their own tenant's profile.

---

## 18. End-to-End Testing
- Playwright test: Owner completes 4-step wizard, uploads a logo, enters GSTIN, and saves successfully.

---

## 19. Acceptance Criteria
1. Onboarding wizard saves state and successfully transitions through all steps.
2. Uploaded restaurant logo displays properly in dashboard header.
3. GSTIN and FSSAI records correctly persist and reflect on outlet profile.
4. Tenant brand primary color dynamically applies to theme accent variables.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 05 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/tenants/**`
- `apps/api/src/modules/outlets/**`
- `apps/web/app/(dashboard)/onboarding/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(onboarding): complete phase 05 onboarding wizard and outlet setup`.

---

## 23. Final Completion Report Format
- Setup wizard workflow summary.
- API test execution report.
- UI screenshots of completed onboarding steps.
