# ServeFlow — Implementation Prompt: Phase 10

## 1. Phase Title
**PHASE 10 — Real-Time Kitchen Display System (KDS) & Order Processing Engine**

---

## 2. Objective
Build the real-time Kitchen Display System (KDS) interface for kitchen tablets and prep screens (`apps/web/app/(kds)`), station-based ticket routing, visual ticket aging timers, item-level status transitions (`PLACED` -> `PREPARING` -> `READY` -> `SERVED`), and low-latency Socket.IO event coordination.

---

## 3. Business Context
Kitchen bottlenecks delay food delivery and frustrate diners. The KDS eliminates lost paper KOTs, routes orders to the correct cooking stations (Grill, Fry, Bar, Curry), highlights ticket aging, and signals servers when food is ready.

---

## 4. Prerequisites
- Phase 01 through Phase 09 completed.
- Orders engine and kitchen stations operational.

---

## 5. Exact Scope
- KDS Interface under `apps/web/app/(kds)`:
  - Station selector dropdown (e.g., "All Stations", "Tandoor", "Bar", "Main Kitchen").
  - Ticket card grid with large table numbers, order timestamps, and elapsed aging timers.
  - Color-coded aging headers (Green <10m, Amber 10–20m, Red >20m).
  - Item list displaying quantities, portion variants, special instructions, and modifier badges.
  - Interactive status buttons per item and per whole ticket ("Start Prep", "Mark Ready", "Recall").
  - Audio alert chimes when a new order arrives.
- Backend KDS Module in `KdsModule`:
  - Socket.IO gateway with rooms partitioned by `outlet:{outletId}:kds:{stationId}`.
  - Status update endpoints updating `OrderItem.status` and `Order.status`.
  - Notification dispatcher alerting waiters when an item is marked `READY`.

---

## 6. Out-of-Scope Features
- Physical ESC/POS printer hardware firmware programming (software network print endpoint provided).
- Inventory ingredient deduction (Horizon 2).

---

## 7. Required Frontend Implementation
- High-contrast dark mode interface adhering to `docs/UI_UX_GUIDELINES.md`.
- Touch-optimized card layout with swipe-to-complete or large button taps.
- Auto-reconnecting WebSocket connection with visual connection status indicator.

---

## 8. Required Backend Implementation
- `KdsGateway` handling client connections, station room joins, and broadcasting state changes.
- `KdsService` aggregating active tickets filtered by outlet and station.

---

## 9. Database Changes
- None (Status enums on `Order` and `OrderItem` models established in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/kds/tickets?stationId=:stationId`: Active tickets.
- `PATCH /api/v1/outlets/:outletId/kds/items/:orderItemId/status`: Update item status `{ status: "PREPARING" | "READY" | "SERVED" }`.
- `PATCH /api/v1/outlets/:outletId/kds/tickets/:orderId/complete`: Mark entire ticket ready.

---

## 11. Authentication and Authorization Requirements
- Requires authenticated staff with role `CHEF`, `RESTAURANT_MANAGER`, or `RESTAURANT_OWNER`.

---

## 12. UI/UX Requirements
- Tablet-optimized landscape layout. Legible from 3 meters distance. Large ticket numbers.

---

## 13. Edge Cases
- Accidental completion: "Recall" button to restore a mistakenly completed ticket within 5 minutes.
- Network disconnection in kitchen: Persistent offline alert with automatic reconnection and ticket reconciliation upon reconnect.

---

## 14. Error Handling
- Graceful error toasts if status update fails; optimistic UI rollback.

---

## 15. Security Considerations
- KDS WebSocket connections must authenticate via JWT handshake token.
- Sockets scoped strictly to authorized `outletId`.

---

## 16. Unit Testing
- Unit tests for ticket aging calculation and station filtering algorithms.

---

## 17. Integration Testing
- Integration tests verifying `KdsGateway` broadcasts events only to designated station rooms.

---

## 18. End-to-End Testing
- Playwright test: Submit order via public order endpoint; verify new ticket card appears on KDS screen within 500ms; tap "Mark Ready" and verify status updates.

---

## 19. Acceptance Criteria
1. KDS screen loads tickets filtered by chosen kitchen station.
2. New customer orders appear dynamically without page refresh.
3. Ticket timers update every second with color-coded aging.
4. Marking an item ready dispatches real-time notification to the floor/waiter interface.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 10 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/web/app/(kds)/**`
- `apps/api/src/modules/kds/**`
- `apps/api/src/modules/orders/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(kds): complete phase 10 kitchen display system and real-time order processing`.

---

## 23. Final Completion Report Format
- KDS interface walkthrough.
- WebSocket latency and event delivery logs.
- Tablet viewport verification screenshots.
