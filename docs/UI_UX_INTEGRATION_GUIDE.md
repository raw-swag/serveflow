# ServeFlow — UI/UX Reference Integration Guide

## 1. Executive Summary & Purpose

This document provides the authoritative integration guide and design specification connecting the **Google Stitch UI/UX design package** (`design-reference/stitch/`) with the **ServeFlow commercial SaaS architecture** (`apps/web`, `packages/ui-kit`).

The Stitch UI/UX delivery represents the visual source of truth for ServeFlow. It establishes:
- A sophisticated enterprise aesthetic combining deep slate-navy and emerald-teal operational accents.
- Dedicated light operational surfaces for administrative, cashier, waiter, and customer interfaces.
- A purpose-built, high-contrast dark theme for Kitchen Display Systems (KDS).
- Real-world Indian restaurant context (₹ INR currency formatting, CGST/SGST breakdowns, dietary badges, FSSAI indicators).

---

## 2. Design Reference Inventory

The Stitch package contains eight core screen prototypes located in `design-reference/stitch/stitch_serveflow_restaurant_saas_platform/`:

| Prototype Directory | Purpose & Context | Source File | Target Application Route |
| :--- | :--- | :--- | :--- |
| `super_admin_global_overview/` | Global SaaS Control Plane: Multi-tenant directory, MRR metrics, tenant provisioning, system health telemetry. | `code.html` | `/admin/overview` (Route group: `app/(super-admin)/...`) |
| `owner_main_dashboard/` | Multi-outlet executive command: Daily revenue, live occupancy, hourly trend graph, fast actions. | `code.html` | `/owner/dashboard` (Route group: `app/(dashboard)/...`) |
| `owner_menu_multi_tenant_branding/` | Brand customization engine & dynamic menu catalog: Theme switcher (Tamarind & Co. vs Roast & Bloom), item stock toggles (86-list), modifier builders. | `code.html` | `/owner/menu` (Route group: `app/(dashboard)/menu/...`) |
| `manager_live_operations/` | Floor manager operations: Live table occupancy grid, floor section tabs, active order queue, staff roster status. | `code.html` | `/manager/operations` (Route group: `app/(dashboard)/operations/...`) |
| `waiter_floor_table_ordering/` | Waiter mobile floor companion: One-handed table grid, instant order punching sheet, bill request alerts, food-ready notifications. | `code.html` | `/waiter/floor` (Route group: `app/(waiter)/...`) |
| `cashier_pos_gst_billing/` | High-throughput POS workstation: Keyboard shortcuts, split-billing modal, CGST/SGST calculation, dynamic UPI QR display, thermal print preview. | `code.html` | `/pos/register` (Route group: `app/(pos)/...`) |
| `kitchen_display_system_kds/` | Tablet-optimized dark mode KDS: Station filtering (Tandoor, Curry, Bar), ticket aging timers (<10m, 10-20m, >20m), item ready toggles. | `code.html` | `/kds/pass` (Route group: `app/(kds)/...`) |
| `customer_qr_ordering_experience/` | Guest mobile QR ordering: Zero-install mobile web menu, dietary toggles (Veg/Non-Veg), modifier sheets, live cart bar. | `code.html` | `/menu/[tenantSlug]/[tableId]` (Route group: `app/(customer)/...`) |

---

## 3. Design Token Reference & Design System Specification

### 3.1 Color Palette & Semantic Tokens
The design system avoids generic Tailwind grays and bright neon accents, employing an authoritative and functional palette:

