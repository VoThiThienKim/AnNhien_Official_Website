# Beta Build Roadmap

## Phase 0 - Foundation

- Create `docs/design-style.md`, `docs/agent-ownership.md`, `CLAUDE.md`, and agent prompts.
- Scaffold pnpm monorepo, shared contracts, API, web shell, env example, and Docker Compose.
- Run first quality gate.

## Week 1 - Commerce Core

- Harden auth, menu, cart, voucher, and shipping APIs.
- Add seed data and connect API reads to Prisma when database is enabled.
- Build customer menu/cart UI against API.

## Week 2 - Operations Core

- Build order lifecycle, booking, payment webhook shape, notification events, print-job abstraction, loyalty.
- Build staff order dashboard and stock controls.

## Week 3 - Integration UX

- Connect customer checkout and booking to API.
- Connect admin/staff pages to API.
- Add realtime new-order alert behavior and print action states.

## Week 4 - QA and Beta Prep

- Add API integration tests and Playwright smoke tests.
- Run responsive visual QA.
- Prepare deployment notes and beta smoke checklist.

