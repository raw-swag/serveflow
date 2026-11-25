# ServeFlow — India Regulatory & Compliance Checklist

## 1. Goods and Services Tax (GST) Architecture

> [!IMPORTANT]
> The GST rules below represent standard commercial configurations for Indian restaurants. Tax settings must remain fully configurable per outlet by the restaurant owner or accountant.

### GST Rate Configurations
- **Standard Dine-In Restaurant (Standalone / Non-AC / AC)**:
  - 5% GST without Input Tax Credit (ITC).
  - Split: **2.5% CGST** (Central GST) + **2.5% SGST** (State GST) for intra-state transactions.
  - Or **5% IGST** for inter-state billing.
- **Restaurants at Specified Premises (Declared Room Tariff > ₹7,500/day)**:
  - 18% GST with Input Tax Credit (ITC) (9% CGST + 9% SGST).
- **Outdoor Catering & Banqueting**:
  - Configurable 18% GST.
- **Alcoholic Liquor for Human Consumption**:
  - Exempt from GST; subject to State Excise Duty and State VAT (tax-on-tax rules must be configurable per state).

### Mandatory GST Invoice Requirements (Section 31 CGST Act)
- Restaurant Trade Name, Legal Entity Name, and Registered Address.
- Outlet GSTIN (15-digit alphanumeric identifier).
- Unique, consecutive invoice serial number for the financial year.
- Date and time of invoice generation.
- Itemized description, quantity, unit price, and HSN/SAC code (SAC 9963 for restaurant service).
- Itemized breakdown of CGST, SGST, IGST, and any applicable cess.
- Total invoice value in figures and words.

---

## 2. FSSAI Compliance (Food Safety and Standards Authority of India)

- Display of valid 14-digit **FSSAI License or Registration Number** on:
  1. The footer of all customer-facing digital QR menus.
  2. All printed POS receipts and digital WhatsApp invoices.
- Display of food safety hygiene ratings and allergen information (Gluten, Dairy, Nuts, Soy) where applicable.

---

## 3. Digital Payments & RBI UPI Compliance

- Direct integration with RBI-authorized payment aggregators (Razorpay / Cashfree / PayU).
- Support for Dynamic BharatQR / UPI Intent allowing one-tap payments via PhonePe, Google Pay, Paytm, and CRED.
- Real-time webhook reconciliation with cryptographic signature verification (`X-Razorpay-Signature`).

---

## 4. Multi-Language (Indic) Localization

- Native support for:
  - **English** (Default administrative and customer language).
  - **Hindi (हिंदी)** (Floor companion, KDS, and customer QR menu).
  - **Kannada (ಕನ್ನಡ)** (Floor companion, KDS, and customer QR menu).
- Dynamic locale switching stored in user/guest session state.