```yaml
colors:
  # Operational Semantic Tokens
  success: "#15803D"               # Green-700
  on-success: "#FFFFFF"
  success-container: "#DCFCE7"     # Green-100
  on-success-container: "#14532D"

  warning: "#B45309"               # Amber-700
  on-warning: "#FFFFFF"
  warning-container: "#FEF3C7"     # Amber-100
  on-warning-container: "#78350F"

  error: "#BA1A1A"                 # Red-700
  on-error: "#FFFFFF"
  error-container: "#FFDAD6"       # Red-100
  on-error-container: "#93000A"

  info: "#0369A1"                  # Sky-700
  on-info: "#FFFFFF"
  info-container: "#E0F2FE"        # Sky-100
  on-info-container: "#0C4A6E"

  # Light Surfaces (Default SaaS Theme)
  light:
    primary: "#001428"             # Deep slate-navy
    on-primary: "#FFFFFF"
    primary-container: "#0F2942"   # Slate-navy container
    on-primary-container: "#D1E4FF"
    secondary: "#006C53"           # Emerald-teal operational CTA
    on-secondary: "#FFFFFF"
    secondary-container: "#95F1D0"
    on-secondary-container: "#00382A"
    background: "#F9F9FF"          # Crisp cool canvas
    on-background: "#111C2D"
    surface: "#F9F9FF"
    surface-container-lowest: "#FFFFFF" # Clean card surface
    surface-container-low: "#F0F3FF"
    surface-container: "#E7EEFF"
    outline: "#74777E"
    outline-variant: "#C3C6CE"     # 1px border token

  # Dark Surfaces (Dedicated Kitchen Display System)
  dark:
    background: "#081425"          # Deep blue-black canvas
    on-background: "#D8E3FB"
    surface: "#081425"
    surface-container-low: "#111C2D" # KDS ticket background
    surface-container: "#152031"
    surface-container-high: "#1F2A3C"
    outline-variant: "#43474D"
    primary: "#B0C9E8"
    secondary: "#7CD8B8"
```

### 3.2 Typography System
Three dedicated font families serve specific interface roles:
- **Red Hat Text**: Geometric sans used for high-impact metric counters, dashboard titles, and modal headers (`font-display`, `font-headline`).
- **Instrument Sans**: Clean, high-legibility sans used for dense data tables, POS menus, forms, and mobile order sheets (`font-title`, `font-body`, `font-label`).
- **Spline Sans Mono**: High-readability monospace used for Indian Rupee amounts (`₹`), invoice numbers, GST calculations, table numbers, and KDS countdown timers (`font-mono`, with `tabular-nums`).

### 3.3 Layout Dimensions & Spacing Grid
- **Spacing Base**: 4px base unit (`gutter-xs: 4px`, `gutter-sm: 8px`, `gutter-md: 16px`, `gutter-lg: 24px`, `gutter-xl: 32px`, `section: 40px`).
- **Desktop Sidebar**: Fixed 240px (`w-60` / `15rem`) persistent rail on admin and owner portals.
- **POS Workstation**: Split-pane layout with 7:5 ratio (Item catalog 58%, Live bill tape 42%).
- **Mobile Interfaces**: Optimized for single-column 390px-430px viewports (Waiter and Customer QR).
- **Corner Radii**: Functional radii: `sm: 4px` (dense badges), `DEFAULT: 8px` (buttons/inputs), `md: 12px` (cards/POS tiles), `lg: 16px` (modals/sheets).

---

## 4. Reusable Component Extraction Plan

During Phase 01 (`packages/ui-kit`), components must be extracted from the HTML sticker sheets into typed, reusable React / shadcn/ui components:

| Component | Prototype Source | Production React Component | Variants & Props |
| :--- | :--- | :--- | :--- |
| **Button** | `button.html` | `Button.tsx` | `variant: 'primary' \| 'secondary' \| 'outline' \| 'destructive' \| 'icon'`, `size: 'sm' \| 'md' \| 'lg'` |
| **Badge** | `badge.html` | `Badge.tsx` | `variant: 'success' \| 'warning' \| 'error' \| 'info' \| 'neutral'`, `type: 'dot' \| 'numeric'` |
| **Card** | `card.html` | `MetricCard.tsx`, `TicketCard.tsx` | `variant: 'elevated' \| 'action' \| 'interactive'`, `status` |
| **Input / Search** | `input-field.html` | `Input.tsx`, `SearchInput.tsx` | Leading icon, trailing badge, clearable |
| **Data Table** | `table.html` | `DataTable.tsx` | Sorting, pagination, row selection, `tabular-nums` |
| **Tabs** | `tabs.html` | `Tabs.tsx` | Horizontal pill tabs, icon tabs, badge counts |
| **Dietary Indicator**| QR & Menu prototypes | `DietaryBadge.tsx` | `type: 'veg' \| 'non-veg' \| 'egg' \| 'jain'` |
| **Rupee Display** | POS & Bill prototypes | `CurrencyDisplay.tsx` | Amount, prefix `₹`, font mono, tabular figures |
| **Ticket Timer** | KDS prototype | `TicketTimer.tsx` | Elapsed seconds, warning thresholds (<10m, 10-20m, >20m) |

