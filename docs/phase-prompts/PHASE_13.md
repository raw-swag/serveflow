# ServeFlow — Implementation Prompt: Phase 13

## 1. Phase Title
**PHASE 13 — Analytics, Business Intelligence & Reporting Engine**

---

## 2. Objective
Implement the business intelligence and reporting engine for restaurant owners and managers (`apps/web/app/(dashboard)/analytics`), providing interactive visualizations for sales performance, payment breakdown, table turnaround metrics, menu engineering profitability matrices (Stars, Dogs, Plowhorses, Puzzles), and multi-outlet comparisons.

---

## 3. Business Context
Restaurant owners require actionable operational insights to optimize food margins, identify high-selling items, reduce table turnaround delays, and monitor daily cash book reconciliations across outlets.

---

## 4. Prerequisites
- Phase 01 through Phase 12 completed.
- Settled orders and financial bills in database.

---

## 5. Exact Scope
- Analytics Backend in `AnalyticsModule`:
  - Daily/Weekly/Monthly aggregations: Gross Revenue, Net Revenue, Total GST Collected, Average Order Value (AOV), Table Turnaround Time.
  - Payment method distribution (Cash vs. Card vs. UPI).
  - Menu Engineering Matrix categorizing items by sales velocity and gross margin.
  - Export reports to CSV and Excel format.
- Analytics Dashboard UI in `apps/web/app/(dashboard)/analytics`:
  - KPI summary metric cards with period-over-period trend percentages.
  - Interactive charts (Recharts / Chart.js): Hourly sales distribution, daily revenue curve.
  - Menu Engineering 2x2 scatter matrix.
  - Outlet performance comparison table for multi-branch tenants.

---

## 6. Out-of-Scope Features
- Predictive AI demand forecasting (Horizon 3).
- Direct external investor reporting syndication.

---

## 7. Required Frontend Implementation
- Clean, responsive dashboard charts conforming to `docs/UI_UX_GUIDELINES.md`.
- Date range picker presets (Today, Yesterday, Last 7 Days, Month to Date, Custom Range).
- Outlet selector dropdown for comparing branches side by side.

---

## 8. Required Backend Implementation
- `AnalyticsService` executing optimized PostgreSQL aggregation queries with composite indexes on `[outletId, createdAt]`.
- Report generation service formatting data into downloadable CSV files.

---

## 9. Database Changes
- Add database indexes on `bills(outlet_id, created_at)` and `orders(outlet_id, created_at)` if not already established.

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/analytics/summary?startDate=:start&endDate=:end`: Core KPI metrics.
- `GET /api/v1/outlets/:outletId/analytics/sales-trend?interval=daily`: Time-series revenue data.
- `GET /api/v1/outlets/:outletId/analytics/menu-matrix`: Item margin vs. popularity matrix.
- `GET /api/v1/outlets/:outletId/analytics/export?type=sales`: Downloadable CSV report stream.

---

## 11. Authentication and Authorization Requirements
- Scoped to `RESTAURANT_OWNER` (all outlets) and `RESTAURANT_MANAGER` (assigned outlet only).

---

## 12. UI/UX Requirements
- Executive-grade clarity. Clean typography and responsive card layouts. Zero unnecessary animations.

---

## 13. Edge Cases
- Handling dates with zero orders/sales gracefully without breaking chart visualizations.
- Time zone handling: Aggregations strictly aligned to Indian Standard Time (IST / UTC+5:30).

---

## 14. Error Handling
- Return `400 Bad Request` if requested date range exceeds 365 days in a single synchronous query.

---

## 15. Security Considerations
- Strict tenant context enforcement: Tenant A can never query Tenant B's financial metrics.

---

## 16. Unit Testing
- Unit tests for revenue aggregation math and average order value calculations.

---

## 17. Integration Testing
- Integration tests verifying analytics queries calculate accurate totals from test bill records.

---

## 18. End-to-End Testing
- Playwright test: Owner logs in, opens Analytics, filters for "Last 7 Days", and downloads sales CSV report.

---

## 19. Acceptance Criteria
1. Revenue, tax, and order volume KPIs calculate accurately.
2. Hourly and daily sales trend charts render without errors.
3. Menu engineering matrix correctly categorizes high and low margin items.
4. Export to CSV downloads clean, formatted financial data.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 13 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/analytics/**`
- `apps/web/app/(dashboard)/analytics/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(analytics): complete phase 13 business intelligence and reporting engine`.

---

## 23. Final Completion Report Format
- Summary of analytics queries and aggregation logic.
- Performance benchmark of query response times under high transaction volume.
- Dashboard screenshots.
