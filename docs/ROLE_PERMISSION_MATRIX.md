# ServeFlow — Role & Permission Matrix (RBAC)

## 1. System Roles Hierarchy

ServeFlow defines seven primary built-in system roles alongside tenant-defined custom roles:

1. `SUPER_ADMIN`: Global platform operator. Full control over platform tenants, billing plans, and global telemetry.
2. `RESTAURANT_OWNER`: Legal entity owner. Unrestricted administrative control over their tenant brand and all associated outlets.
3. `RESTAURANT_MANAGER`: Branch manager. Controls daily floor operations, menu availability (86-list), staff schedules, and shift voids/reconciliations.
4. `CASHIER`: Point-of-sale operator. Manages bill printing, split billing, payment capture, and daily cash drawer reconciliation.
5. `WAITER`: Floor server. Places orders on behalf of guests, handles table transfers, receives kitchen readiness alerts, and assists guests.
6. `CHEF`: Kitchen prep lead. Manages station tickets on the KDS, updates item prep statuses, and marks items out of stock (86'd).
7. `GUEST`: Anonymous or phone-verified diner accessing the digital QR interface scoped strictly to their active table session.

---

## 2. Granular Permissions Matrix

| Permission Key | Description | SUPER_ADMIN | OWNER | MANAGER | CASHIER | WAITER | CHEF | GUEST |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `platform:manage` | Manage platform tenants and billing | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `tenant:branding:update` | Update brand logo, colors, invoice header | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `outlet:config:update` | Edit GSTIN, FSSAI, tax rates | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `staff:manage` | Create, invite, deactivate employee accounts | ❌ | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ |
| `table:manage` | Add tables, edit capacity, revoke QR | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `menu:edit_catalog` | Add/delete items, edit pricing | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `menu:toggle_86` | Toggle item out of stock | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| `order:create_guest` | Place order via table QR | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| `order:create_staff` | Take order on waiter/POS device | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `order:void_item` | Void item after sending to kitchen | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `kds:manage_tickets` | Update ticket prep status (Preparing/Ready) | ❌ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `billing:create_invoice` | Generate final tax invoice | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `billing:apply_discount` | Apply discount or waive service charge | ❌ | ✅ | ✅ | ❌* | ❌ | ❌ | ❌ |
| `billing:settle_payment` | Record cash/card/UPI payment | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `analytics:view_financial` | View sales, revenue, profit margins | ✅ (Global) | ✅ | ✅* | ❌ | ❌ | ❌ | ❌ |

*\*Notes:*
- `staff:manage` for Manager allows managing Waiters, Cashiers, and Chefs; cannot manage Owner or other Managers.
- `billing:apply_discount` for Cashier requires Manager PIN override if discount exceeds tenant-defined threshold (e.g., >10%).
- `analytics:view_financial` for Manager is restricted to their specific assigned outlet.
