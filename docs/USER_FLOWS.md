# ServeFlow — End-to-End User Flows

```mermaid
sequenceDiagram
    autonumber
    actor Customer as Guest / Diner
    participant QR as Table Dynamic QR
    participant WebApp as Guest Mobile Web Client
    participant Server as NestJS API & Sockets
    participant KDS as Kitchen Display System
    participant Waiter as Waiter Floor App
    participant Cashier as Cashier POS Terminal
    participant Razorpay as Payment Gateway

    Customer->>QR: Scans QR on Table #05
    QR->>WebApp: Opens ServeFlow Guest Experience
    WebApp->>Server: GET /public/qr/resolve?token=xyz
    Server-->>WebApp: Returns Restaurant Branding, Menu & Table Session
    Customer->>WebApp: Selects items, variants & dietary preferences
    Customer->>WebApp: Clicks "Place Order"
    WebApp->>Server: POST /public/qr/orders (Payload + Token)
    Server->>Server: Validates Session & Deduplicates
    Server-->>WebApp: Order Confirmed (Order #101)
    Server-)KDS: Emit "order:created" to Stations (Grill, Bar)
    Server-)Waiter: Emit "order:placed" notification
    KDS->>Server: Chef taps "Preparing" -> "Ready"
    Server-)Waiter: Emit "item:ready" (Table #05 ready to serve)
    Waiter->>Customer: Serves food at Table #05
    Customer->>WebApp: Taps "Request Bill & Pay"
    WebApp->>Server: POST /billing/create-payment-order
    Server->>Razorpay: Creates UPI Dynamic Intent
    Razorpay-->>WebApp: Returns UPI QR / Payment Intent
    Customer->>Razorpay: Completes UPI payment via PhonePe/GPay
    Razorpay-)Server: Webhook payment.captured (HMAC verified)
    Server->>Server: Updates Bill & Session to "SETTLED"
    Server-)Cashier: Emit "bill:settled" & Prints GST Invoice
    Server-)WebApp: Shows payment receipt & feedback screen
```

---

## 2. Key Operational Flows

### Flow 1: Table Onboarding & Dynamic QR Rotation
1. Restaurant Manager logs into Dashboard -> Tables & Sections.
2. Creates Table "T-12" (Capacity: 4, Section: "Terrace").
3. System generates a cryptographically signed QR token (`tenantId.outletId.tableId.hmac`).
4. Manager downloads the vector PDF or sends it to the label printer.
5. If the QR code is copied or vandalized, Manager clicks "Revoke & Regenerate QR". The old token is instantly blacklisted in Redis and DB, and a new QR code is activated.

### Flow 2: Split Billing & Settlement Flow
1. Cashier opens Table Session #402 with 4 dining guests.
2. Guests request a split: 2 guests paying cash, 2 guests paying UPI.
3. Cashier selects "Split Bill" -> "By Custom Amount" or "By Selected Items".
4. Cashier records Cash settlement for Part 1 (Receipt printed).
5. Cashier displays Dynamic BharatQR on customer-facing display for Part 2.
6. Customer scans with GPay; webhook confirms capture; POS prints settled tax invoice.
