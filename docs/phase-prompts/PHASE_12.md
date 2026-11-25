# ServeFlow — Implementation Prompt: Phase 12

## 1. Phase Title
**PHASE 12 — Billing, Dual-GST Engine, Split Payments & POS Terminal**

---

## 2. Objective
Build the complete point-of-sale (POS) billing engine, dual-tier GST calculation (CGST/SGST/IGST), customizable discounts and service charges, split billing (by item or amount), Razorpay payment gateway integration with dynamic UPI QR generation, cash drawer reconciliation, and thermal receipt printing.

---

## 3. Business Context
Billing is the financial core of the restaurant. Indian restaurants require strict compliance with GST rules (5% without ITC or 18% with ITC, FSSAI numbers on bills) and support for instant UPI payments alongside traditional cash and card settlements.

---

## 4. Prerequisites
- Phase 01 through Phase 11 completed.
- Active orders and dining sessions operational.

---

## 5. Exact Scope
- Billing Engine in `BillingModule`:
  - Authoritative server-side calculation: Subtotal -> Item Discounts -> Bill Discounts -> Service Charge -> CGST (2.5%) + SGST (2.5%) -> Round-off -> Grand Total.
  - Split billing: Split by custom amount or split by specific line items.
- Payment Integration in `PaymentsModule`:
  - Razorpay order creation for online/UPI payments.
  - Webhook receiver verifying cryptographic HMAC signatures (`X-Razorpay-Signature`).
  - Dynamic BharatQR generation for cashier customer-facing screen.
- Cashier POS Interface in `apps/web/app/(pos)`:
  - High-speed desktop layout with keyboard shortcuts (Enter to tender, F2 for search, Esc to clear).
  - Item catalog search and real-time bill tape.
  - Split Bill dialog with payment method tenders (Cash, Card, UPI, Split).
  - Thermal receipt preview and direct ESC/POS print command generator (80mm/58mm).

---

## 6. Out-of-Scope Features
- Third-party accounting integrations (Tally / Zoho Books - Horizon 2).
- Automatic bank account settlement payouts.

---

## 7. Required Frontend Implementation
- Desktop POS interface adhering to `docs/UI_UX_GUIDELINES.md`.
- Keyboard navigation: Full POS workflow executable without a mouse.
- Dynamic UPI QR modal showing real-time countdown and automated settlement detection via WebSocket.

---

## 8. Required Backend Implementation
- `BillingService` executing calculations strictly server-side using Decimal.js for zero rounding errors.
- `PaymentsService` managing payment records, webhook verification, and session settlement.
- Consecutive tax invoice numbering per outlet and financial year (e.g., `INV/2026-27/0042`).

---

## 9. Database Changes
- None (Models `bills` and `payments` established in Phase 02).

---

## 10. API Endpoints and Contracts
- `POST /api/v1/outlets/:outletId/sessions/:sessionId/generate-bill`: Calculate and create invoice.
- `POST /api/v1/outlets/:outletId/bills/:billId/split`: Create split bill partitions.
- `POST /api/v1/outlets/:outletId/bills/:billId/settle`: Settle bill with payment records.
- `POST /api/v1/payments/razorpay/create-order`: Create Razorpay payment intent.
- `POST /api/v1/payments/razorpay/webhook`: Cryptographic webhook listener.
- `GET /api/v1/outlets/:outletId/bills/:billId/print`: ESC/POS formatted receipt payload.

---

## 11. Authentication and Authorization Requirements
- POS operations require `CASHIER`, `RESTAURANT_MANAGER`, or `RESTAURANT_OWNER`.
- Webhook endpoint verified via cryptographic signature, not user JWT.

---

## 12. UI/UX Requirements
- High-density POS screen. Prominent Grand Total display. Fast checkout in <10 seconds.

---

## 13. Edge Cases
- Split bill partial payment: Session cannot be closed until the sum of verified payments equals the grand total.
- Round-off handling: Standard rounding to nearest rupee according to Indian accounting standards.

---

## 14. Error Handling
- Prevent closing or settling a bill if total payments do not match invoice amount.

---

## 15. Security Considerations
- Never mark a bill as paid based on client confirmation. Webhook cryptographic verification mandatory.
- Discount overrides exceeding manager thresholds require manager PIN authentication.

---

## 16. Unit Testing
- Unit tests for GST calculation (intra-state CGST+SGST vs. inter-state IGST).
- Unit tests for split-bill rounding and math precision.
- Unit tests for Razorpay HMAC signature verification.

---

## 17. Integration Testing
- Integration tests verifying full billing lifecycle: Generate Bill -> Create Payment -> Webhook Trigger -> Settle Session.

---

## 18. End-to-End Testing
- Playwright test: Cashier opens occupied table, generates bill, splits payment 50/50 Cash and UPI, completes settlement, and verifies receipt preview.

---

## 19. Acceptance Criteria
1. Accurate calculation of subtotal, discounts, service charges, and dual GST.
2. Consecutive invoice numbers generated conforming to GST regulations.
3. Split billing works seamlessly across multiple payment methods.
4. Razorpay webhook cryptographic verification captures payments reliably.
5. Settling bill resets table status to `VACANT` and archives table session.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 12 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/web/app/(pos)/**`
- `apps/api/src/modules/billing/**`
- `apps/api/src/modules/payments/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(billing): complete phase 12 billing dual gst engine and cashier pos`.

---

## 23. Final Completion Report Format
- Billing and GST calculation verification report.
- Webhook test logs.
- POS interface screenshots and ESC/POS sample output.
