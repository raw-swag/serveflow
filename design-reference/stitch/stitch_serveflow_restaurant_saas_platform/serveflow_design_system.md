---
name: "ServeFlow Design System"
description: "Commercial multi-tenant restaurant operations SaaS design system with a deep slate-navy foundation, emerald-teal operational accents, crisp light business surfaces, and a high-contrast dark mode for Kitchen Display Systems."
---

## Overview

ServeFlow ("Run your restaurant. Your way.") is a multi-tenant Restaurant Operations & Ordering SaaS platform built for independent restaurants, cafés, and multi-outlet hospitality groups across India and international markets.

The interface follows a **Corporate / Modern** aesthetic: restrained, high-density without clutter, and engineered for multi-hour daily operational use. Light mode is the primary polarity for owner dashboards, manager portals, POS billing, waiter tablets, and customer QR ordering. A dedicated high-contrast dark mode is reserved for the Kitchen Display System (KDS) so kitchen staff can read order tickets and timers from across a busy pass.

**Do's and Don'ts**
- **Do** use crisp 1px `outline-variant` borders and subtle tonal surface stepping (`surface` -> `surface-container-low` -> `surface-container-lowest`) for structural clarity.
- **Do** pair `tabular-nums` and `font-mono` for INR (`₹`) currency values, GST breakdowns, order numbers, and KDS timers.
- **Do** use semantic status colors (`success`, `warning`, `error`, `info`) strictly for operational state (order status, table availability, payment state, delayed KDS alerts).
- **Don't** use glassmorphism (`backdrop-blur`), neon glows, excessive gradients, or decorative `border-l-4` stripes on cards.
- **Don't** use oversized display headings inside operational dashboards; keep hierarchy tight and scannable.

## Colors

ServeFlow pairs a deep slate-navy primary (`#001428` / `#0F2942`) for authority and navigation anchors with an emerald-teal secondary (`#006C53`) for primary operational actions, live status, and confirmations. Neutral surfaces stay cool and crisp in light mode (`#F9F9FF` canvas, `#FFFFFF` cards) and deep slate in dark mode (`#081425` canvas, `#111C2D` cards) to prevent halation in kitchen environments.

- **Primary:** Deep slate-navy for primary actions, active navigation, and brand anchors.
- **Secondary:** Emerald-teal for live operational CTAs, active kitchen/table indicators, and positive confirmations.
- **Status Tokens:** Dedicated `success`, `warning`, `error`, and `info` pairs with high-contrast `on-*` foregrounds and soft `*-container` tints.
- **Tenant Sample Brands:** `brand-tamarind` (`#9A3412` warm terracotta) for *Tamarind & Co.* family restaurant and `brand-roast` (`#3F6212` botanical olive) for *Roast & Bloom* specialty café.

```yaml
colors:
  success: "#15803D"
  on-success: "#FFFFFF"
  success-container: "#DCFCE7"
  on-success-container: "#14532D"
  warning: "#B45309"
  on-warning: "#FFFFFF"
  warning-container: "#FEF3C7"
  on-warning-container: "#78350F"
  info: "#0369A1"
  on-info: "#FFFFFF"
  info-container: "#E0F2FE"
  on-info-container: "#0C4A6E"
  brand-tamarind: "#9A3412"
  on-brand-tamarind: "#FFFFFF"
  brand-tamarind-container: "#FFEDD5"
  on-brand-tamarind-container: "#7C2D12"
  brand-roast: "#3F6212"
  on-brand-roast: "#FFFFFF"
  brand-roast-container: "#ECFCCB"
  on-brand-roast-container: "#365314"
  light:
    primary: "#001428"
    on-primary: "#FFFFFF"
    primary-container: "#0F2942"
    on-primary-container: "#D1E4FF"
    secondary: "#006C53"
    on-secondary: "#FFFFFF"
    secondary-container: "#95F1D0"
    on-secondary-container: "#00382A"
    tertiary: "#795830"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#FFEEDF"
    on-tertiary-container: "#2B1700"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#F9F9FF"
    on-background: "#111C2D"
    surface: "#F9F9FF"
    surface-dim: "#CFDAF2"
    surface-bright: "#FFFFFF"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#F0F3FF"
    surface-container: "#E7EEFF"
    surface-container-high: "#DEE8FF"
    surface-container-highest: "#D8E3FB"
    on-surface: "#111C2D"
    surface-variant: "#E0E2EA"
    on-surface-variant: "#43474D"
    outline: "#74777E"
    outline-variant: "#C3C6CE"
    inverse-surface: "#263143"
    inverse-on-surface: "#ECF1FF"
    inverse-primary: "#B0C9E8"
  dark:
    primary: "#B0C9E8"
    on-primary: "#19324B"
    primary-container: "#0F2942"
    on-primary-container: "#D1E4FF"
    secondary: "#7CD8B8"
    on-secondary: "#00382A"
    secondary-container: "#00513E"
    on-secondary-container: "#9AF6D5"
    tertiary: "#EBBF8E"
    on-tertiary: "#452B07"
    tertiary-container: "#3B2201"
    on-tertiary-container: "#FFDDB9"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#081425"
    on-background: "#D8E3FB"
    surface: "#081425"
    surface-dim: "#040E1F"
    surface-bright: "#2F3A4C"
    surface-container-lowest: "#040E1F"
    surface-container-low: "#111C2D"
    surface-container: "#152031"
    surface-container-high: "#1F2A3C"
    surface-container-highest: "#2A3548"
    on-surface: "#D8E3FB"
    surface-variant: "#43474D"
    on-surface-variant: "#C3C6CE"
    outline: "#8D9198"
    outline-variant: "#43474D"
    inverse-surface: "#D8E3FB"
    inverse-on-surface: "#263143"
    inverse-primary: "#49607C"
```

