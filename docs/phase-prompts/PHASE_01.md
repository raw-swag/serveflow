# ServeFlow — Implementation Prompt: Phase 01

## 1. Phase Title
**PHASE 01 — Project Foundation, Monorepo Scaffolding & Shared Tooling**

---

## 2. Objective
Scaffold the complete ServeFlow monorepo workspace using Turborepo, establishing the Next.js 14+ frontend application (`apps/web`), the NestJS backend application (`apps/api`), and shared TypeScript packages (`packages/shared-types`, `packages/validation`, `packages/database`, `packages/ui-kit`). Configure unified linting, formatting, type checking, and environment validation.

---

## 3. Business Context
A high-performance SaaS platform requires a clean, robust, and unified codebase foundation to allow full-stack type safety between client interfaces and server APIs, ensuring zero drift between data contracts and frontend consumption.

---

## 4. Prerequisites
- Node.js v20+ or v22+ installed.
- Git repository initialized on branch `main`.
- Phase 00 documentation verified in `docs/`.

---

## 5. Exact Scope
- Initialize root `package.json` with workspace configuration (`apps/*`, `packages/*`).
- Configure `turbo.json` with build, lint, dev, and test pipelines.
- Scaffold `apps/web`: Next.js 14+ App Router, TypeScript, Tailwind CSS, Lucide React, and basic route group scaffolding (`(auth)`, `(dashboard)`, `(kds)`, `(pos)`, `(customer)`).
- Scaffold `apps/api`: NestJS application with TypeScript, ConfigModule, validation pipe, and standard response interceptor.
- Scaffold `packages/shared-types`: Common TypeScript enums, API response envelopes, and interfaces.
- Scaffold `packages/validation`: Shared Zod schemas for user authentication, pagination, and tenant setup.
- Scaffold `packages/database`: Base Prisma ORM setup pointing to PostgreSQL.
- Setup root `.gitignore`, `.prettierrc`, and ESLint configurations.

---

## 6. Out-of-Scope Features
- Actual business logic endpoints (no table management, no order processing).
- Production database migrations (reserved for Phase 02).
- Real payment gateway API calls or third-party webhooks.

---

## 7. Required Frontend Implementation (`apps/web`)
- Next.js 14+ App Router initialization.
- Tailwind CSS setup with ServeFlow color palette variables.
- Base layout and health-check page at `/` confirming frontend status.
- Route directory scaffolding with placeholder `page.tsx` for each primary interface group.

---

## 8. Required Backend Implementation (`apps/api`)
- NestJS application bootstrap in `src/main.ts` with global prefix `/api/v1` and CORS enabled.
- Global exception filter (`HttpExceptionFilter`) ensuring standardized JSON error responses.
- Global transform interceptor (`TransformInterceptor`) wrapping responses in the standard format `{ success, statusCode, message, data, meta }`.
- Basic health-check controller at `/api/v1/health`.

---

## 9. Database Changes
- None during Phase 01. Prisma schema placeholder initialized in `packages/database/prisma/schema.prisma`.

---

## 10. API Endpoints and Contracts
- `GET /api/v1/health`: Returns `{ status: "ok", timestamp: ISO, version: "0.1.0" }`.

---

## 11. Authentication and Authorization Requirements
- No auth enforcement on the health check endpoint.

---

## 12. UI/UX Requirements
- Minimalist, clean landing page showing ServeFlow branding, status indicator, and environment confirmation.

---

## 13. Edge Cases
- Cross-platform path separators (Windows vs Linux).
- Hot-module reloading working simultaneously across `apps/web` and `apps/api`.

---

## 14. Error Handling
- Invalid routes in NestJS must return standardized JSON errors rather than HTML error pages.

---

## 15. Security Considerations
- CORS origins restricted via `.env` configuration.
- Security headers enabled via `helmet` in NestJS.

---

## 16. Unit Testing
- Test suite verifying health check endpoint in NestJS.
- Shared Zod schema validation tests in `packages/validation`.

---

## 17. Integration Testing
- Turborepo build task successfully builds all apps and packages (`pnpm run build` / `npm run build`).

---

## 18. End-to-End Testing
- Playwright smoke test loading the root frontend page.

---

## 19. Acceptance Criteria
1. Monorepo builds cleanly with zero TypeScript errors (`tsc --noEmit`).
2. `npm run dev` or `pnpm run dev` boots both Next.js (port 3000) and NestJS (port 4000).
3. Accessing `http://localhost:4000/api/v1/health` returns valid JSON status.
4. Shared validation and type packages can be imported cleanly into both frontend and backend.

---

## 20. Documentation Updates
- Update `CHANGELOG.md` with Phase 01 completion details.

---

## 21. Files/Modules Expected to Change
- `package.json`, `turbo.json`
- `apps/web/**`
- `apps/api/**`
- `packages/**`

---

## 22. Git and Migration Requirements
- Commit changes cleanly: `chore(foundation): complete phase 01 monorepo scaffolding`.

---

## 23. Final Completion Report Format
- Summary of scaffolded packages and apps.
- Terminal outputs of build and health checks.
- Confirmation of acceptance criteria.
