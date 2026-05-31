# An Nhien Restaurant System - Agent Instructions

## Project Context

Build an online ordering, booking, staff operations, and admin management system for An Nhien vegan cuisine in Vietnam.

## Non-Negotiables

- Read `docs/design-style.md` before changing any UI.
- Read `docs/agent-ownership.md` before changing files in a multi-agent workflow.
- Code identifiers, comments, and commit messages use English.
- User-facing copy and API messages use Vietnamese by default.
- Business timezone is `Asia/Bangkok`.
- Do not hardcode provider secrets. Use environment variables from `.env.example`.

## Tech Stack

- Monorepo: pnpm workspaces + Turborepo
- Frontend: Next.js 14 App Router, Tailwind CSS
- Backend: Express + TypeScript
- Shared contracts: `packages/shared`
- Database target: PostgreSQL via Prisma
- Local beta integrations: mock/sandbox adapters for payment, shipping, email, printer

## API Style

- Return `{ success, data, message }` for successful responses.
- Return `{ success: false, message, issues? }` for handled errors.
- Validate POST/PATCH inputs with Zod.
- Keep business logic in services, not controllers.
- Payment status changes must come from webhook/IPN handlers, not frontend trust.

## Business Rules

- Orders accepted only from 08:00 to 21:00.
- Customer cancellation allowed only within 5 minutes while order status is `pending`.
- Out-of-stock items cannot be added to cart or checked out.
- Voucher minimum spend excludes shipping.
- Only one voucher can be applied; choose the best value if multiple are evaluated.
- Shipping fee is provider price + 2,000 VND, unless a free-shipping rule applies.
- Booking groups over 6 require 100% deposit.
- Loyalty points: 10,000 VND = 1 point, added only when order reaches `complete`.

## Multi-Agent Safety

- Work only inside your assigned ownership area.
- Do not modify shared contracts unless you are the Coordinator or have explicit approval.
- Never revert edits made by another agent.
- If a contract change is required, stop and report the exact change needed.

