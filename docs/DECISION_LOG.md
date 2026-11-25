# ServeFlow — Architecture Decision Log (ADR)

## ADR-001: Monorepo Strategy with npm Workspaces
- **Status**: Accepted (Implemented in Phase 01)
- **Context**: Need a unified, reproducible monorepo structure sharing types, validation schemas, and UI design components between the Next.js frontend and NestJS backend.
- **Decision**: Use npm workspaces (Node.js v22.12.0 LTS, npm 10.9.0) with clean package exports and tsconfig project references.
- **Consequence**: Single consistent root `package-lock.json`, zero external workspace manager drift, and lightning-fast local compilation.

## ADR-002: Frontend Architecture — Single Next.js Application with Route Groups
- **Status**: Accepted (Implemented in Phase 01)
- **Context**: Need to support 8 distinct interfaces (Super Admin, Owner Dashboard, Owner Menu, Manager Operations, Waiter Floor, Cashier POS, KDS Pass, and Customer QR Ordering).
- **Decision**: Implement a single Next.js 14+ App Router application (`apps/web`) leveraging segregated route groups:
  - `(super-admin)/admin/overview`
  - `(dashboard)/owner/dashboard`
  - `(dashboard)/owner/menu`
  - `(dashboard)/manager/operations`
  - `(waiter)/waiter/floor`
  - `(pos)/pos/register`
  - `(kds)/kds/pass`
  - `(customer)/menu/[tenantSlug]/[tableId]`
- **Consequence**: Shared layouts, unified `@next/font/google` asset optimization, and clean URL routing without deploying 8 separate applications.

## ADR-003: UI Design System & Component Library (`@serveflow/ui-kit`)
- **Status**: Accepted (Implemented in Phase 01)
- **Context**: Translate official Google Stitch UI/UX design references into production-grade React components.
- **Decision**: Author `@serveflow/ui-kit` with typed design tokens (`colors.light`, `colors.dark`, typography, spacing, radii) and Lucide React icons instead of Material Symbols CDN fonts.
- **Consequence**: Zero layout shifts, no external runtime web font delays, and consistent styling across all portals.

## ADR-004: Multi-Tenancy — Shared Database with Row-Level Security (RLS)
- **Status**: Accepted
- **Context**: Need cost-effective scalability for thousands of restaurants while preventing any possibility of cross-tenant data leaks.
- **Decision**: Shared PostgreSQL database with explicit `tenant_id` foreign keys enforced by both Prisma middleware and PostgreSQL Row-Level Security (RLS) using transaction-local `SET LOCAL app.current_tenant_id`.
- **Consequence**: Highly cost-effective; requires diligent adherence to context injection in all database transactions (Phase 02).

## ADR-005: Cryptographic Dynamic QR Codes
- **Status**: Accepted
- **Context**: Physical table QR codes can be photographed, spoofed, or maliciously abused outside the restaurant.
- **Decision**: QR codes embed HMAC-SHA256 signed tokens encoding tenant, outlet, table, and a revocable token version.
- **Consequence**: Instant one-click revocation of compromised table QR codes without changing physical table numbering.

## ADR-006: Node.js 26 Active LTS Runtime Standard & Next.js 16 (Turbopack)
- **Status**: Accepted (Implemented in Phase 01.1 & Phase 01.2)
- **Context**: Ensure the long-term runtime foundation is on modern Active LTS releases with official support lifecycle and optimal Turbopack compilation.
- **Decision**: Standardize on Node.js 26.13.1 (Active LTS) with npm 11.20.0, Next.js 16.4.6, React 19.0.0, and root engine `>=20.9.0`.
- **Consequence**: Full access to latest V8 optimizations, Web Streams API performance, and zero deprecated runtime warnings.

## ADR-007: Automated Route Smoke Testing with Playwright
- **Status**: Accepted (Implemented in Phase 01.2)
- **Context**: Need real browser verification of all 8 core application route groups against production builds before deployment.
- **Decision**: Integrate `@playwright/test` running automated headless browser passes against the built Next.js web application.
- **Consequence**: Verifies end-to-end HTTP 200 delivery, DOM rendering, and CSS theme application with zero manual intervention.