---

## 5. Application Route Mapping & Architecture Alignment

The Stitch route recommendations seamlessly harmonize with the ServeFlow Next.js App Router structure:

```
apps/web/app/
├── (super-admin)/
│   └── admin/overview/page.tsx           <-- Maps to super_admin_global_overview/code.html
├── (dashboard)/
│   ├── owner/dashboard/page.tsx          <-- Maps to owner_main_dashboard/code.html
│   ├── owner/menu/page.tsx               <-- Maps to owner_menu_multi_tenant_branding/code.html
│   └── manager/operations/page.tsx       <-- Maps to manager_live_operations/code.html
├── (pos)/
│   └── pos/register/page.tsx             <-- Maps to cashier_pos_gst_billing/code.html
├── (kds)/
│   └── kds/pass/page.tsx                 <-- Maps to kitchen_display_system_kds/code.html
├── (waiter)/
│   └── waiter/floor/page.tsx             <-- Maps to waiter_floor_table_ordering/code.html
└── (customer)/
    └── menu/[tenantSlug]/[tableId]/page.tsx <-- Maps to customer_qr_ordering_experience/code.html
```

---

## 6. Prototype Limitations & Production Implementation Boundary

The HTML prototypes demonstrate visual fidelity and local DOM behaviors. The table below delineates what the prototypes provide versus what must be built during backend/frontend integration phases:

| Feature Area | Prototype Behavior (Local Mock) | Production Requirement (Phased Implementation) |
| :--- | :--- | :--- |
| **Authentication & RBAC** | Static mock profiles displayed in headers. | JWT HttpOnly cookies, session refresh, RBAC route guards (`Phase 03`). |
| **Data Persistence** | In-memory JavaScript arrays and counters. | PostgreSQL 16+ via Prisma ORM transactions (`Phase 02`). |
| **Tenant Isolation** | Simulated by switching local CSS classes. | Database RLS with `SET LOCAL app.current_tenant_id` (`Phase 02`, `14`). |
| **Live Updates (KDS & POS)**| DOM element toggles and simulated counters. | Low-latency WebSockets via Socket.IO & Redis Pub/Sub (`Phase 10`, `11`). |
| **Tax & GST Engine** | Hardcoded calculation: `subtotal * 0.025`. | Dynamic database-driven tax engine with round-off handling (`Phase 12`). |
| **Payments** | Simulated modal clicking "Confirm". | Razorpay webhook cryptographic HMAC signature verification (`Phase 12`). |
| **Icons** | Google Material Symbols CDN web font. | Typed Lucide React SVG components (`packages/ui-kit`). |

---

## 7. Responsiveness, Accessibility & Technical Audit

### Audit Findings:
1. **Desktop & POS Screens (1280px–1440px)**:
   - Super Admin, Owner Dashboard, and POS workstation prototypes demonstrate excellent space utilization and information density.
   - *Recommendation*: On POS, ensure the bill tape section has a sticky bottom tender action bar so the total is visible without scrolling on lower-resolution POS monitors (e.g., 1024x768).
2. **KDS Landscape Tablet Screen**:
   - High-contrast dark theme (`#081425`) avoids screen glare and provides outstanding visibility.
   - *Recommendation*: Ensure touch targets for "Mark Ready" are minimum 48x48px for kitchen tablet environments.
3. **Waiter & Customer Mobile Screens (390px–430px)**:
   - Thumb-accessible bottom navigation and cart bars provide great mobile ergonomics.
   - *Recommendation*: Ensure sticky bottom cart sheets do not obscure menu items when expanded on smaller mobile viewports (e.g., iPhone SE 375px).
4. **Icons**:
   - Prototypes use Google Fonts Material Symbols (`<span class="material-symbols-outlined">...</span>`). In `apps/web`, these will be mapped 1:1 to Lucide React icons (`lucide-react`) to avoid external CDN font latency.
