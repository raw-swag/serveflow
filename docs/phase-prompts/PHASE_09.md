# ServeFlow — Implementation Prompt: Phase 09

## 1. Phase Title
**PHASE 09 — Customer Mobile QR Self-Ordering Web Experience**

---

## 2. Objective
Build the guest-facing mobile web application launched via table QR code scans (`apps/web/app/(customer)/order`), providing instant menu exploration, dietary filtering, modifier customization, live cart management, digital order placement, order status tracking, and "Call Waiter" assistance.

---

## 3. Business Context
The guest ordering experience directly impacts customer satisfaction and table turnaround times. It must load in under 1.5 seconds on mobile 4G networks, require zero app downloads, and support frictionless ordering.

---

## 4. Prerequisites
- Phase 01 through Phase 08 completed.
- Dynamic QR code and menu catalog operational.

---

## 5. Exact Scope
- Customer web client under `apps/web/app/(customer)/order`:
  - Restaurant branded header (logo, colors, table badge).
  - Search bar and category pills with smooth scrolling.
  - Dietary filter toggle (Veg Only, Non-Veg, Jain).
  - Item detail sheet: Portion size selection, modifier checkboxes, special chef notes.
  - Floating sticky cart sheet with item count and subtotal.
  - Active Order Tracking view: Shows order history for current table session, preparation status, and cumulative bill.
  - "Call Waiter" and "Request Bill" action triggers.
- Backend Guest Order API in `OrdersModule`:
  - `POST /api/v1/public/qr/orders`: Validate QR token, create or append to `TableSession`, generate `Order` and `OrderItems`.
  - Real-time event dispatch notifying KDS and Waiter interfaces.

---

## 6. Out-of-Scope Features
- Native iOS/Android app wrappers (PWA web client only).
- Direct guest-to-guest chat.

---

## 7. Required Frontend Implementation
- Mobile-first responsive layout (360px–430px optimized).
- Zero mandatory login: Guests can order as anonymous table guests or optionally enter phone number for digital WhatsApp receipts.
- Real-time updates via Socket.IO listening on room `session:{sessionId}`.

---

## 8. Required Backend Implementation
- `OrdersService` with atomic database transactions:
  - Verifies table session state (creates session if table was vacant).
  - Validates item availability (rejects order if an item was 86'd).
  - Freezes current item unit prices into `OrderItem` records.
  - Dispatches WebSocket event `order:created` to outlet KDS rooms.

---

## 9. Database Changes
- None (Table sessions and orders models established in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/public/qr/menu?token=:qrToken`: Returns public menu for the scanned table's outlet.
- `POST /api/v1/public/qr/orders`: Payload `{ qrToken, items: [{ itemId, variantId, modifierOptionIds, quantity, specialNotes }] }`.
- `GET /api/v1/public/qr/session/:sessionId/status`: Active session orders and status.
- `POST /api/v1/public/qr/call-waiter`: Payload `{ qrToken, reason }`.

---

## 11. Authentication and Authorization Requirements
- Scoped strictly via the cryptographically signed `qrToken`. No staff credentials required.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Fast, fluid, and thumb-friendly. Distinct veg/non-veg indicators.

---

## 13. Edge Cases
- Submitting an order when an item was just marked unavailable (86'd): Return friendly error with specific item name and remove from cart.
- Rapid duplicate order clicks: Debounced submission button preventing accidental double-orders.

---

## 14. Error Handling
- Return `400 Bad Request` with itemized error messages if prices or modifier constraints are violated.

---

## 15. Security Considerations
- Zero trust of client prices: Prices submitted by browser are ignored; backend fetches authoritative pricing from database.
- Rate limiting on order submissions per table session.

---

## 16. Unit Testing
- Unit tests for order payload validation and price calculation in `OrdersService`.

---

## 17. Integration Testing
- Integration tests verifying order submission creates orders, line items, and updates table session.

---

## 18. End-to-End Testing
- Playwright mobile viewport test: User scans QR, filters by Veg, adds Paneer Tikka with Extra Chutney, places order, and verifies order confirmation screen.

---

## 19. Acceptance Criteria
1. Scanned QR loads branded restaurant menu seamlessly without login.
2. Dietary toggles filter menu items instantly.
3. Order submission creates persistent orders and assigns them to active table session.
4. "Call Waiter" triggers real-time notification on staff devices.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 09 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/web/app/(customer)/**`
- `apps/api/src/modules/orders/**`
- `apps/api/src/modules/qr/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(customer): complete phase 09 customer mobile qr ordering experience`.

---

## 23. Final Completion Report Format
- Mobile ordering experience overview.
- Socket event dispatch logs.
- Mobile viewport test recordings.
