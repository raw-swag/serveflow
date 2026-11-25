# ServeFlow Core Engineering Rules & Architecture Invariants

**Version**: 1.0.0  
**Enforcement**: Mandatory across all development phases, AI agents, and engineering contributors.

---

## 1. Golden Operating Invariants

1. **Inspect Before Editing**: Always inspect existing files, dependencies, database models, and git state before writing or modifying any code.
2. **Read the Active Phase Prompt**: Execute exclusively within the scope defined in `docs/phase-prompts/PHASE_XX.md`. Do not expand scope into future phases.
3. **Follow Architectural Blueprints**: All code must conform to `docs/SYSTEM_ARCHITECTURE.md`, `docs/TENANT_ISOLATION.md`, and `docs/DATABASE_SCHEMA.md`.
4. **Zero Fake Production Functionality**: Never stub production endpoints with mock return data once an endpoint is marked implemented. Mock only in isolated test fixtures.
5. **Zero Hardcoded Tenant Data**: Never hardcode restaurant names, outlet IDs, station names, tax percentages, or subscription limits. Everything must be database-driven.
6. **No Plaintext Credentials or Secrets**: Passwords must be hashed using Argon2id or bcrypt (cost factor >= 12). API keys and tokens must be stored encrypted or hashed. Secrets must only reside in environment variables.
7. **No Insecure Shared Employee Accounts**: Every staff member (chef, waiter, cashier, manager) must have distinct credentials and audit trails. No generic `admin`/`waiter` logins.
8. **Never Rely on Client-Side Authorization**: Every backend endpoint must independently authenticate the caller, resolve tenant context, and verify granular RBAC permissions.
9. **Strict Cross-Tenant Isolation**: Every database query touching tenant-scoped entities must include `tenantId` and `outletId` filters, reinforced by PostgreSQL Row-Level Security (RLS).
10. **Zero Unverified Payment Trust**: Never mark an order or bill as "PAID" based on client-side callbacks. Payment confirmation requires cryptographic webhook signature verification from the payment gateway.
11. **No Unnecessary Microservices**: ServeFlow maintains a modular monolith architecture (Next.js client + NestJS API backend within Turborepo). Do not introduce distributed microservice topologies.
12. **No Premature Advanced Features**: Implement strictly what the active phase mandates. Do not introduce speculative complexity or premature optimizations.
13. **Do Not Delete Working Functionality Without Justification**: Refactoring must never regress existing features or break established test suites.
14. **No Hiding Failed Tests**: Never skip (`test.skip`), comment out, or delete failing tests to simulate green pipelines. Fix the root cause.
15. **No Claiming Completion Without Evidence**: A phase is only complete when all acceptance criteria, automated tests, and verification logs are executed and recorded.
16. **Keep Documentation in Sync**: Any schema change, new endpoint, or configuration update must immediately be reflected in `docs/` and `docs/CHANGELOG.md`.
17. **Preserve Backward Compatibility**: API contracts must maintain backward compatibility across minor versions. Database migrations must be forward- and rollback-safe.
