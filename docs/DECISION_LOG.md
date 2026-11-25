# ServeFlow — Architecture Decision Log (ADR)

## ADR-001: Monorepo Strategy with Turborepo
- **Status**: Accepted
- **Context**: We need to share types, validation schemas, and database definitions between the Next.js frontend and NestJS backend.
- **Decision**: Use Turborepo with pnpm/npm workspaces.
- **Consequence**: Unified build orchestration, blazing fast caching, and zero type drift between client and server.

## ADR-002: Frontend Architecture — Single Next.js Application vs Multiple Apps
- **Status**: Accepted
- **Context**: Need to support 7 distinct interfaces (Super Admin, Owner, Manager, POS, KDS, Waiter, Customer QR).
- **Decision**: Implement a single Next.js App Router application leveraging route groups (`(auth)`, `(dashboard)`, `(kds)`, `(pos)`, `(customer)`).
- **Consequence**: Greatly simplifies hosting, deployment pipelines, and shared component reuse while maintaining clean route-level code splitting and distinct layouts.

## ADR-003: Multi-Tenancy — Shared Database with Row-Level Security (RLS)
- **Status**: Accepted
- **Context**: Need cost-effective scalability for thousands of restaurants while preventing any possibility of cross-tenant data leaks.
- **Decision**: Shared PostgreSQL database with explicit `tenant_id` foreign keys enforced by both Prisma middleware and PostgreSQL Row-Level Security (RLS).
- **Consequence**: Highly cost-effective; requires diligent adherence to context injection in all database transactions.

## ADR-004: Real-Time Event Communication — Socket.IO with Redis Adapter
- **Status**: Accepted
- **Context**: Instant order synchronization to KDS, live table status to POS, and waiter alerts require low-latency pub/sub.
- **Decision**: Socket.IO integrated with NestJS WebSockets, backed by Redis Streams/Pub-Sub.
- **Consequence**: Enables multi-instance horizontal scaling with room-level routing.

## ADR-005: Cryptographic Dynamic QR Codes
- **Status**: Accepted
- **Context**: Physical table QR codes can be photographed, spoofed, or maliciously abused outside the restaurant.
- **Decision**: QR codes embed HMAC-SHA256 signed tokens encoding tenant, outlet, table, and a revocable token version.
- **Consequence**: Instant one-click revocation of compromised table QR codes without changing physical table numbering.
