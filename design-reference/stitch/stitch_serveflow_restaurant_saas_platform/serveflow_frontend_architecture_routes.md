# ServeFlow — UI/UX Architecture & Technical Handoff

## 1. Overview
ServeFlow ("Run your restaurant. Your way.") is a multi-tenant Restaurant Operations & Ordering SaaS platform designed for Indian hospitality businesses and international expansion.

## 2. Exporting the Project
Use the Stitch Canvas Toolbar (**Export** -> **ZIP** or `Cmd/Ctrl+Shift+E`) to download the complete design system, component kit, screens, assets, and documentation as a clean archive.

## 3. Recommended `apps/web` (Next.js App Router) Route Map
| Portal | Route | Primary Screen |
| :--- | :--- | :--- |
| Super Admin | `/admin/overview` | `screens/super-admin-dashboard/SuperAdminDashboard.html` |
| Restaurant Owner | `/owner/dashboard` | `screens/owner-dashboard/OwnerDashboard.html` |
| Owner Menu & Brand | `/owner/menu` | `screens/owner-menu-management/OwnerMenuManagement.html` |
| Manager | `/manager/operations` | `screens/manager-operations/ManagerOperations.html` |
| Waiter | `/waiter/floor` | `screens/waiter-floor/WaiterFloor.html` |
| Cashier POS | `/pos/register` | `screens/cashier-pos/CashierPOS.html` |
| Kitchen Display (KDS) | `/kds/pass` | `screens/kds-display/KitchenDisplay.html` |
| Customer QR Ordering | `/menu/[tenantSlug]/[tableId]` | `screens/customer-qr-menu/CustomerQRMenu.html` |

## 4. Design System & Component Kit (`packages/ui-kit`)
- **Tokens**: Defined in `DESIGN.md` and compiled to `tailwind.config.js`.
- **Components**: Canonical HTML/Tailwind sticker sheets in `components/`:
  - `button.html` (Primary, Secondary Operational, Outline, Destructive, Icon, With-Icon)
  - `card.html` (Elevated Metric, Action Ticket, Interactive POS Tile)
  - `input-field.html` (Text, Search with Icon)
  - `table.html` (Standard Operational Data Table with `tabular-nums`)
  - `badge.html` (Status & Numeric Badges)
  - `tabs.html` (Horizontal Tab Strip)
- **Icons**: Designed with Material Symbols Outlined in prototypes; maps 1:1 to `lucide-react` in Next.js (`Store`, `UtensilsCrossed`, `QrCode`, `ReceiptIndianRupee`, `ChefHat`, `Users`).

## 5. Multi-Tenant & GST Configuration Notes
- **Tenants**: Sampled with *Tamarind & Co.* (`brand-tamarind`: `#9A3412`) and *Roast & Bloom* (`brand-roast`: `#3F6212`).
- **Taxation**: Tax rates are never hardcoded; POS and Owner Billing read configurable slabs (`5% GST = 2.5% CGST + 2.5% SGST`, `18% GST`, or `0% Exempt`).
- **Mock Boundary**: All interactive state in the HTML prototypes uses local JavaScript state and mock Indian restaurant data; production builds connect to `apps/api` (NestJS) via `packages/shared-types`.
