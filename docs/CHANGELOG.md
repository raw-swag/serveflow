# ServeFlow — Project Changelog

All notable changes to the ServeFlow platform architecture and implementation are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.2.2] - 2026-11-25

### Verified - Phase 01.2: Final Runtime Alignment, Real UI Tests, Security Review & CI Verification
- **Node.js 26.13.1 Active LTS Runtime Alignment**:
  - Selected and installed official Node.js `26.13.1` (Active LTS) with npm `11.20.0`.
  - Updated root engine specification to `>=20.9.0` and aligned all workspace `@types/node` definitions to `22.13.14`.
  - Cleared all extraneous dependencies and validated clean lockfile with `npm ls`.
- **Real End-to-End Route Smoke Tests with Playwright**:
  - Implemented `@playwright/test` suite `apps/web/e2e/routes.smoke.spec.ts` testing all 8 primary application route skeletons.
  - Configured `apps/web/playwright.config.ts` targeting Microsoft Edge/Chromium with webServer automation (`npm run start` on port 3000).
  - All 8 routes verified with 200 HTTP response codes and key DOM element assertions.
- **Server-Side HTML Rendering Verification for UI Kit**:
  - Created real React server markup rendering test suite `packages/ui-kit/src/components/index.test.tsx` using `react-dom/server` `renderToStaticMarkup`.
  - Verified all 14 components: `Button`, `IconButton`, `Badge`, `StatusIndicator`, `Card`, `MetricCard`, `Input`, `SearchInput`, `Tabs`, `Modal`, `DataTable`, `CurrencyDisplay`, `DietaryBadge`, and `TicketTimer`.
- **Strict API Environment Validation & Exception Sanitization**:
  - Hardened `apps/api/src/common/env.validation.ts` with strict regex validation for integer `PORT` (1-65535) and URL parsing for `CORS_ORIGINS` (rejecting wildcards `*`, paths, credentials).
  - Enhanced `AllExceptionsFilter` in `apps/api/src/common/all-exceptions.filter.ts` with cryptographic `randomUUID()`, validated incoming `X-Request-Id` reflection, and redaction of sensitive credentials.
- **Continuous Integration Pipeline**:
  - Added `.github/workflows/ci.yml` matrix workflow executing dependency checks, typechecks, linter, unit tests, Next.js build, and Playwright tests under Node.js `26.13.1`.

---

## [0.2.1] - 2026-11-25

### Fixed - Phase 01.1: Foundation Stabilization, Security Corrections & Quality Gate Remediation
- **Frontend Upgrade to Next.js 16 (Turbopack)**:
  - Upgraded `apps/web` to Next.js `16.4.6` and React / React DOM `19.0.0`.
  - Migrated dynamic route parameters to asynchronous resolution pattern (`use(params)` for `app/(customer)/menu/[tenantSlug]/[tableId]/page.tsx`).
  - Successfully validated 10/10 pre-rendered static routes and dynamic routes compiled via Turbopack in sub-2s.
- **Node.js Policy & Engine Modernization**:
  - Added `.nvmrc` specifying Node.js `26.13.1` (Active LTS).
  - Modernized `package.json` engines to `>=20.0.0` to permit installation on modern patched Node.js releases.
  - Upgraded `@types/node` across workspaces to `22.13.14`.
- **CORS Security Hardening**:
  - Replaced insecure wildcard credential reflection in `apps/api/src/main.ts` with strict `configureCors()` allowlist helper.
  - Sourced explicit allowed origins from validated `CORS_ORIGINS` environment variable.
  - Added automated test suite `apps/api/src/common/cors.spec.ts` covering allowed origins, rejected origins, and credentials policy.
- **API Information Disclosure Prevention**:
  - Hardened `AllExceptionsFilter` in `apps/api/src/common/all-exceptions.filter.ts`.
  - Guaranteed that unexpected 500 errors return sanitized public error messages without exposing SQL statements, environment paths, or stack traces.
  - Added server-side correlation IDs (`requestId`) and diagnostic logger.
  - Added unit test suite `all-exceptions.filter.spec.ts` verifying zero data leakage on fatal internal errors.
- **Centralized Environment Validation**:
  - Implemented `validateEnv()` in `apps/api/src/common/env.validation.ts` using Zod schema.
  - Validates `NODE_ENV`, `PORT`, and `CORS_ORIGINS` on application bootstrap.
  - Added unit test suite `env.validation.spec.ts`.
- **Real Quality Gate Tooling (Replaced Placeholders)**:
  - Removed all `echo ... lint ok` placeholder scripts across all workspaces.
  - Configured actual TypeScript-aware ESLint 8.57 across `apps/api`, `apps/web`, and `packages/ui-kit`.
  - Configured real test runners across all workspaces (`jest` for API, node test runner for validation & UI kit, route test suite for Next.js).
- **Completed Shared UI Kit (`@serveflow/ui-kit`)**:
  - Implemented all 14 required reusable components: `Button`, `IconButton`, `Badge`, `StatusIndicator`, `Card`, `MetricCard`, `Input`, `SearchInput`, `Tabs`, `Modal`, `DataTable`, `CurrencyDisplay`, `DietaryBadge`, `TicketTimer`.
  - Added component test runner verifying formatting and component function signatures.
- **Git & Artifact Hygiene**:
  - Removed generated review ZIP binaries from git tracking via updated `.gitignore` (`artifacts/*.zip`).
  - Created review package `artifacts/serveflow-phase-01-remediation-review.zip` (untracked).

---

## [0.2.0] - 2026-11-25

### Added - Phase 01: Project Foundation, Monorepo Scaffolding & UI Design System
- Monorepo architecture with npm workspaces.
- Shared packages (`@serveflow/shared-types`, `@serveflow/validation`, `@serveflow/ui-kit`).
- NestJS API with global response wrappers and health check.
- Next.js App Router route skeletons translating official Google Stitch designs.

---

## [0.1.0] - 2026-11-25

### Added - Phase 00 & 00.1: Master Project Planning & UI/UX Import
- Complete system architecture blueprints, PRD, SRS, database schema, and 15 phase prompts.
- Official Google Stitch UI/UX design references imported and verified under `design-reference/stitch/`.
