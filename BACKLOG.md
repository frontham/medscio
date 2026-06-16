# Backlog

Things to pick up with more time.

## Features
- **Sorting options** - let the clinician toggle newest/oldest (and maybe sort by name); it's fixed to newest-first today.
- **Pagination / "see more"** - the API returns only the top 5; let users page through the rest.
- **Fuzzy / relevance ranking** - tolerate typos and rank exact matches above partial ones.
- **Group results by class/component** - easier to scan when many tests match.

## UX & accessibility
- **Dark / light mode** - respect the OS theme; clinical screens are used in varied lighting.
- **Full combobox accessibility** - arrow-key navigation + ARIA listbox; we shipped a solid baseline only.
- **Relative dates** - show "3 days ago" next to the absolute date for quick recency.
- **i18n** - externalise copy so the UI can be translated; the product isn't English-only.

## Tooling & engineering
- **Prettier** - one consistent code style, applied automatically.
- **Playwright e2e** - browser-level test of the full flow: debounce, the 2-character gate, error + retry.
- **CI** - run lint / typecheck / tests on every push to catch regressions.
- **Runtime API validation** - validate the response shape (a tiny schema) instead of trusting it.
- **Server-side caching / indexing** - needed once the data grows to the a full catalogue.
