# An Nhien Restaurant System

Online ordering, booking, staff operations, and admin management system for An Nhien vegan cuisine.

## Current Build Target

- Phase: Beta foundation
- Style: Modern Plant Bistro
- Frontend: Next.js 14 App Router + Tailwind CSS
- Backend: Express + TypeScript
- Shared contracts: `packages/shared`
- Data layer: Prisma schema for PostgreSQL, with in-memory adapters for local beta flow
- Realtime: Socket.IO event contracts

## Quick Start

```bash
pnpm install
pnpm dev
```

API defaults to `http://localhost:4000`.
Web defaults to `http://localhost:3000`.

## Useful Commands

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Core Docs

- [Design Style](docs/design-style.md)
- [Agent Ownership](docs/agent-ownership.md)
- [Project Spec](an-nhien-spec.md)

