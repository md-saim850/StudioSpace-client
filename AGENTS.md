<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace client

Next.js 16.4.3 App Router storefront for listing/booking studios. The API is a separate Express/Mongo repo at `../studio-space-server`. Standalone npm project; no tests, CI, or formatter.

## Commands

- `npm run dev` — Turbopack on :3000; re-adds the generated block above.
- `npx next typegen && npx tsc --noEmit` — typegen must run first (`next-env.d.ts` imports generated `.next/types/*`, which are absent on a clean checkout). Baseline: clean.
- `npm run build` — passes at baseline; Next 16 does not run ESLint during build.
- `npm run lint` — plain `eslint`, no fix script (`npx eslint . --fix`). **Red at baseline**: 3 `react/no-unescaped-entities` errors in `src/app/sign-in/page.tsx`, `src/app/about/AboutStory.tsx`, `src/components/home/AboutSection .tsx`, plus 6 unrelated warnings.
- No test runner is installed; there is no `npm test`.

## Setup

- `.env` (gitignored): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`.
- Every fetch reads `process.env.NEXT_PUBLIC_API_URL` directly (there is no `src/lib/config.ts`). Keep the reference written statically as `process.env.NEXT_PUBLIC_API_URL`; destructuring or dynamic lookup prevents Next from inlining it. The `NEXT_PUBLIC_` prefix is required so the value is inlined into the browser bundle; changing it requires a dev-server restart/rebuild.
- API server: run `node index.js` in `../studio-space-server` (its package.json has no start/dev script). It needs `PORT`, `MONGODB_URI`, `CLIENT_URL`; DB is `studio-space-db`.
- `CLIENT_URL` must be this Next origin; the API verifies Bearer JWTs against `${CLIENT_URL}/api/auth/jwks`, so a wrong value yields 401 on every protected route.
- `next/image` allows only `images.unsplash.com`. Add-studio previews use `unoptimized`, but detail/listing images do not, so a non-Unsplash `image` value from add-studio breaks those pages until the host is added to `next.config.ts`.

## API contract (`../studio-space-server/index.js`)

- Public: `GET /studios` (with `?category=&limit=`, limit capped at 100) and `GET /category`. Everything else goes through the Bearer/JWKS middleware, including `GET /studios/:id` (easy to assume otherwise).
- Studio shape is `{ _id, data: { ...fields, owner: { id, name, email } } }`. `POST /add-studio` inserts `{ data: body }`; `PUT /studios/:id` is owner-scoped and writes the same fields at both `data.*` and root level.
- `GET /my-listings` filters `data.owner.id === req.user.id`. `GET /my-booking` filters `userId`; `POST /add-booking` stores the body flat plus `userId`/`createdAt` (clients read `booking.studio.*`, not `data.*`). Its conflict check only looks at `status: "Confirmed"` and is global, not per-user.
- `DELETE /delete-listings/:id` is owner-scoped; `DELETE /delete-booking/:id` is **not**.
- `src/type.ts` is out of sync: `StudioType` declares root `ownerName`/`ownerEmail`, but the API stores `data.owner`. `StudioDetails` reads `studio.ownerName`, so "Hosted by" never renders.

## Conventions and traps

- Routes: `/`, `/about`, `/how-it-works`, `/studios`, `/studios/[id]`, `/sign-in`, `/sign-up`, `/dashboard/{add-studio,edit-studio/[id],my-booking,my-listings}`, `/api/auth/[...all]`. About sections are colocated in `src/app/about`, not `src/components/about`. `edit-studio/[id]` reuses the default export of `add-studio/page.tsx`; don't duplicate the form.
- `src/proxy.ts` replaces `middleware.ts` (Node runtime). Its matcher lists `/dashboard/`, which matches only the nonexistent `/dashboard` index; use `/dashboard/:path*` to protect add-studio, my-listings, and edit-studio. Today those rely on client-side session checks.
- Server components get the JWT with `auth.api.getToken({ headers: await headers() })`; client mutations use `authClient.token()`. But `add-studio` actually sends `session?.session.token` (the Better Auth session token, not the JWT) on add/update, so the API's JWKS check rejects it.
- Home and `/studios` wrap `auth.api.getToken()` in try/catch before public `GET`s; with no session the call throws and the catch returns `[]`. Signed-out visitors therefore see empty lists, which is not a data problem.
- `authClient` sets `baseURL: process.env.BETTER_AUTH_URL`. Because it is not `NEXT_PUBLIC_`-prefixed, the browser value is undefined and the client falls back to same-origin, which is correct here; don't hardcode an origin.
- UI is shadcn `base-nova` on Base UI (`@base-ui/react`), not Radix. Add with `npx shadcn@latest add ...`; keep in `src/components/ui`; use `cn` from `@/lib/utils`.
- Tailwind v4 is wired through the `@tailwindcss/turbopack` rule in `next.config.ts` + `src/app/globals.css`; there is no `tailwind.config.*` or PostCSS config — don't add them.
- React Compiler is enabled (`reactCompiler: true`); don't add manual memoization.
- `src/components/home/AboutSection .tsx` has a space before `.tsx`; `src/app/page.tsx` imports that exact path.
- Dashboard sidebar Favorites/Profile Settings have no `link`, so they navigate to `/dashboard/undefined`. Delete buttons toast but never `router.refresh()`, leaving lists stale.
- `/studios?category=<slug>` only changes the heading: `getStudios()` fetches all studios and `StudioFilters` filters client-side. Don't wire the query into the API without reconciling `data.category` (display name) with the category `slug`.
