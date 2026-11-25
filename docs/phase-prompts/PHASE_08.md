# ServeFlow — Implementation Prompt: Phase 08

## 1. Phase Title
**PHASE 08 — Dynamic Menu Engineering & Catalog Customization**

---

## 2. Objective
Implement the full dynamic menu management engine, supporting categories, subcategories, items, portion variants, modifier groups (add-ons/customizations), dietary classifications (Veg, Non-Veg, Egg, Jain), kitchen station routing, and real-time 86'ing (stock availability toggle).

---

## 3. Business Context
The menu is the revenue core of any restaurant. Restaurant owners must be able to add/edit items, adjust prices, configure modifiers, route items to kitchen stations, and 86 items instantly when ingredients run out.

---

## 4. Prerequisites
- Phase 01 through Phase 07 completed.
- Kitchen stations configured.

---

## 5. Exact Scope
- Backend `MenuModule` in NestJS:
  - CRUD for Categories, MenuItems, ItemVariants, and ModifierGroups.
  - Station routing binding (e.g., Tandoori Roti routes to "Tandoor Station").
  - Instant stock availability toggle (`isAvailable: boolean`).
  - Menu CSV/JSON bulk import utility.
- Menu engineering interface in `apps/web/app/(dashboard)/menu`:
  - Category manager with drag-and-drop reordering.
  - Item catalog grid and list view with dietary badges and price tags.
  - Item creation/edit modal: Name, description, image upload, base price, dietary type, preparation station, variants, and modifier groups.
  - Fast 86-list toggle switch for immediate kitchen/bar stockouts.

---

## 6. Out-of-Scope Features
- Recipe ingredient depletion & inventory forecasting (Horizon 2).
- Dynamic AI pricing algorithms.

---

## 7. Required Frontend Implementation
- High-efficiency item management table with live search and category tabs.
- Visual dietary selector (Veg green square, Non-Veg red triangle, Egg yellow circle).
- Modifier group builder (e.g., "Choice of Bread", "Spice Level", "Add Extra Cheese").

---

## 8. Required Backend Implementation
- `MenuService` handling transactional updates for items, variants, and modifier groups.
- Cache invalidation: Updating an item clears the cached public menu in Redis.
- Image upload integration with S3/MinIO for high-resolution dish photos.

---

## 9. Database Changes
- None (Menu relational models created in Phase 02).

---

## 10. API Endpoints and Contracts
- `GET /api/v1/outlets/:outletId/menu`: Complete menu catalog for administration.
- `POST /api/v1/outlets/:outletId/categories`: Create menu category `{ name, sortOrder }`.
- `POST /api/v1/outlets/:outletId/items`: Create item `{ categoryId, stationId, name, price, dietaryType, variants, modifiers }`.
- `PATCH /api/v1/outlets/:outletId/items/:itemId`: Update item details and pricing.
- `PATCH /api/v1/outlets/:outletId/items/:itemId/availability`: Toggle stockout `{ isAvailable: boolean }`.
- `POST /api/v1/outlets/:outletId/menu/import`: Bulk import menu from CSV/JSON.

---

## 11. Authentication and Authorization Requirements
- Menu catalog editing requires `RESTAURANT_OWNER` or `RESTAURANT_MANAGER`.
- Stockout toggle (`/availability`) is also accessible to `CHEF` and `CASHIER` roles.

---

## 12. UI/UX Requirements
- Follows `docs/UI_UX_GUIDELINES.md`. Clear distinction between Veg and Non-Veg items.

---

## 13. Edge Cases
- Deleting a category with active items: Must prompt to reassign or cascade soft-delete.
- Items referenced in active dining orders must retain historical pricing snapshot.

---

## 14. Error Handling
- Prevent negative prices or inverted modifier selection minimums (`minSelection > maxSelection`).

---

## 15. Security Considerations
- S3 image uploads validated for MIME type (`image/jpeg`, `image/png`, `image/webp`).

---

## 16. Unit Testing
- Unit tests for menu validation schemas and price calculation logic.

---

## 17. Integration Testing
- Integration tests verifying category and item creation, modifier associations, and station routing.

---

## 18. End-to-End Testing
- Playwright test: Manager creates category "Starters", adds "Paneer Tikka", assigns to Tandoor Station, adds "Extra Mint Chutney" modifier, and verifies in menu list.

---

## 19. Acceptance Criteria
1. Categories, items, variants, and modifier groups can be created and edited.
2. Dietary flags (Veg, Non-Veg, Egg, Jain) display accurately.
3. 86 toggle immediately updates item availability status.
4. Menu items are correctly bound to designated kitchen stations.

---

## 20. Documentation Updates
- Update `docs/CHANGELOG.md` with Phase 08 completion details.

---

## 21. Files/Modules Expected to Change
- `apps/api/src/modules/menu/**`
- `apps/web/app/(dashboard)/menu/**`

---

## 22. Git and Migration Requirements
- Commit changes: `feat(menu): complete phase 08 dynamic menu engineering`.

---

## 23. Final Completion Report Format
- Menu engine feature summary.
- Test execution logs.
- Screenshots of catalog builder and modifier groups.
