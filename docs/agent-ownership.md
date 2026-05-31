# Multi-Agent Ownership

## Coordinator

The Coordinator works in the main workspace and owns:

- Shared contracts in `packages/shared`
- Root config, scripts, docs, and CI-like quality gates
- Design tokens and style guidance
- Merge order and conflict resolution
- Final verification

Only the Coordinator changes shared contracts unless another agent receives explicit approval.

## Agent Branches

| Agent | Ownership | Primary Goal |
| --- | --- | --- |
| `agent/foundation` | Root config, `packages/shared`, Prisma schema, env examples | Create the monorepo baseline and stable contracts |
| `agent/api-commerce` | `apps/api/src/modules/{auth,menu,cart,voucher,shipping}` | Customer commerce APIs and adapter boundaries |
| `agent/api-operations` | `apps/api/src/modules/{order,payment,booking,notification,loyalty,customer,admin,report}` | Restaurant operations, order lifecycle, booking, staff events |
| `agent/web-customer` | `apps/web/app/(customer)`, customer components | Customer menu, cart, checkout, orders, booking UI |
| `agent/web-admin` | `apps/web/app/(admin)`, admin components | Staff/admin dashboard, orders, menu, vouchers, reports |
| `agent/qa-review` | Tests, review notes, non-invasive fixes approved by Coordinator | Business rule coverage, responsive checks, regression review |

## Merge Order

1. `agent/foundation`
2. `agent/api-commerce`
3. `agent/api-operations`
4. `agent/web-customer`
5. `agent/web-admin`
6. `agent/qa-review`

After every merge, run:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Conflict Rules

- Do not edit another agent's owned files.
- Do not move files across ownership boundaries without Coordinator approval.
- Do not change API response shapes or shared enum values in feature branches.
- If a shared change is needed, document the exact proposed contract and stop.
- Never revert another agent's changes.

## Prompt Template

```md
You are working on An Nhien in a multi-agent build.

Read:
- docs/design-style.md
- docs/agent-ownership.md
- CLAUDE.md

Your ownership:
- <list exact paths/modules>

Task:
- <specific build goal>

Rules:
- Do not modify files outside ownership.
- Do not change shared contracts.
- Keep user-facing text Vietnamese.
- Run relevant checks and report changed files.
```

