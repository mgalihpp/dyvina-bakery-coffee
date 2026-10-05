# Dyvina Bakery & Coffee

Dyvina Bakery & Coffee is a catalog and simple ordering website for a bakery and coffee shop. Customers browse products, fill a cart, check out, and send the order over WhatsApp. An admin dashboard manages categories, products, and orders. It is a single Next.js app, not a monorepo.

`PRD_Dyvina_Bakery_Coffee.md` is the product source of truth: scope, data model, business rules, and tech stack. Read the relevant section before building a feature.

## What matters most

These are the things we should not compromise on. Check them against every change.

### 1. The numbers are right

Prices, availability, and order history must be correct. Totals are computed on the server from database prices, never from client input. A past order never changes because a product was edited or deleted.

### 2. Public pages are fast and findable

Home, About, Menu, Product detail, Gallery, and Contact are public and must work for SEO: server-rendered, with title, description, Open Graph metadata, a sitemap, and robots config. Prefetch on the server instead of fetching in `useEffect`.

### 3. Mobile first

Most customers will order from a phone. Layouts work from 320px up, and checkout must be usable with one hand. Desktop gets denser grids and the admin sidebar, not different behavior.

### 4. Admin is locked down

Everything under `/admin` and every admin operation requires an authenticated session, checked on the server. Hiding a button is not authorization.

### 5. Version 1 stays small

The PRD lists what is out of scope: payment gateway, QRIS, POS, loyalty, delivery, multi-outlet, inventory management, customer accounts. Do not build any of it, and do not leave hooks for it, unless Galih asks.

## Working with Galih

- The user is **Galih**. Address them as Galih and reply in Indonesian unless they write in English. Code, identifiers, and commits stay in English.
- Galih wants the latest stable version of every dependency. Check the registry before choosing a version, and say so when you pin something below `latest` and why (see Prisma below).
- The project follows SDLC Waterfall. Requirements are locked in the PRD before implementation. If a task contradicts the PRD, say so and ask before deviating.
- Business data (product names, prices, photos, WhatsApp number, hours, address) must be confirmed by Dyvina before production. Use obvious placeholders in development, never invented real-looking data.

## A small glossary

- **customer** means the visitor who browses and orders. There are no customer accounts.
- **admin** means the person who logs in to manage the shop. Admins are created only by the seed script.
- **category** and **product** mean the catalog. A product belongs to exactly one category.
- **cart** means the client-side list of chosen products. It lives in the browser and is never stored in the database.
- **order** means the record created at checkout, with a human-readable `orderNumber` and a status (`PENDING`, `PROCESSING`, `COMPLETED`, `CANCELLED`).
- **order item** means one line of an order. It is a snapshot of product name and price at order time.
- **setting** means an admin-configurable key/value, such as the WhatsApp number and message template.

## The ways to hurt yourself

1. **Killing by pattern.** Shell is bash on Windows. Never kill processes by name or path match. Kill only a PID you captured when you started the server, or the owner of your port from `netstat -ano`. Other dev servers may be running.
2. **Trusting the client with money.** Never accept `price`, `subtotal`, or `total` from the browser. Recompute from the database inside the procedure, and re-check `isAvailable` there.
3. **Importing the wrong Prisma.** The client is generated into `src/generated/prisma`. Import from `@/generated/prisma/client`, never `@prisma/client`. After a fresh clone or any `schema.prisma` edit, run `bun run db:generate`.
4. **Bumping Prisma to 8.** Prisma is pinned to 7.10.0 on purpose: the `prisma` npm tag is 8.0.0-rc while `@prisma/client` stable is 7.x. Do not upgrade without Galih's approval.
5. **Adding ESLint.** Linting is Biome. `typescript-eslint` does not support TypeScript 7, so ESLint breaks the toolchain. Do not add `eslint` or `eslint-config-next`.
6. **Writing uploads to `public/`.** Vercel's filesystem is read-only. Product images go to external storage (Vercel Blob or Cloudinary, per the PRD).
7. **Running migrations against the wrong database.** `prisma migrate dev` can reset a database. Check `DIRECT_URL` (what the Prisma CLI uses) points at a dev database before running it. Never run it against production.
8. **Committing secrets.** `.env*` is gitignored except `.env.example`. Never print or paste `BETTER_AUTH_SECRET`, `DATABASE_URL`, or `DIRECT_URL`.

## Hit every surface

The most likely defect is a change that works on the path you tested and is missing everywhere else. Before calling work done, walk this list and say which entries applied:

- **Entry points.** A product can be added to the cart from the menu list, the detail page, and the home featured section. Fix all of them or none.
- **Availability.** `isAvailable = false` must block ordering in the UI (disabled button, clear label) and in the order procedure. The server check is the one that counts.
- **Public vs admin.** Changing a field on `Product` or `Category` usually touches the Prisma schema, the Zod schema, the admin form, the admin table, the public card, and the detail page.
- **Contracts.** Zod schemas define tRPC input and also back the React Hook Form forms. Change the schema once and let both follow.
- **Reverse states.** If you add a way in, add the way out. Cancel needs a visible status, available needs unavailable, add to cart needs remove.
- **Breakpoints.** Check mobile, tablet, and desktop for any layout change.
- **SEO.** New public pages need metadata. New product URLs use the slug.
- **Docs.** If the change alters scope, data model, or stack, update the PRD in the same change.

