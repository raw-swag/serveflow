# ServeFlow — Project Changelog

All notable changes to the ServeFlow platform architecture and implementation are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.0] - 2026-11-25

### Added - Phase 01: Project Foundation, Monorepo Scaffolding & UI Design System
- **Monorepo Architecture (`npm workspaces`)**:
  - Configured root workspace targeting Node.js v22.12.0 LTS and npm 10.9.0.
  - Established shared packages:
    - `@serveflow/shared-types`: Common API response envelopes, user roles, table/order statuses, and DTO contracts.
    - `@serveflow/validation`: Shared Zod validation schemas with Indian GSTIN and FSSAI regex validators.
    - `@serveflow/ui-kit`: Official Google Stitch design system tokens (`colors.light`, `colors.dark`, typography, radii, spacing) and reusable typed React components (`Button`, `Badge`, `MetricCard`, `CurrencyDisplay`, `DietaryBadge`).
- **NestJS Backend Engine (`apps/api`)**:
  - NestJS 10.3 API bootstrap listening on port 4000 with global prefix `/api/v1`.
  - Global `AllExceptionsFilter` normalizing all HTTP and internal errors into standard JSON envelopes.
  - Global `TransformInterceptor` wrapping successful responses into `{ success: true, statusCode, message, data, meta }`.
  - Live `HealthController` responding at `/api/v1/health` with automated unit test suite.
- **Next.js 14 Frontend Application (`apps/web`)**:
  - Next.js 14.2 App Router frontend listening on port 3000.
  - Configured Google Fonts via `@next/font/google`: `Red Hat Text` (Display/Headlines), `Instrument Sans` (Body/Labels), and `Spline Sans Mono` (Currency/Timers).
  - Implemented 8 distinct visual route skeletons based on Google Stitch references:
    - `/admin/overview` (Super Admin SaaS Control Plane)
    - `/owner/dashboard` (Multi-outlet Owner Executive Analytics)
    - `/owner/menu` (Dynamic Menu Engineering & 86 Availability Toggle)
    - `/manager/operations` (Live Floor Operations & Table Grid)
    - `/waiter/floor` (Waiter Mobile Floor Companion)
    - `/pos/register` (Cashier POS, Split Billing & GST Calculation)
    - `/kds/pass` (Dedicated Dark Mode Kitchen Display Pass)
    - `/menu/[tenantSlug]/[tableId]` (Customer Mobile QR Self-Ordering)
- **Review Artifact**:
  - Packaged clean review bundle at `artifacts/serveflow-phase-01-review.zip`.

---

## [0.1.0] - 2026-11-25

### Added - Phase 00 & 00.1: Master Project Planning & UI/UX Import
- Complete system architecture blueprints, PRD, SRS, database schema, and 15 phase prompts.
- Official Google Stitch UI/UX design references imported and verified under `design-reference/stitch/`.
