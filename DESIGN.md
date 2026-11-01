# ITHINK design system

The site is light by default with a dark toggle, and the toggle changes every surface. Every page opens on a "scene" hero and closes on a scene call-to-action band and footer: pale blue with brand glows in light, deep navy in dark. The body between them is white (light) or near-black (dark).

## Tokens (`app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `background` | #ffffff | #060914 | page body |
| `secondary` | #f4f6fb | #0a0f1d | `Section tone="muted"` |
| `card` | #ffffff | #0d1222 | cards, form panel |
| `foreground` | #0a1024 | #edf1f8 | text |
| `muted-foreground` | #4a5568 | #9aa5ba | secondary text |
| `border` | #e4e8f1 | #1b2236 | hairlines |
| `brand-text` | #1d5fd6 | #8bb4ff | brand-coloured text (4.5:1) |
| `ink` | #f3f6fd | #050a1c | scene: hero, stats band, CTA band, footer |
| `ink-foreground` | #0a1024 | #ffffff | text on the scene (`text-ink-foreground`, `border-ink-foreground/10`, `bg-ink-foreground/5`) |
| `ink-muted` | #4a5568 | #a8b4cf | secondary text on the scene |
| `ink-accent` | #1d5fd6 | #9cc0ff | accent words and icons on the scene |
| `ink-line` | rgba(15,35,95,.1) | rgba(148,170,255,.14) | borders on the scene |

Brand blue #377dff is decoration only: glows, borders, beams, icon tints (`bg-brand/10`). Filled buttons use #2563eb (white text 5.2:1). Accent yellow #f9b934 appears as dots and beam gradients, never as a fill behind text. On the scene, accents use `text-ink-accent`. `text-white` appears only on a solid #2563eb or brand fill.

Font: Inter only (`--font-inter`, latin + cyrillic). Headings `font-semibold` with negative tracking (`tracking-tight` to `-0.035em`); h1 60 to 72 px desktop, 40 px mobile; h2 48 px desktop, 30 px mobile.

Radii: cards and panels `rounded-3xl`, controls and small tiles `rounded-xl`, chips `rounded-full`.

## Page skeleton

```tsx
<PageHero eyebrow title subtitle crumbs actions aside />   // components/site/page-hero.tsx, ink
<Section>…</Section>                                       // components/site/section.tsx
<Section tone="muted">…</Section>
<Section tone="ink">…</Section>                            // at most one band between hero and CTA
<CtaSection locale pageTag service? title? subtitle? />    // components/site/cta-section.tsx, ink + lead form
```

- Section heading: `SectionHeading` (eyebrow with a 24 px rule, h2, lead). Left-aligned by default; `align="center"` for bands.
- Hero eyebrow is a kicker: a 24 px rule plus uppercase `tracking-[0.16em] text-ink-accent`. The homepage kicker opens with Tashkent's coordinates `41.31° N · 69.24° E`. No pill eyebrows anywhere.
- Breadcrumbs are one slash-separated line at 13 px. The current page is `text-ink-foreground` with a 2 px brand underline.
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8`. Section padding `py-20 sm:py-28`.
- Sections alternate `default` and `muted`. Never set `data-lg-theme` on a section: glass follows the `<html>` theme, so it is light glass on the light scene and dark glass on the navy one.
- Logos with dark text (ITHINK, partners) swap per theme: `logo.png` with `dark:hidden`, `logo-negative.png` with `hidden dark:block`. Partner marks render through `PartnerMark` on a white tile.

## Components

| Need | Use | Source |
|---|---|---|
| Primary / secondary action | `Cta` (`prominent` / `soft` on ink / `ghost` on light), `CtaRow` | `components/site/cta.tsx`, GlassyUI `glass-button` |
| Floating UI cards in heroes | `GlassPanel` | GlassyUI |
| Feature cards | `FeatureGrid` (index numeral `01`, small icon in the corner) | `components/site/feature-grid.tsx` |
| Link cards (related pages, other services) | `IndexCard` | `components/site/index-card.tsx` |
| Service overview | `BentoGrid` / `BentoCard` with `index`; home cards show the service page's `FeatureVisual` | Magic UI `bento-grid`, `components/services/feature-visuals.tsx` |
| Logo / name strip | `Marquee` | Magic UI |
| Figures | `NumberTicker` (server renders the final value) | Magic UI |
| Integration diagram | `AnimatedBeam` (`components/home/crm-beam.tsx`) | Magic UI |
| Partner orbit | `OrbitingCircles` | Magic UI |
| Process / how it works | `Stepper` (3 to 5 steps, CSS track pulse, optional `result`) | `components/site/stepper.tsx` |
| Markets | `MarketsGlobe` (COBE globe, Tashkent arcs, client-only via `next/dynamic`) | `components/site/markets-globe.tsx`, `components/ui/globe.tsx` |
| Partner logos | `PartnerMark` | `components/partners/partner-mark.tsx`, `public/partners/` |
| Quotes | `AnimatedTestimonials` (company tiles until photos exist) | Aceternity |
| Form panel | `BorderBeam` around `LazyLeadForm` | Magic UI |
| Navbar outline light | `BorderBeamTrain` (`components/ui/border-beam-train.tsx`): the same beam split into 10 squares of 28 px, so it bends round a 64 px bar | Magic UI, adapted |
| FAQ | native `<details>` list | `components/home/faq-section.tsx` |

Icons: lucide-react, `size-4` inline, `size-5` as a corner mark on cards. Cards lead with an index numeral (`text-5xl font-light text-muted-foreground/45`, brand on hover). Tinted icon tiles (`size-11 rounded-xl bg-brand/10`) are retired.

Labels and status (CSS classes in `globals.css`, `@layer components`):

- `tag`: square 6 px radius, 1 px border, 11 px uppercase. `tag-scene` on the hero, CTA band and footer scene. No round pills with a dot.
- `led`: 6 px square light, colour from `text-*` (`text-emerald-500` ok, `text-accent-yellow` home or warning).
- `blueprint-hover`: a brand grid fades in from the top-right corner on hover and focus. Use it on every clickable card with `hover:border-brand/40`.
- Status in visuals is a table (name, signal, OK, `led`), as in `components/services/visuals/frame.tsx` `StatusTable`.

## Glass rules

- GlassyUI CSS loads once in the layout: `liquid.css` then `dark-scope.css` (generated by `scripts/glass-dark-scope.mjs`; re-run after updating `liquid.css`).
- `data-lg-theme` on `<html>` follows next-themes. Dark scopes (`data-lg-theme="dark"`) win over a light root; light scopes inside a dark root are not supported.
- The prominent button tint is overridden in `globals.css` so it renders #2563eb-range blue on any backdrop.
- Never use `GlassScene` or `GlassProvider` (WebGL, document-level side effects).

## Motion

- Hero heading blocks: CSS `appear` / `appear-1..3` classes slide the text up without hiding it.
- Scroll entrance: add `reveal`. It uses `animation-timeline: view()`; browsers without it show content statically.
- framer-motion only inside registry components, through `m.*` under `LazyMotion`. No new entrance animations in framer.
- `prefers-reduced-motion` collapses all animations (`globals.css`).

## Performance rules

- Navbar and footer are server components; client islands are the theme toggle, locale switch and mobile menu.
- The lead form loads with `next/dynamic` 600 px before it scrolls into view.
- The only WebGL is the COBE globe: about 5 KB, loaded after hydration, paused off-screen. No particles or shader backgrounds.
- Hero headings never start at opacity 0 (`appear` moves them only); it pushed simulated mobile LCP from 1.4 s to 4.3 s.
