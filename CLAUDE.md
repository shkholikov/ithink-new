# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Reuse the existing styles — do not invent new ones

**This is the default rule for all UI work here.** Before writing any markup, find how the site already does that thing and copy it exactly. Every new button, card, section or page must be visually indistinguishable from the equivalent that already ships. If a pattern below does not cover your case, find the closest existing page and follow it — do not design something new.

### Buttons

Two variants, nothing else. Copy these class strings verbatim (they are what `company-page.tsx` and `service-page.tsx` use):

**Primary** — the filled brand action:

```
inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#377dff] hover:bg-[#2563eb] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-md shadow-[#377dff]/30 hover:shadow-lg hover:shadow-[#377dff]/40 hover:scale-[1.02]
```

**Secondary** — the outlined action that sits beside a primary:

```
inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-card border border-border hover:border-[#377dff]/40 hover:bg-accent text-foreground text-sm font-medium rounded-xl transition-all duration-200
```

Compact variant inside cards and tight sections: swap `px-7 py-3.5` for `px-6 py-3`. Nothing else changes.

Rules:
- Two actions side by side go in `flex flex-col gap-3 sm:flex-row sm:items-center` — never stacked, never one styled as a bare text link next to a button.
- A secondary action is a **button**, not an underlined link.
- Icons are 16px (`w-4 h-4`) before the label, inside the existing `gap-2`.
- Never introduce a third colour, a new radius, a different padding scale, or a different hover scale.

### Page shell

Every page follows the same skeleton:

```tsx
<div className="pt-24 bg-background">
  <PageHero icon={SomeIcon} badge={t("hero.badge")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
  <section className="py-20 border-t border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">…</div>
  </section>
</div>
```

- Page heading is always `PageHero` (`components/ui/page-hero.tsx`) — never a hand-rolled `<h1>` block.
- Section heading inside a page is always `SectionHeader` (`components/ui/section-header.tsx`).
- Badges are always `SectionBadge` (`components/ui/section-badge.tsx`) — do not re-implement the pill inline.
- Container is `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (`max-w-3xl` for prose-width pages).
- Sections alternate `bg-background` and `bg-secondary/20`, separated by `border-t border-border`.

### Cards

```
bg-card border border-border rounded-2xl p-6 hover:border-[#377dff]/30 transition-colors
```

`rounded-2xl` for cards, `rounded-xl` for controls. Card padding is `p-6`, or `p-8` for a panel. Grids are `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` — always with a single-column fallback.

### Colour

Brand blue is `#377dff`, hover `#2563eb`, accent yellow `#f9b934`. Everything else comes from the semantic tokens in `app/globals.css`: `bg-background`, `bg-card`, `bg-secondary`, `text-foreground`, `text-muted-foreground`, `border-border`. Do not introduce a colour that is not already in that file.

### Motion

`MotionProvider` wraps the tree in framer-motion's `LazyMotion`, so use `m.div`, never `motion.div`. Scroll entrance is `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}` — same values everywhere.

## Commands

```bash
pnpm dev            # dev server on :3000
pnpm build          # production build
pnpm start          # serve the build
pnpm lint           # eslint (flat config, next core-web-vitals + typescript)
npx tsc --noEmit    # typecheck — no script for it
```

No test runner is configured.

## Architecture

Marketing site, no database or API routes. Three locales (`uz`, `ru`, `en`, default `ru`) via next-intl; `proxy.ts` is the middleware file (Next 16 renamed `middleware.ts` → `proxy.ts`).

Each route splits in two: `app/[locale]/<route>/page.tsx` is a server component owning `params` and `generateMetadata`, and `components/pages/<name>-page.tsx` is a client component reading copy with `useTranslations`. `locale` is prop-drilled because links are built by hand as `` `/${locale}/...` ``.

All copy lives in `messages/{ru,en,uz}.json`, one namespace per page. **Key sets must stay identical across the three files** — next-intl does not throw on a missing key, it renders the key path to the visitor. Any wording change is a three-file edit.

Tailwind v4, CSS-first — tokens live in `@theme inline` in `app/globals.css`, there is no `tailwind.config`. Dark-first: `ThemeProvider` defaults to `dark`, light values live under `.light`. shadcn/ui over `@base-ui/react` (not Radix).

## Formatting

`.prettierrc` is not committed; the house style is tabs, `printWidth: 150`, no trailing commas. Some files are 2-space — match the file you are editing.
