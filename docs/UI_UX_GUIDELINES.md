# ServeFlow — UI/UX Design System Guidelines

## 1. Design Philosophy: Commercial Enterprise SaaS

ServeFlow's visual and interactive experience is engineered for high-throughput restaurant environments. It avoids decorative AI gradients, neon colors, and distracting micro-animations, focusing instead on:

- **High Contrast & Information Density**: Legible in dimly lit dining rooms or glaring sunlit outdoor patios.
- **Speed & Ergonomics**: Low-friction touch targets (minimum 44x44px for tablet/mobile) and dense, keyboard-accessible data tables for desktop POS.
- **Clean Neutral Color Palette**: Sophisticated slate and zinc neutrals paired with purposeful semantic status accents.

---

## 2. Color System & Semantic Tokens

```css
:root {
  /* Surface & Base */
  --background: 0 0% 100%;       /* Pure white #ffffff */
  --foreground: 240 10% 3.9%;     /* Deep slate #09090b */
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  
  /* Brand Accent (Customizable by Tenant) */
  --primary: 221.2 83.2% 53.3%;  /* Precision Blue #2563eb */
  --primary-foreground: 210 40% 98%;

  /* Operational Status Accents */
  --status-vacant: 142.1 76.2% 36.3%;     /* Emerald #16a34a */
  --status-occupied: 38 92% 50%;          /* Amber #f59e0b */
  --status-in-kitchen: 24.6 95% 53.1%;    /* Orange #f97316 */
  --status-served: 217.2 91.2% 59.8%;     /* Blue #3b82f6 */
  --status-billed: 280 67% 55%;           /* Violet #8b5cf6 */
  --destructive: 0 84.2% 60.2%;           /* Crimson #ef4444 */

  /* Indian Dietary Indicators */
  --diet-veg: 142.1 76.2% 36.3%;          /* Green square with circle */
  --diet-nonveg: 0 84.2% 60.2%;           /* Brown/Red square with triangle */
  --diet-egg: 38 92% 50%;                 /* Yellow square with circle */
}
```

---

## 3. Typography & Hierarchy

- **Primary Font**: `Inter`, `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Monospace Font (POS & Bill Numbers)**: `JetBrains Mono`, `ui-monospace, monospace`.
- **Indic Script Support**: High-readability fallback font stacks for Hindi (`Noto Sans Devanagari`) and Kannada (`Noto Sans Kannada`).

---

## 4. Interface Specific Guidelines

### 4.1 Kitchen Display System (KDS)
- High-contrast Dark Mode by default to minimize kitchen eye strain.
- Large, bold ticket numbers visible from 3–5 meters away.
- Ticket header changes color based on ticket age (Green: <10m, Amber: 10–20m, Red flashing: >20m).
- Visual modifier pills (e.g., `NO ONION`, `EXTRA SPICY`) highlighted in high-contrast badges.

### 4.2 Cashier POS Terminal
- 100% operable via keyboard shortcuts for lightning-fast billing during rush hours.
- Split-screen layout: Searchable item grid on the left (60% width), real-time bill tape on the right (40% width).
- Instant total display with integrated GST breakdown (CGST + SGST).

### 4.3 Customer Mobile QR Experience
- Bottom-docked sticky cart bar with item count and subtotal.
- Prominent veg/non-veg filter toggle fixed at the top of the menu catalog.
- High-speed image lazy loading with blur-up placeholders.
