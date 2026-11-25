# ServeFlow — Multi-Tenant Restaurant Management SaaS Platform

> **India-First, High-Performance, Multi-Tenant SaaS Operating System for Modern Restaurants.**

ServeFlow is a cloud-native, end-to-end restaurant management SaaS platform purpose-built for dining establishments across India and emerging markets. It bridges dining operations, guest QR self-ordering, real-time Kitchen Display Systems (KDS), waiter dispatch, GST-compliant point-of-sale billing, and executive analytics into a unified, multi-tenant software suite.

---

## 🏛️ System Overview

ServeFlow operates on a clean, scalable multi-tenant architecture designed to scale seamlessly across thousands of independent restaurant brands and multi-location outlets:

- **Multi-Tenant Hierarchy**: `Platform -> Tenant (Restaurant Brand) -> Outlet (Branch) -> Station/Table/Staff`.
- **Complete Tenant Isolation**: Database-enforced isolation with PostgreSQL tenant foreign keys and Row-Level Security (RLS) policies.
- **Micro-Frontend / Monorepo Architecture**: Turborepo hosting a unified Next.js 14+ App Router frontend and an event-driven NestJS API backend.
- **Real-Time Communication**: Ultra-low-latency Socket.IO engine backed by Redis Streams for instant order-to-kitchen and waiter dispatching.
- **India-Ready Compliance**: Dual-tier GST calculation engine (CGST/SGST/IGST), FSSAI license compliance, UPI dynamic QR payments, and multilingual support (English, Hindi, Kannada).

---

## 🚀 Key Modules & Interfaces

1. **Super Admin Dashboard**: Global tenant lifecycle management, subscription enforcement, platform telemetry, and manual/automated provisioning.
2. **Restaurant Owner Portal**: Comprehensive brand customization, multi-outlet analytics, menu engineering, staff payroll/roles, and tax setup.
3. **Restaurant Manager Portal**: Daily floor management, table status grid, shift scheduling, live order flow, and inventory overrides.
4. **Kitchen Display System (KDS)**: Real-time, touch-optimized visual queue for chefs and prep stations, featuring item-level ticket aging and station routing.
5. **Waiter Companion Interface**: Mobile-first floor tool for digital order taking, table reassignment, kitchen notes, and bill delivery alerts.
6. **Cashier / POS Terminal**: High-throughput billing interface with split payments, automated GST calculation, discount overrides, and thermal print support.
7. **Customer QR Ordering Interface**: Zero-app-install mobile web experience launched via secure dynamic table QR codes, featuring instant menu exploration and self-ordering.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Monorepo Harness** | Turborepo, pnpm/npm workspaces |
| **Frontend Framework** | Next.js 14+ (App Router), React 18/19, TypeScript |
| **Styling & Components**| Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons |
| **Backend Framework** | NestJS (Express adapter), Node.js v22 |
| **Database & ORM** | PostgreSQL 16+, Prisma ORM |
| **Real-Time & Cache** | Socket.IO, Redis (Pub/Sub & Streams) |
| **Validation & Schema** | Zod (shared schemas across client & server), class-validator |
| **Payments** | Razorpay (UPI, Netbanking, Cards), Dynamic BharatQR |
| **Storage & Observability** | S3-Compatible Object Store (MinIO/R2), Sentry, Winston |

---

## 📚 Engineering Documentation

All engineering specifications and architectural blueprints reside in the [`docs/`](./docs) directory:

- [Product Vision](./docs/PRODUCT_VISION.md)
- [Business Model & Multi-Tenancy](./docs/BUSINESS_MODEL.md)
- [Product Requirements Document (PRD)](./docs/PRD.md)
- [Software Requirements Specification (SRS)](./docs/SRS.md)
- [System Architecture Blueprint](./docs/SYSTEM_ARCHITECTURE.md)
- [Database Schema & Multi-Tenant Model](./docs/DATABASE_SCHEMA.md)
- [REST & WebSocket API Contracts](./docs/API_CONTRACTS.md)
- [End-to-End User Flows](./docs/USER_FLOWS.md)
- [Role-Based Access Control (RBAC) Matrix](./docs/ROLE_PERMISSION_MATRIX.md)
- [Tenant Isolation & RLS Security](./docs/TENANT_ISOLATION.md)
- [UI/UX Design System Guidelines](./docs/UI_UX_GUIDELINES.md)
- [Security Threat Model & Hardening](./docs/SECURITY_THREAT_MODEL.md)
- [Automated Testing Strategy](./docs/TESTING_STRATEGY.md)
- [Deployment, CI/CD & Infrastructure Strategy](./docs/DEPLOYMENT_STRATEGY.md)
- [India Regulatory & Compliance Checklist](./docs/INDIA_COMPLIANCE_CHECKLIST.md)
- [15-Phase Development Roadmap](./docs/DEVELOPMENT_PHASES.md)
- [Architectural Decision Records (ADR / Decision Log)](./docs/DECISION_LOG.md)
- [Project Changelog](./docs/CHANGELOG.md)

---

## 🧩 Phased Implementation System

Implementation is strictly sequenced into 15 self-contained, verifiable phases documented under [`docs/phase-prompts/`](./docs/phase-prompts):

- `PHASE 01`: Project Foundation, Monorepo Setup & Scaffolding
- `PHASE 02`: PostgreSQL Database, Prisma ORM & Tenant Isolation Foundations
- `PHASE 03`: Authentication Engine & Fine-Grained RBAC
- `PHASE 04`: Super Admin SaaS Control Plane
- `PHASE 05`: Restaurant Onboarding Wizard & Outlet Setup
- `PHASE 06`: Staff Accounts, Roles & Station Assignment
- `PHASE 07`: Table Management & Cryptographic QR Engine
- `PHASE 08`: Dynamic Menu Engineering & Catalog Customization
- `PHASE 09`: Customer Mobile QR Self-Ordering Web Experience
- `PHASE 10`: Real-Time Kitchen Display System (KDS) & Order Processing
- `PHASE 11`: Waiter Floor Companion & Service Coordination
- `PHASE 12`: Cashier POS, Split Billing, GST Engine & Payment Processing
- `PHASE 13`: Analytics, Reporting & Business Intelligence Dashboard
- `PHASE 14`: SaaS Subscriptions, Feature Gates & Tenant Customization
- `PHASE 15`: Security Hardening, End-to-End Testing & Production Launch

---

## 🛡️ Workspace Rules & Workflows

Agents and developers working in this workspace must adhere strictly to:
- Permanent Rules: [`.agents/rules/serveflow-core.md`](./.agents/rules/serveflow-core.md)
- Phase Execution Workflow: [`.agents/workflows/complete-phase.md`](./.agents/workflows/complete-phase.md)

---

## 📄 License & Intellectual Property

Proprietary Software. Copyright © 2026 ServeFlow Technologies Pvt. Ltd. All rights reserved.
