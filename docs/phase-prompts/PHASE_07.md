# ServeFlow — Implementation Prompt: Phase 07

## 1. Phase Title
**PHASE 07 — Dining Area, Table & Cryptographic QR Engine**

---

## 2. Objective
Build dining floor area management (e.g., Ground Floor, Rooftop, AC Hall), individual table management with seating capacity, dynamic cryptographic QR code generation (HMAC-SHA256 signed), and printable vector PDF export.

---

## 3. Business Context
Dynamic table QR codes are the entry point for the guest self-ordering experience. They must be tamper-proof, revocable if copied or vandalized, and easily printed in standard restaurant formats.

---

## 4. Prerequisites
- Phase 01 through Phase 06 completed.
- Active outlet configured.

---

## 5. Exact Scope
- Backend `QrModule` in NestJS:
  - Cryptographic QR token generation and signature verification using HMAC-SHA256.
  - Revocation endpoint updating table `qr_version` and invalidating cached tokens.
- Floor plan & table management in `OutletsModule`: CRUD operations for `DiningArea` and `Table`.
- Table management UI in `apps/web/app/(dashboard)/tables`:
  - Area tabs (e.g., "Main Dining", "Garden Patio", "VIP Lounge").
  - Table grid with live occupancy badges (`VACANT`, `OCCUPIED`, `BILLED`).
  - Add/Edit Table modal (Number/name, capacity, section).
  - QR Code preview card with download options (PNG, SVG, printable PDF table tent).

---

## 6. Out-of-Scope Features
- Live order placement through QR (reserved for Phase 09).
- Floor plan drag-and-drop 3D visualizers.

---

## 7. Required Frontend Implementation
- Responsive table card grid displaying table number, capacity, QR thumbnail, and status badge.
- Printable PDF generation preview using `@react-pdf/renderer` or server-generated vector PDF.
- One-click "Revoke & Regenerate QR" action with confirmation dialog.

---

## 8. Required Backend Implementation
- `QrService` handling token encoding, HMAC signing, and cryptographic decoding.
- Public token verification endpoint (`/api/v1/public/qr/resolve`).
- PDF generation utility producing printable table cards with restaurant logo and table number.

---

## 9. Database Changes
- None (Tables `dining_areas` and `tables` created in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/areas`: List dining areas.
- `POST /api/v1/outlets/:outletId/areas`: Create dining area `{ name, floorNumber }`.
- `GET /api/v1/outlets/:outletId/tables`: List tables grouped by area with current status.
- `POST /api/v1/outlets/:outletId/tables`: Create table `{ tableNumber, capacity, areaId }`.
- `POST /api/v1/outlets/:outletId/tables/:tableId/revoke-qr`: Invalidate token and issue new QR code.
- `GET /api/v1/public/qr/resolve?token=:qrToken`: Public endpoint to verify QR token and return table/outlet metadata.

---

## 11. Authentication and Authorization Requirements
- Table and area management requires `RESTAURANT_OWNER` or `RESTAURANT_MANAGER` role.
- Public QR resolution endpoint is open to guests without staff authentication.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Tables visually grouped by area. Status badges: Emerald (Vacant), Amber (Occupied).

---

## 13. Edge Cases
- Duplicate table numbers within the same outlet must be prevented.
- Revoking a QR code while guests are actively seated: Existing session remains valid until settled, but subsequent scans require the new QR code.

---

## 14. Error Handling
- Return `400 Bad Request` with `INVALID_QR_TOKEN` if signature verification fails or token version is expired.

---

## 15. Security Considerations
- Constant-time HMAC comparison to prevent timing side-channel attacks.
- Table URLs must not use sequential IDs in plain text.

---

## 16. Unit Testing
- Unit tests for HMAC-SHA256 token generation and tampering detection.
- Unit tests for token revocation logic.

---

## 17. Integration Testing
- Integration test resolving valid vs. revoked vs. tampered QR tokens.

---

## 18. End-to-End Testing
- Playwright test: Manager creates an area, adds Table 10, downloads QR code, and verifies public resolve endpoint.

---

## 19. Acceptance Criteria
1. Tables and areas can be created, updated, and reordered.
2. Every table generates a cryptographically signed QR code URL.
3. Revoking a QR code immediately renders the old token invalid upon next scan.
4. Printable QR card preview displays restaurant logo and table number.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 07 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/qr/**`
- `apps/api/src/modules/outlets/**`
- `apps/web/app/(dashboard)/tables/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(tables): complete phase 07 table and cryptographic qr engine`.

---

## 23. Final Completion Report Format
- Table management summary.
- QR signature verification test logs.
- PDF generation output verification.
