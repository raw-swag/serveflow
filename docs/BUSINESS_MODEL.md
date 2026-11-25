# ServeFlow — Business Model & Multi-Tenant Architecture

## 1. Multi-Tenant Architectural Hierarchy

ServeFlow operates on a strict multi-tenant structural hierarchy:

```
Platform Super Admin (Global Scope)
       │
       ▼
Tenant (Restaurant Brand / Corporate Entity)
       │
       ├── Outlet 1 (e.g., Downtown Flagship)
       │     ├── Kitchen Stations (Grill, Fry, Bar, Dessert)
       │     ├── Dining Areas / Sections (Ground Floor, Rooftop, Patio)
       │     │     └── Tables & QR Codes (Table 1, Table 2...)
       │     └── Staff & Terminal Assignments (Waiters, Cashiers, Chefs)
       │
       └── Outlet 2 (e.g., Suburban Express)
             ├── Kitchen Stations
             ├── Tables & QR Codes
             └── Staff Assignments
```

---

## 2. Multi-Tenancy Strategy

ServeFlow uses a **Shared Database, Isolated Schemas / Shared Schema with Foreign Key & Row-Level Security (RLS)** architecture.

### Architectural Rationale:
- **Cost Efficiency & Resource Utilization**: Housing thousands of restaurant tenants within a unified, auto-scaling PostgreSQL cluster minimizes operational overhead compared to database-per-tenant architectures.
- **Enforced Isolation via RLS**: Every tenant query enforces `tenantId` and `outletId` filtering at both the application ORM level (Prisma middleware) and the database engine level (PostgreSQL RLS policies).
- **Tenant Context Resolution**: Resolved via:
  1. Subdomain routing (e.g., `tandoor.serveflow.in`).
  2. Cryptographically signed JWT claims (`tenant_id`, `outlet_id`, `role_id`).
  3. Dynamic QR code tokens containing signed, tamper-proof payload identifiers.

---

## 3. Commercial Model & Pricing Structure

ServeFlow is monetized through a tiered Subscription-as-a-Service (SaaS) model with optional usage-based add-ons:

### Tier 1: Starter Plan (Single Outlet, QSR / Small Cafe)
- Target: Small bistros and quick-service counters (up to 10 tables).
- Features: 1 Outlet, QR Digital Menu & Ordering, Single KDS screen, Standard POS Billing, Basic Reports.
- Limits: Up to 5 employee accounts, 10 active tables.

### Tier 2: Growth Plan (Standard Dine-In Restaurant)
- Target: Full-service casual and fine dining restaurants (10–35 tables).
- Features: 1 Outlet, Multi-station KDS routing, Waiter companion app, Split billing & GST engine, WhatsApp billing receipts, Role-based staff access, Advanced Analytics.
- Limits: Up to 20 employee accounts, 35 tables.

### Tier 3: Business Plan (High-Volume & Multi-Outlet Chains)
- Target: High-volume multi-location restaurant chains.
- Features: Unlimited Outlets (priced per outlet bundle), Centralized menu and inventory syndication, Multi-tier role permissions, Priority KDS routing, Custom branding, API Webhooks.
- Limits: Unlimited staff, up to 100 tables per outlet.

### Tier 4: Enterprise / Custom Plan
- Dedicated database read-replicas, white-label custom domain, bespoke integrations with third-party ERPs, dedicated onboarding manager, SLA guarantees.

---

## 4. Onboarding Workflow: Manual to Automated

### Phase A: White-Glove Manual Onboarding (Initial Commercial Go-To-Market)
1. ServeFlow Sales / Support team registers the tenant and sets up the primary owner account via the Super Admin Dashboard.
2. Team configures brand assets (logo, colors, header images, invoice header/footer).
3. Configures outlets, floor sections, table numbers, and generates printable high-resolution QR plaques.
4. Imports restaurant menu (categories, items, variants, dietary badges, allergens, prices).
5. Configures kitchen stations (e.g., Tandoor, Main Kitchen, Bar) and sets item routing rules.
6. Sets up GST numbers, FSSAI registration codes, and payment gateway credentials.
7. Conducts on-site staff training and hands over administrative master credentials.

### Phase B: Automated Self-Service Onboarding (Scale Phase)
1. Restaurant owner registers online via `serveflow.in/signup`.
2. Interactive step-by-step Setup Wizard guides brand setup, floor setup, menu CSV import, and Razorpay onboarding.
3. Automated QR pack generation with downloadable vector PDF templates ready for printing.
4. 14-day free trial auto-provisioned with seamless upgrade to Starter/Growth/Business tiers.
