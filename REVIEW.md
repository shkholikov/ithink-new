# Review rules

Read by `/code-review`, `/security-review` and the Claude PR review workflow.

## Output

For `/code-review` and `/verify` on the developer's machine. The PR review on GitHub (Anthropic's
code-review plugin) posts in its own format and reads this file only as rules to check against.

- Start with the count: "N findings (X important, Y nits)". Zero findings: say "Nothing to fix."
- Every finding cites `path:line` and says what breaks for a user.
- Tag each finding Important, Nit or Pre-existing (bug in code this PR did not touch).
- At most 5 nits. Skip style the formatter or linter already enforces.
- Flag the bug class once ("3 callbacks skip the amount check"), not each instance separately.
- On a re-review, check only the new commits. Do not repeat an earlier finding.

## Failure modes in this repo

- **Message key drift.** `messages/{ru,en,uz}.json` must have identical key sets. next-intl does not throw on a
  missing key; it renders the key path to the visitor. Any copy change that touches one locale and not the other two
  is Important. Uzbek strings must be Latin script (`pnpm check:messages` catches Cyrillic).
- **Client components reading namespaces they do not get.** The client message bundle is limited to
  `CLIENT_NAMESPACES` in `app/[locale]/layout.tsx`. A client component calling `useTranslations` on another namespace
  shows raw keys. Client components take translated strings as props.
- **Lead schema out of step with the endpoint.** `lib/lead.ts` mirrors the ithink-miniapp `/api/site-lead` schema. A
  field renamed, added as required, or with a changed enum (services, countries) here without the same change there
  makes every submission fail or creates amoCRM deals with empty fields.
- **CSP blocking the form.** `next.config.ts` builds `connect-src` from `NEXT_PUBLIC_LEAD_ENDPOINT` and allows
  `challenges.cloudflare.com` for Turnstile. A new third-party script, font, image or fetch origin needs a CSP entry,
  or it is blocked in production while working in `pnpm dev`.
- **Real amoCRM deals from tests.** Every submission to the live endpoint creates a real deal. Scripts, QA notes or
  `.env.example` changes that point tests at `https://miniapp.ithink.uz` are Important.
- **Routes outside the nav lists.** Every slug the menus link to is listed in `lib/site-nav.ts` and `lib/services.ts`;
  the navbar, footer and sitemap read those lists. A new page missing from them is unreachable and absent from the
  sitemap; a link to a slug with no page hits the 404. Links are built as `` `/${locale}/...` `` with the locale prop.
- **Design system drift.** Pages use `PageHero` → `Section` → `CtaSection`, actions use `Cta`/`CtaRow`, colours use
  semantic tokens (`text-ink-*` on the theme scene, `text-brand-text` for blue text). Hand-rolled `<h1>` blocks,
  `text-white` on the ink scene, `motion.*` instead of `m.*` (breaks under `LazyMotion`), or hero text starting at
  opacity 0 (delays LCP) are findings.

## Risk tiers

- High (before merging, the owner reads the diff of every High file; same-day merge is fine):
  - Lead pipeline: `components/ui/lead-form.tsx`, `components/ui/turnstile.tsx`, `components/site/lazy-lead-form.tsx`,
    `lib/lead.ts`, `lib/attribution.ts`, `components/attribution-capture.tsx`
  - Security headers and CSP: `next.config.ts`
  - Middleware and locale routing: `proxy.ts`
  - Env: `.env.example`
  - CI: `.github/workflows/`
- Low (merge once CI is green):
  - Copy: `messages/*.json` (the key-set rule above still applies)
  - Assets: `public/`
  - Docs: `README.md`, `DESIGN.md`, `incidents.md`
- Medium: everything else, including `REVIEW.md`, `CLAUDE.md` and `AGENTS.md` (they set what reviews and agents
  check). Merge after the AI review is resolved.

## Skip

- Lockfiles, generated files, `dist/`, `.next/`, `next-env.d.ts`, `*.tsbuildinfo`.

## Rules from incidents

Each entry links to `incidents.md`.

- (none yet)