## Dev servers

- `bun install` installs. `bun run dev` starts Next.js on port 3000. `bun run build` is a good smoke test and needs no database.
- Bun loads `.env` automatically. There is no `dotenv`. Copy `.env.example` to `.env` and fill `DATABASE_URL` (pooled, runtime), `DIRECT_URL` (direct, Prisma CLI), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
- First-time database: `bun run db:migrate`, then `bun run db:seed`. The seed script is the only way to create an admin, because public sign-up is disabled. It has not yet been run against a real database.
- Stop only what you started, by the PID you tracked. See rule 1.

## Test data

An empty catalog is a bad test. Seed a few categories and products into a **development** database so menu, search, filter, and cart have something to show. Use placeholder names and prices. Do not point tests at a production database, and do not copy production order data into dev.

## Verifying

- Smallest proof that the change works. `bun run typecheck` and then `bun run lint` for the scope you changed. `bunx vitest run <file>` for tests you touched.
- Test meaningful logic: total calculation, the order snapshot, quantity and availability rules, slug generation. Do not write tests that only assert component markup or mirror the implementation.
- Put pricing and order logic in plain functions so Vitest can cover them without a database or a browser.
- No sleeps or arbitrary timeouts in tests. A test that needs a delay to pass is wrong.
- Do not drive a browser or computer use unless Galih agrees or asks. When they do, one pass over the changed flow at mobile width is enough.
- `bun run format` rewrites files. Run it on what you changed, not as a drive-by.

## Commits and pull requests

- Do not commit, push, or open a PR unless Galih asks.
- Conventional commit titles in plain language, such as `fix(order): total ignored unavailable items`. One concern per commit.
- Do not commit plans, research notes, or scratch files. `.firecrawl/` is gitignored scratch for Firecrawl output.

## Documentation

- The PRD is the product document. Keep it accurate when scope, data model, or stack changes, and rewrite the affected text instead of appending a second account.
- Do not add internal docs that restate what the code and types already say. Explain a decision in a nearby comment, or in the PRD if it crosses boundaries.
- This file is for what an agent would otherwise get wrong. Do not add generic advice here.

## How it works

A customer browses server-rendered pages, adds products to a Zustand cart stored in localStorage, and checks out. Checkout calls a tRPC `publicProcedure`, which validates input with Zod, recomputes prices from the database, writes an `Order` with snapshot `OrderItem`s, and returns the order number. The browser then opens a `wa.me` link with a prefilled message built from the `Setting` template.

An admin signs in through Better Auth. Admin pages call `adminProcedure`s that manage categories, products, and orders and move an order through its statuses.

## Where code lives

- `src/app` - routes. Public pages at the root, `admin/` for the dashboard, `api/auth/[...all]` for Better Auth, `api/trpc/[trpc]` for tRPC.
- `src/trpc` - the API. `init.ts` builds the context (`prisma` and `session`) and exports `publicProcedure` and `adminProcedure`. `routers/_app.ts` is the root router. `server.tsx` is for Server Components (`trpc`, `HydrateClient`); `client.tsx` is for client components (`useTRPC`). Only the `health` router exists so far; `category`, `product`, and `order` are planned.
- `src/lib` - `prisma.ts` (pg driver adapter), `auth.ts` and `auth-client.ts` (Better Auth), `utils.ts` (re-exports `cn` from the `cn` package).
- `src/components/ui` - shadcn/ui components, built on `@base-ui/react`, not Radix. Add with `bunx shadcn@latest add <name>`.
- `src/generated/prisma` - generated and gitignored. Do not edit.
- `prisma/schema.prisma`, `prisma/seed.ts`, and `prisma.config.ts` - schema, admin seed, and Prisma 7 config. The datasource URL lives in `prisma.config.ts`, not in the schema.

## Taste

- Keep tRPC procedures thin: decode input, call a function, map errors. Business rules live in plain functions.
- Money is an integer in Rupiah. No `Decimal`, no floats.
- `OrderItem.productId` is nullable with `SetNull`, and `Product.categoryId` is `Restrict`. Deleting a product keeps history. Deleting a category that still has products is refused.
- superjson is configured on the server init, the query client, and the tRPC client. Any new link or client needs the same transformer or `Date` values break.
- Validate every tRPC input with Zod. Mark server-only modules with `import "server-only"`.
- Inferred types over annotations. `any` is the enemy.
- Prefer the smallest change that works. Do not add machinery for features outside version 1.
- If a rule here fights the task in front of you, say so and get Galih's sign-off before breaking it.

## Additional tips

- Security matters for the admin area and the order endpoint. Do not over-engineer it for public read-only pages.
- This is Next.js 16 with breaking changes. Read the matching guide in `node_modules/next/dist/docs/` before writing Next.js code. The block below is managed by `next dev`; leave it intact.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
