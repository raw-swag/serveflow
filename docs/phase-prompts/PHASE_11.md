# ServeFlow — Implementation Prompt: Phase 11

## 1. Phase Title
**PHASE 11 — Waiter Floor Companion & Restaurant Floor Operations**

---

## 2. Objective
Build the Waiter Floor Companion mobile web application (`apps/web/app/(waiter)`), live interactive floor map/grid, server-assisted order taking at tables, table transfers and merges, and real-time alerts for kitchen readiness and guest assistance calls.

---

## 3. Business Context
Waiters are the primary human bridge between guests and the kitchen. The Waiter Companion app provides servers with live table status, instant kitchen alerts, and the ability to punch orders for guests who prefer human interaction.

---

## 4. Prerequisites
- Phase 01 through Phase 10 completed.
- Tables, KDS, and Menu catalog operational.

---

## 5. Exact Scope
- Waiter mobile web client under `apps/web/app/(waiter)`:
  - Floor overview: Area tabs, table status grid (`VACANT`, `OCCUPIED`, `READY_TO_SERVE`, `BILL_REQUESTED`).
  - Table detail view: Active guest orders, order status, elapsed time, current subtotal.
  - Server Order-Taking mode: Fast digital menu search to punch orders directly from mobile/tablet.
  - Table Operations: Change table, transfer items, merge two tables into one session.
  - Notification drawer: Real-time alerts when food is ready from KDS or when a guest presses "Call Waiter".

---

## 6. Out-of-Scope Features
- Cash settlement or payment collection (reserved for Cashier POS in Phase 12).
- Inventory stock audits.

---

## 7. Required Frontend Implementation
- Mobile-first responsive UI designed for single-hand floor operation.
- Sound and vibration feedback upon receiving "Call Waiter" or "Food Ready" alerts.
- Quick search item selector for rapid order entry.

---

## 8. Required Backend Implementation
- Waiter operational endpoints in `OrdersModule` & `OutletsModule`:
  - Table session transfer endpoint: Moves session and active orders from Table A to Table B.
  - Table merge endpoint: Combines sessions of Table A and Table B.
  - Waiter-assisted order creation endpoint tagging `placedByUserId`.

---

## 9. Database Changes
- None (Models support session transfers and placed-by user relations).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/waiter/floor`: Real-time floor occupancy and alerts.
- `POST /api/v1/outlets/:outletId/waiter/orders`: Punch order `{ tableId, items }`.
- `POST /api/v1/outlets/:outletId/tables/transfer`: Transfer `{ sourceTableId, targetTableId }`.
- `POST /api/v1/outlets/:outletId/tables/merge`: Merge `{ primaryTableId, secondaryTableId }`.
- `POST /api/v1/outlets/:outletId/waiter/acknowledge-call`: Clear call waiter alert.

---

## 11. Authentication and Authorization Requirements
- Requires authenticated staff with role `WAITER`, `RESTAURANT_MANAGER`, or `RESTAURANT_OWNER`.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Distinct color statuses: Emerald (Vacant), Amber (Occupied), Blue (Ready to Serve), Violet (Bill Requested).

---

## 13. Edge Cases
- Transferring to an occupied table: Must block transfer or require explicit merge confirmation.
- Concurrently placing orders on the same table from both customer QR and waiter app: Handled cleanly via atomic session transactions.

---

## 14. Error Handling
- Structured errors with descriptive messages for invalid table state transitions.

---

## 15. Security Considerations
- Waiters can only manage tables within their assigned outlet.

---

## 16. Unit Testing
- Unit tests for table transfer and merge transactional logic.

---

## 17. Integration Testing
- Integration tests verifying table transfer moves all active orders and updates table statuses correctly.

---

## 18. End-to-End Testing
- Playwright test: Waiter logs in, selects Table 4, punches order for "Butter Naan", verifies order appears on KDS, and marks call alert acknowledged.

---

## 19. Acceptance Criteria
1. Waiter can view live table status across all dining areas.
2. Waiter can punch orders directly for a table.
3. Tables can be transferred or merged with session continuity.
4. Food ready alerts and guest call notifications appear instantly.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 11 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/web/app/(waiter)/**`
- `apps/api/src/modules/orders/**`
- `apps/api/src/modules/outlets/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(waiter): complete phase 11 waiter companion and floor operations`.

---

## 23. Final Completion Report Format
- Waiter mobile experience summary.
- Table transfer and merge test verification logs.