## Typography

ServeFlow uses **Red Hat Text** for geometric clarity in headings and KPIs, **Instrument Sans** for dense operational tables, forms, and mobile menus, and **Spline Sans Mono** for order IDs, INR currency amounts, GST rates, and KDS countdown timers.

```yaml
typography:
  display-lg:
    fontFamily: "Red Hat Text"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 42px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Red Hat Text"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 34px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Red Hat Text"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 30px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: "Red Hat Text"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: -0.15px
  title-lg:
    fontFamily: "Red Hat Text"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  title-md:
    fontFamily: "Instrument Sans"
    fontSize: 15px
    fontWeight: 600
    lineHeight: 22px
    letterSpacing: 0px
  body-lg:
    fontFamily: "Instrument Sans"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  body-md:
    fontFamily: "Instrument Sans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Instrument Sans"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0.1px
  label-lg:
    fontFamily: "Instrument Sans"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
    letterSpacing: 0.1px
  label-md:
    fontFamily: "Instrument Sans"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 16px
    letterSpacing: 0.2px
  label-sm:
    fontFamily: "Instrument Sans"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.25px
  mono-md:
    fontFamily: "Spline Sans Mono"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: 0px
```

## Layout & Spacing

ServeFlow uses a **12-column Fluid Grid** on desktop (`1280px`–`1440px`) with a persistent `240px` left navigation rail for Owner, Super Admin, and Manager portals, a split-pane `7:5` workstation layout for Cashier POS, a full-bleed `4-column` ticket board for KDS, and a `390px` single-column touch-first layout for Waiter and Customer QR Ordering. All spacing follows a strict `4px` base unit (`8px` primary rhythm).

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 40px
  page-margin: 24px
```

## Elevation & Depth

Hierarchy relies on **tonal surface layering** and **crisp 1px `outline-variant` borders** rather than heavy drop shadows. Cards sit on `light-surface-container-lowest` (`#FFFFFF`) over a `light-surface` (`#F9F9FF`) canvas with `1px` borders. Modals and popovers use subtle ambient elevation. In dark KDS mode, cards step from `dark-surface` (`#081425`) to `dark-surface-container-low` (`#111C2D`) and `dark-surface-container` (`#152031`) with `dark-outline-variant` borders.

## Shapes

ServeFlow uses restrained, functional corner radii: `4px` (`sm`) for dense table badges and KDS tags, `8px` (`DEFAULT`) for buttons, inputs, and table rows, `12px` (`md`) for operational cards and POS tiles, and `16px` (`lg`) for modals and customer menu hero cards.

```yaml
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px
```

## Motion & Micro-interaction

Motion is crisp and functional—no decorative loops or layout-shifting animations. Interactive state changes (button presses, tab switches, toggle flips) complete in `120ms`. Drawers, modals, and customer cart sheets decelerate smoothly in `220ms`.

```yaml
motion:
  state-change:
    duration: 120ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 220ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-exit:
    duration: 150ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

- **Tone of voice:** Direct, operational, and calm. Clear action verbs ("Send to Kitchen", "Collect ₹1,480", "Pause Item") rather than vague labels ("Submit", "OK").
- **Capitalisation:** Sentence case for table headers, helper text, and navigation items; title case only for proper restaurant/outlet names and modal titles.
- **Currency & Tax:** Always format Indian Rupees as `₹1,240` or `₹1,240.50` using `tabular-nums`, and label configurable tax lines explicitly (e.g., `CGST 2.5%`, `SGST 2.5%`, or `GST 5%`).
- **Empty & Error States:** State what is missing and offer one clear recovery action (e.g., "No active orders in Tandoor station — switch to All Stations").

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html` — `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html` — `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html` — `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Input Field** → `@components/input-field.html` — `input-field-text`, `input-field-icon`
- **Table** → `@components/table.html` — `table-standard`, `table-interactive`, `table-selectable`
- **Tabs** → `@components/tabs.html` — `tabs-horizontal`, `tabs-with-icon`
