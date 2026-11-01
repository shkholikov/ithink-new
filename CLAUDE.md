# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Reuse the existing styles — do not invent new ones

**This is the default rule for all UI work here.** Read `DESIGN.md` first: it lists the tokens, the page skeleton and which registry component covers which need. Every new section must look like the equivalent that already ships; find the closest existing page and copy its structure.

- Page skeleton: `PageHero` (`components/site/page-hero.tsx`) → `Section` / `SectionHeading` (`components/site/section.tsx`) → `CtaSection` (`components/site/cta-section.tsx`). No hand-rolled `<h1>` blocks.
- Actions: `Cta` and `CtaRow` (`components/site/cta.tsx`), GlassyUI glass buttons. `prominent` is the primary; `soft` is the secondary on ink, `ghost` on light. Two actions side by side always go in `CtaRow`.
- Cards: `rounded-3xl border border-border bg-card p-6`; feature cards via `FeatureGrid`. Controls `rounded-xl`.
- Colour: semantic tokens from `app/globals.css` only. Brand blue as text is `text-brand-text`; filled buttons are #2563eb (white on #377dff fails 4.5:1). The hero, CTA band and footer "scene" follows the theme: on it use `text-ink-foreground`, `text-ink-muted`, `text-ink-accent`, `border-ink-foreground/10`; `text-white` only on a solid blue fill.
- Motion: `appear` classes for hero headings, `reveal` for scroll entrance, both CSS. framer-motion only inside registry components, via `m.*`, never `motion.*`.
- New registry components: install from the registries in `components.json`, then rewrite `motion/react` imports to `framer-motion` + `m`, and swap other icon sets for lucide.

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

`app/[locale]/<route>/page.tsx` is a server component owning `params` and `generateMetadata` (via `pageMetadata` in `lib/seo.ts`); its sections are server components in `components/<area>/` that read copy with `getTranslations`. Client components get translated strings as props, because the client message bundle is limited to `CLIENT_NAMESPACES` in the layout. `locale` is prop-drilled because links are built by hand as `` `/${locale}/...` ``. Every slug the menus link to is listed in `lib/site-nav.ts` and `lib/services.ts`; the navbar, footer and sitemap read those lists.

Every lead form is `LeadForm` (`components/ui/lead-form.tsx`). It posts to `NEXT_PUBLIC_LEAD_ENDPOINT` (the intake endpoint in ithink-miniapp), which creates a real amoCRM deal per submission — test against a local mock, never the live URL. Its schema in `lib/lead.ts` mirrors the endpoint's; keep them in step. First-touch utm data comes from `lib/attribution.ts`.

All copy lives in `messages/{ru,en,uz}.json`, one namespace per page. **Key sets must stay identical across the three files** — next-intl does not throw on a missing key, it renders the key path to the visitor. Any wording change is a three-file edit: write a patch with all three locales and run `node scripts/i18n-merge.mjs patch.json`, then `pnpm check:messages` (also catches Cyrillic letters in Uzbek strings).

Tailwind v4, CSS-first — tokens live in `@theme inline` in `app/globals.css`, there is no `tailwind.config`. Light-first: `ThemeProvider` defaults to `light` (`:root`), dark values live under `.dark`. shadcn/ui over `@base-ui/react` (not Radix); GlassyUI buttons use `@radix-ui/react-slot` for `asChild`.

## Formatting

`.prettierrc` is not committed; the house style is tabs, `printWidth: 150`, no trailing commas. Some files are 2-space — match the file you are editing.
