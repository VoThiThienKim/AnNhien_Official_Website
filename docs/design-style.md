# An Nhien Design Style

## Direction

**Modern Plant Bistro** is the default visual direction for the beta. The interface should feel fresh, clean, bright, plant-based, and modern, while preserving a quiet sense of mindfulness through spacing, lotus/leaf identity cues, and calm interaction rhythm.

The product is not a temple-themed site and should not become overly dark, antique, or religious. It is a modern vegan ordering experience for people who want clean food, warm service, and a peaceful break in their day.

## Research Anchors

- Shamballa: serene escape, mindful dining tone.
- Kasaya: Vietnamese warmth, natural materials, cultural restraint.
- Vo Uy: wood, soft light, greenery, calm dining corners.
- Veggie Saigon: practical ordering paths and simple navigation.
- Imperfect Fresh Eats: fresh urban biophilic energy.
- Biophilic restaurant references: natural light, honest materials, real greenery, sensory calm.

## Brand Keywords

`fresh`, `clean`, `mindful`, `plant-based`, `warm`, `Vietnamese`

## Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `background` | `#FAF8F1` | Main page background, warm ivory surfaces |
| `primary` | `#2F6B4F` | Main actions, active nav, brand leaf |
| `accent` | `#8BC34A` | Fresh highlights, success, small emphasis |
| `mint` | `#EAF4E8` | Soft panels, selected states, gentle bands |
| `wood` | `#B9824B` | Warm separators, badges, natural detail |
| `charcoal` | `#2F312D` | Primary text |
| `muted` | `#6E7469` | Secondary text |
| `line` | `#DDE4D6` | Borders and dividers |
| `white` | `#FFFFFF` | Cards, form controls, admin surfaces |
| `danger` | `#B42318` | Errors, destructive actions |

Do not let the UI become one-note green. Use ivory, white, warm wood, food photography, and charcoal text to create balance.

## Typography

- Primary UI font: modern sans-serif, system stack first.
- Display serif may be used only for hero or brand headlines, never for dense admin UI.
- Letter spacing should stay normal.
- Do not scale font sizes with viewport width.
- Admin screens use compact headings and dense but breathable tables.

## Layout

- Mobile-first: check 375px, 768px, and 1280px.
- Navigation should be simple and action-focused: Menu, Booking, Orders, Admin.
- Customer pages can use soft full-width bands; admin pages should be utilitarian.
- Cards are for repeated items, forms, and operational panels only.
- Card radius max: `8px`.
- Avoid cards inside cards.
- Keep CTAs obvious: "Đặt món", "Thanh toán", "Đặt bàn", "Xác nhận đơn".
- Use stable dimensions for menu cards, cart rows, status chips, toolbars, and admin order rows so content does not shift.

## Background FX

- Use full-page ambient texture, not decorative blobs: rice-paper grain, faint botanical vein lines, and slow diagonal daylight sweeps.
- FX should sit behind content and never compete with food photography.
- Prefer glass/ivory panels over flat white card grids on customer-facing pages.
- Keep motion slow and graceful; always support `prefers-reduced-motion`.
- Do not use discrete gradient orbs, bokeh dots, neon gradients, or generic AI-looking abstract backgrounds.

## Imagery

Use:

- Real or realistic food photography.
- Bright vegetables, fresh herbs, rice/noodle dishes, soups, clean plating.
- Natural daylight, warm wood tables, green plants.
- The provided An Nhien logo/hero image as an initial brand asset.

Avoid:

- Dark, blurred, or overly atmospheric food shots.
- Generic spa stones, candles, incense-only visuals.
- Heavy Buddhist iconography.
- Stock photos where food is hard to inspect.
- Decorative gradient orbs, bokeh blobs, or abstract SVG hero art.

## Component Tone

- Buttons: compact, clear, icon + label when useful; lucide icons preferred.
- Forms: large enough on mobile, direct labels, friendly Vietnamese validation.
- Menu item cards: food-first, price visible, stock state obvious.
- Cart/checkout: calm but transactional; avoid hiding totals.
- Staff dashboard: fast scanning, sound/print states visible, no decorative flourishes.
- Admin: operational, table-first, filtered lists, restrained colors.

## Tailwind Token Mapping

```ts
colors: {
  background: "#FAF8F1",
  primary: "#2F6B4F",
  accent: "#8BC34A",
  mint: "#EAF4E8",
  wood: "#B9824B",
  charcoal: "#2F312D",
  muted: "#6E7469",
  line: "#DDE4D6",
  danger: "#B42318"
}
borderRadius: {
  sm: "4px",
  md: "6px",
  lg: "8px"
}
```

## Do

- Lead with clear food and ordering value.
- Keep pages bright, breathable, and useful.
- Use green as a brand anchor, not a wall of color.
- Keep customer UI warm and fresh.
- Keep admin UI faster and denser.
- Make every major flow reachable within one or two taps from navigation.

## Don't

- Do not create a marketing-only landing page instead of a usable ordering app.
- Do not overuse beige, dark green, or brown.
- Do not rely on purely decorative spiritual symbols.
- Do not hide the ordering CTA below long brand storytelling.
- Do not use oversized hero typography inside cards or dashboards.
- Do not let text overflow buttons, chips, cards, tables, or mobile nav.
