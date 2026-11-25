# ServeFlow — Product Requirements Document (PRD)

## 1. Purpose & Goals

The purpose of ServeFlow is to provide an India-first, cloud-native, multi-tenant restaurant management platform that streamlines dining operations, reduces table turnaround time, eliminates ordering errors, and ensures seamless compliance with Indian tax regulations.

---

## 2. Core Functional Requirements

### FR-01: Multi-Tenant Architecture & Super Admin Control Plane
- Global tenant management: Provision, suspend, upgrade, or archive restaurant tenants.
- Multi-outlet support: A single tenant account can operate multiple distinct outlets with independent table layouts, inventories, and staff rosters.
- Global audit logging: Comprehensive audit trail capturing critical administrative actions across all tenants.

### FR-02: Restaurant Onboarding & Customization Engine
- Full white-label branding: Custom logos, brand primary/secondary colors, typography, hero banners, and invoice templates.
- Complete business autonomy: Restaurant owners must be able to configure tables, menus, stations, staff, taxes, and discounts without engineering intervention.

### FR-03: Table & Cryptographic QR Code Management
- Visual floor plan management: Grouping tables by area (e.g., Ground Floor, AC Hall, Rooftop, Garden).
- Cryptographic dynamic QR tokens: Each table generates a unique, signed QR URL. If a QR code is compromised or vandalized, it can be revoked and regenerated with one click.
- Session-aware table states: Table state transitions: `VACANT`, `OCCUPIED_ORDERING`, `ORDER_IN_KITCHEN`, `FOOD_SERVED`, `BILL_REQUESTED`, `SETTLED`.

### FR-04: Dynamic Menu & Catalog Engineering
- Hierarchical structure: Category -> Subcategory -> Item -> Variants -> Modifier Groups -> Modifiers.
- Dietary flags: Pure Veg, Non-Veg, Egg, Jain, Vegan, Gluten-Free.
- Real-time 86'ing (Item Availability): Kitchen or manager can toggle an item or modifier as out of stock instantly across all digital customer menus and POS screens.

### FR-05: Customer QR Mobile Web Ordering
- Zero installation: PWA-ready responsive web app that opens instantly upon scanning table QR code.
- Live order cart & modifier customization (e.g., spice level, extra cheese).
- Real-time order progress tracking (`PLACED` -> `ACCEPTED` -> `PREPARING` -> `READY` -> `SERVED`).
- Digital call-waiter assistance button and bill request triggers.

### FR-06: Kitchen Display System (KDS)
- Touch-friendly interface designed for rugged kitchen tablets.
- Automatic station routing: Directing drink tickets to the Bar, tandoor items to the Tandoor Station, and curries to the Main Kitchen.
- Visual ticket aging: Color-coded alerts (Green: <10 min, Yellow: 10–20 min, Red: >20 min).
- Item-level and ticket-level status updates with sound alerts for new tickets.

### FR-07: Waiter Floor Companion
- Real-time mobile interface showing table occupancy, active bills, and kitchen readiness.
- Fast order taking at the table for guests preferring traditional waiter assistance.
- Table merging, transferring, and guest count adjustments.

### FR-08: Cashier POS, GST Billing & Payment Processing
- High-speed desktop POS interface with keyboard shortcuts.
- Dual-tier GST engine: Automated calculation of CGST (2.5%) + SGST (2.5%) or IGST (5%), customizable per item or category.
- Bill splitting by seat, item, or custom percentage.
- Payment methods: Cash, Card, Dynamic BharatQR/UPI, Razorpay gateway integration.
- Thermal receipt printing (80mm / 58mm ESC/POS compatible) featuring FSSAI number and GSTIN.

### FR-09: Analytics & Executive Intelligence
- Daily sales summary, Gross vs. Net revenue, Average Order Value (AOV), and table turnaround time.
- Menu engineering matrix: Stars (high volume, high margin), Plowhorses, Puzzles, and Dogs.
- Outlet comparison reports for multi-branch brands.

---

## 3. Non-Functional Requirements

- **Performance**: Customer QR menu initial render under 1.5 seconds on 4G networks. KDS and POS updates delivered via WebSockets within 200ms.
- **Scalability**: Capable of supporting 10,000 concurrent active tables and 500 concurrent kitchen stations with minimal latency.
- **Availability**: 99.9% uptime target with automated health checks and failovers.
- **Security**: Strict tenant data isolation via PostgreSQL RLS, bcrypt/Argon2 password hashing, JWT authentication, and OWASP Top 10 compliance.
- **Maintainability**: Unified TypeScript codebase sharing validation schemas (Zod) across frontend and backend.
