# Antigravity Workflow: Complete Phase

**Workflow Identifier**: `complete-phase`  
**Purpose**: Governs the strict, reproducible execution of any single implementation phase (Phase 01 through 15) in ServeFlow.

---

## Workflow Steps

### Step 1: Identify Target Phase
1. Receive and verify user instruction for the target phase number (e.g., `Phase 01`).
2. Verify that the requested phase is valid (between Phase 01 and Phase 15).

### Step 2: Read Phase Specification
1. Open and thoroughly read `docs/phase-prompts/PHASE_XX.md`.
2. Extract:
   - Target objectives.
   - Exact in-scope requirements.
   - Explicit out-of-scope constraints.
   - Frontend and backend deliverables.
   - Acceptance criteria and verification tests.

### Step 3: Review Architectural Foundation & Invariants
1. Review `.agents/rules/serveflow-core.md` for non-negotiable coding rules.
2. Review relevant architectural blueprints:
   - `docs/SYSTEM_ARCHITECTURE.md`
   - `docs/DATABASE_SCHEMA.md`
   - `docs/API_CONTRACTS.md`
   - `docs/TENANT_ISOLATION.md`
   - `docs/ROLE_PERMISSION_MATRIX.md`

### Step 4: Inspect Workspace & Git State
1. Execute `git status` and inspect existing source tree.
2. Check dependencies in root and package `package.json` files.
3. Review previous commits and CHANGELOG entries.

### Step 5: Verify Prerequisites
1. Confirm that all prerequisite phases (e.g., Phase 01 before Phase 02) are fully implemented and verified.
2. If prerequisites are missing or broken, halt and report the dependency blockers to the user. Do not proceed with an unstable foundation.

### Step 6: Formulate Detailed Implementation Plan
1. Break down the phase requirements into an ordered execution checklist:
   - Database migrations / Prisma schema updates.
   - Backend modules, services, controllers, and DTOs.
   - Frontend routes, components, state management, and API clients.
   - Security checks, validation pipes, and error handlers.
   - Unit, integration, and E2E test suites.

### Step 7: Execute Implementation
1. Write clean, modular, and type-safe code matching the exact phase specification.
2. Ensure all tenant context and RBAC constraints are strictly enforced.
3. Ensure no hardcoded values or fake mocks are introduced.

### Step 8: Execute Verification & Automated Tests
1. Run backend tests (unit & integration).
2. Run frontend component and page tests.
3. Verify type checking across the monorepo (`tsc --noEmit`).
4. Run linter and formatting checks.

### Step 9: Conduct Security & Isolation Audit
1. Audit all newly introduced database queries for explicit `tenantId` filtering.
2. Audit all newly exposed API endpoints for JWT guards, RBAC roles, and rate limiters.
3. Verify that zero client-side prices or payment statuses are blindly trusted.

### Step 10: Update Project Documentation & Changelog
1. Document any schema or API additions in `docs/DATABASE_SCHEMA.md` and `docs/API_CONTRACTS.md`.
2. Append a comprehensive release entry in `docs/CHANGELOG.md` detailing all additions, fixes, and architectural notes.

### Step 11: Generate Phase Completion Report
1. Prepare a formal markdown completion report detailing:
   - Summary of implemented deliverables.
   - Exact list of created and modified files.
   - Test execution results and coverage evidence.
   - Verification of all acceptance criteria.
   - Any identified technical debt or items deferred to later phases.

### Step 12: Halt & Await User Instruction
1. **CRITICAL**: Stop execution immediately after reporting completion of the active phase.
2. **DO NOT** begin or scaffold the next phase without explicit user authorization.
