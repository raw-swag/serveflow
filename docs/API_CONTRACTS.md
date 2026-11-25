# ServeFlow — API Contracts & WebSocket Specifications

## 1. REST API Design Standards

- **Base URL**: `/api/v1`
- **Authentication**: Bearer JWT in `Authorization` header (`Authorization: Bearer <token>`) or HttpOnly cookie for web sessions.
- **Envelope Response Format**:
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Operation completed successfully",
    "data": {},
    "meta": {
      "timestamp": "2026-11-25T19:00:00.000Z",
      "requestId": "req_abc123"
    }
  }
  ```
- **Error Response Format**:
  ```json
  {
    "success": false,
    "statusCode": 400,
    "error": "BAD_REQUEST",
    "message": "Validation failed",
    "details": [
      {
        "field": "tableNumber",
        "message": "Table number already exists in this outlet"
      }
    ],
    "meta": {
      "timestamp": "2026-11-25T19:00:00.000Z",
      "requestId": "req_abc123"
    }
  }
  ```

---

## 2. Core REST Endpoints

### 2.1 Authentication & Profile (`/auth`)
- `POST /api/v1/auth/login`: Authenticate staff or admin user, returns JWT and user profile.
- `POST /api/v1/auth/refresh`: Refresh expired access token using valid refresh cookie.
- `POST /api/v1/auth/logout`: Invalidate refresh token and clear cookies.
- `GET /api/v1/auth/me`: Fetch current authenticated identity, tenant, outlet, and permissions.

### 2.2 Super Admin Management (`/super-admin`)
- `GET /api/v1/super-admin/tenants`: Paginated list of all platform tenants.
- `POST /api/v1/super-admin/tenants`: Provision new restaurant tenant.
- `PATCH /api/v1/super-admin/tenants/:id/status`: Suspend or reactivate tenant.
- `GET /api/v1/super-admin/metrics`: Platform-wide telemetry (active tenants, total orders, MRR).

### 2.3 Outlet Configuration & Tables (`/outlets`)
- `GET /api/v1/outlets/:id`: Retrieve outlet profile and tax configuration.
- `PATCH /api/v1/outlets/:id`: Update outlet details (GSTIN, FSSAI, brand assets).
- `GET /api/v1/outlets/:id/tables`: List all tables with live status and QR metadata.
- `POST /api/v1/outlets/:id/tables`: Create dining table and generate signed QR code.
- `POST /api/v1/outlets/:id/tables/:tableId/revoke-qr`: Revoke compromised QR token and generate fresh token.

### 2.4 Menu Engineering (`/menu`)
- `GET /api/v1/outlets/:outletId/menu`: Complete menu catalog (categories, items, variants, modifiers).
- `POST /api/v1/outlets/:outletId/categories`: Create category.
- `POST /api/v1/outlets/:outletId/items`: Create menu item with variants and station routing.
- `PATCH /api/v1/outlets/:outletId/items/:itemId/availability`: Instant 86/available toggle.

### 2.5 Customer QR Experience (`/public/qr`)
- `GET /api/v1/public/qr/resolve?token=:qrToken`: Cryptographically verify QR token; returns restaurant brand, table number, and active session.
- `POST /api/v1/public/qr/orders`: Submit customer digital order for the active table session.
- `GET /api/v1/public/qr/session/:sessionId/status`: Poll or retrieve active order items, preparation status, and current bill.
- `POST /api/v1/public/qr/call-waiter`: Trigger waiter service alert for the table.

### 2.6 Orders & Kitchen Display (`/orders`, `/kds`)
- `GET /api/v1/outlets/:outletId/kds/tickets`: Active kitchen tickets filtered by station.
- `PATCH /api/v1/outlets/:outletId/kds/items/:orderItemId/status`: Update item state (`PREPARING`, `READY`, `SERVED`).
- `POST /api/v1/outlets/:outletId/orders`: Staff-initiated order entry (Waiter / POS).

### 2.7 Billing & Payments (`/billing`, `/payments`)
- `POST /api/v1/outlets/:outletId/sessions/:sessionId/generate-bill`: Calculate subtotal, apply taxes, and generate final bill.
- `POST /api/v1/outlets/:outletId/bills/:billId/settle`: Settle bill (Cash / Card / Verified UPI).
- `POST /api/v1/payments/razorpay/create-order`: Generate Razorpay payment order for customer or POS.
- `POST /api/v1/payments/razorpay/webhook`: Verify cryptographic HMAC signature and capture payment asynchronously.

---

## 3. Real-Time WebSocket Events (Socket.IO)

### Room Hierarchy:
- `tenant:{tenantId}:outlet:{outletId}`: General outlet announcements.
- `outlet:{outletId}:kds:{stationId}`: Station-specific kitchen tickets.
- `outlet:{outletId}:pos`: POS billing updates and settlement events.
- `session:{sessionId}`: Live order status for a specific dining table session.

### Core Events:
| Event Name | Direction | Payload | Description |
| :--- | :--- | :--- | :--- |
| `order:created` | Server -> KDS/POS | `{ orderId, tableNumber, items, stationId }` | Dispatched when a new order is submitted. |
| `item:status_updated` | Server -> Waiter/Client | `{ orderItemId, status, tableNumber }` | Dispatched when chef updates prep status. |
| `waiter:called` | Server -> Waiter | `{ tableNumber, areaName, timestamp }` | Dispatched when customer presses call button. |
| `bill:requested` | Server -> Cashier/Waiter | `{ tableNumber, sessionId, amount }` | Dispatched when guest requests bill. |
| `bill:settled` | Server -> All | `{ billId, tableNumber, status: "PAID" }` | Dispatched upon verified payment capture. |
