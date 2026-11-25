# ServeFlow — Software Requirements Specification (SRS)

## 1. Introduction & Architecture Scope

This Software Requirements Specification (SRS) details the complete technical requirements for ServeFlow. ServeFlow is architected as a monorepo containing a modern Next.js App Router client application and a scalable NestJS backend API connected to PostgreSQL via Prisma ORM.

---

## 2. External Interface Requirements

### 2.1 User Interfaces
- **Customer Web Client**: Responsive mobile-first interface optimized for viewports from 360px to 430px.
- **KDS Tablet Interface**: Touch-optimized interface optimized for landscape 10" to 15" displays (1920x1080 / 1280x800).
- **POS Cashier Interface**: Dense, desktop-first interface with full keyboard shortcuts (F1-F12, Enter, Esc).
- **Admin & Manager Dashboards**: Responsive desktop/tablet control panel with data tables, charts, and modal wizards.

### 2.2 Hardware Interfaces
- **Thermal Receipt Printers**: Support for ESC/POS network and USB thermal printers (80mm and 58mm formats).
- **Table QR Plaques**: High-resolution vector PDF generation supporting standard acrylic tent cards and table stickers.

### 2.3 Software & Network Interfaces
- **PostgreSQL 16+**: Primary relational datastore.
- **Redis 7+**: In-memory caching and Socket.IO Redis adapter for real-time pub/sub scaling.
- **S3 / MinIO**: Object storage for restaurant logos, menu images, and generated QR graphics.
- **Razorpay API**: Payment gateway integration supporting UPI dynamic intent, payment links, and webhook callbacks.
- **WhatsApp Cloud API**: Dispatching digital PDF bills and real-time order updates to customers.

---

## 3. System Features & Technical Specifications

### 3.1 Authentication & Authorization
- **JWT Authentication**: Short-lived Access Tokens (15m–60m) and long-lived refresh tokens (7d) stored in HTTP-only, SameSite Secure cookies.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions evaluating `{resource}:{action}` pairs (e.g., `menu:create`, `bill:discount_override`).
- **Cryptographic Table Tokens**: HMAC-SHA256 signed tokens encoding `tenantId`, `outletId`, `tableId`, and `tokenVersion`.

### 3.2 Real-Time Event Engine
- Real-time updates delivered over WebSocket connections (Socket.IO).
- Rooms partitioned by `tenant_{tenantId}_outlet_{outletId}` and granular sub-rooms:
  - `kitchen_{stationId}`: Item-specific ticket updates.
  - `pos_{outletId}`: Real-time bill settlement and order placement events.
  - `table_{tableId}`: Live customer order progress updates.

### 3.3 Multi-Tenant Database Transactions
- All state-altering operations (order submission, bill generation, payment capture, inventory deduction) executed within atomic PostgreSQL transactions (`prisma.$transaction`).
- Optimistic locking using version columns on critical records (e.g., Orders, Bills, Table Sessions) to prevent race conditions during concurrent modifications.

---

## 4. Reliability & Disaster Recovery

- **Database Backup**: Automated daily snapshot backups with point-in-time recovery (PITR) retention for 30 days.
- **Circuit Breaker**: Resilient fallbacks for external services (SMS, WhatsApp, Razorpay) to prevent cascade failures.
- **Graceful Degradation**: If WebSocket connectivity drops, frontend clients automatically fall back to exponential-backoff HTTP polling.
