# ServeFlow — Security Threat Model & STRIDE Analysis

## 1. Security Architecture Principles

ServeFlow adheres to the **Zero-Trust Enterprise Architecture** model:
- **Explicit Verification**: Every incoming API call and WebSocket frame is authenticated and authorized.
- **Least Privilege**: Staff roles are scoped to the minimum required operational permissions.
- **Defense in Depth**: Isolation is enforced at the network proxy, application middleware, ORM layer, and database RLS.

---

## 2. STRIDE Threat Model & Mitigations

| Threat Category | Potential Attack Vector | ServeFlow Security Mitigation |
| :--- | :--- | :--- |
| **Spoofing** | Attacker impersonates a waiter or manager to place fake orders or void bills. | Short-lived JWTs (15 min), cryptographically signed refresh cookies, bcrypt/Argon2 password hashing, individual staff accounts with audit logging. |
| **Tampering** | Customer modifies price or tax amount in the HTTP request payload before checkout. | Zero trust of client payloads. All prices, tax percentages, discounts, and totals are computed strictly server-side from PostgreSQL catalog records. |
| **Repudiation** | Cashier deletes an order and pockets the cash payment without record. | Immutable `audit_logs` table recording all voids, cancellations, discounts, and payment settlements with user ID, timestamp, and IP address. |
| **Information Disclosure** | Multi-tenant leak where Restaurant A views sales or customer phone numbers of Restaurant B. | PostgreSQL Row-Level Security (RLS) + Prisma query context injection. Mandatory `tenant_id` and `outlet_id` predicates on all database transactions. |
| **Denial of Service** | Malicious bot spams table QR ordering endpoint with thousands of fake orders. | Dynamic table QR token rotation, rate-limiting per IP and per table session, Redis token validation, and CAPTCHA challenge on rapid re-orders. |
| **Elevation of Privilege** | Waiter sends a request to `/super-admin/tenants` or updates discount rules. | Strict RBAC guards (`@Roles(...)`, `@Permissions(...)`) evaluated on every NestJS controller endpoint. |

---

## 3. Cryptographic Standards

- **Passwords**: Argon2id or bcrypt (salt rounds = 12).
- **Session Tokens & JWTs**: RS256 or HS256 with >= 256-bit entropy keys.
- **QR Signatures**: HMAC-SHA256 with per-tenant salt.
- **Webhook Validation**: Constant-time comparison (`crypto.timingSafeEqual`) of Razorpay webhook signatures (`X-Razorpay-Signature`).
