<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace client

Next.js 16.4.3 App Router storefront for listing and booking studios. Standalone npm project; no tests, no CI, no formatter config.

## Commands

- `npm run dev` — Turbopack dev server on :3000. It re-adds the generated Next.js block at the top of this file.
- `npm run lint` — plain `eslint` across the repo; no fix script (`npx eslint . --fix`). **Red at baseline**: 4 errors + 9 warnings. Errors are `react/no-unescaped-entities` in `sign-in/page.tsx`, `components/about/AboutStory.tsx`, `components/home/AboutSection .tsx`, plus `react-hooks/set-state-in-effect` in `components/layout/ThemeToggle.tsx`.
- `npx next typegen && npx tsc --noEmit` — typegen must run first (generates route types and `LayoutProps`). **Red at baseline** with 2 `TS7006` implicit-`any`: map params `booking` in `dashboard/my-booking` and `listing` in `dashboard/my-listings`.
- `npm run build` — Turbopack production build; fails on those type errors. Next 16 does not run ESLint during build.
- No test runner is installed; there is no `npm test`.

## Setup

- `.env` is gitignored. Client keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`.
- API: separate Express/Mongo repo at `../studio-space-server`. Its `package.json` has no start/dev script; run `node index.js` (or `npx nodemon index.js`). It needs `PORT`, `MONGODB_URI`, and `CLIENT_URL` in its own `.env`; DB is `studio-space-db`.
- `CLIENT_URL` must be this Next origin: the server verifies Bearer JWTs against `${CLIENT_URL}/api/auth/jwks`, so protected endpoints return 401 without it.
- `next/image` only allows `images.unsplash.com`; extend `next.config.ts` for other hosts. Add-studio previews with `<Image unoptimized>`, so arbitrary URLs preview fine.

## API contract (verified in `../studio-space-server/index.js`)

- Public: `/`, `GET /studios`, `GET /category`. Everything else requires `Authorization: Bearer <jwt>`; middleware verifies it via JWKS and sets `req.user`.
- `GET /studios?category=&limit=` and `GET /studios/:id` return `studios` documents as stored; the client expects `{ _id, data: { owner: { id, name, email }, ...fields } }`. `POST /add-studio` inserts `{ data: body }` into `studios`, so new listings do appear in `/studios`.
- `GET /my-listings` filters `studios` by `data.owner.id === req.user.id`; it is the only owner-scoped read.
- `GET /my-booking` returns every booking with no user filter. `POST /add-booking` stores the body flat (`{ studio, date, time, status }`); the client reads `booking.studio.data.*`. `DELETE /delete-booking/:id` is also not owner-scoped.
- Deletes: `DELETE /delete-listings/:id` (owner-scoped) and `DELETE /delete-booking/:id`.

## Conventions and traps

- App Router in `src/app`: `/`, `/about`, `/studios`, `/studios/[id]`, `/sign-in`, `/sign-up`, `/dashboard/{add-studio,my-booking,my-listings}`, `/api/auth/[...all]`. Shared UI in `src/components/{about,home,layout,providers,ui}`; import via `@/*`.
- Server components fetch with `cache: "no-store"` plus `auth.api.getToken({ headers: await headers() })`; client mutations call `authClient.token()`. Don't call the API without one of these.
- `src/proxy.ts` replaces `middleware.ts` (nodejs runtime). Its matcher only covers `/sign-in`, `/sign-up`, `/studios/:id`, and `/dashboard/my-booking` — add-studio and my-listings are not protected there.
- Better Auth: `src/lib/auth.ts` (MongoDB adapter + `jwt()`), `src/app/api/auth/[...all]/route.ts`, browser client `src/lib/auth-client.ts`. `authClient` has `jwtClient()`; the re-exported `signIn`/`signUp`/`signOut`/`useSession` come from a second, unconfigured client and lack the JWT plugin.
- UI is shadcn `base-nova` on Base UI (`@base-ui/react`), not Radix. Add with `npx shadcn@latest add ...`, keep in `src/components/ui`, use `cn` from `@/lib/utils`.
- Tailwind v4 loads via the Turbopack CSS rule in `next.config.ts` (`@tailwindcss/turbopack`) + `src/app/globals.css`; there is no `tailwind.config.*` or PostCSS config — don't add them.
- React Compiler is enabled (`reactCompiler: true`); don't add manual memoization.
- `src/components/home/AboutSection .tsx` has a space before `.tsx`; `src/app/page.tsx` imports that exact path.
- `src/type.ts` types `StudioType` as `{ _id, data: {...} }` with `ownerName`/`ownerEmail`, but the API stores `data.owner = { id, name, email }`; the type has no `owner` field.
- `dashboard/my-booking` hardcodes `http://localhost:5000/my-booking` while other pages use `NEXT_PUBLIC_API_URL`; its DELETE does use the env var.
- Dashboard layout hardcodes the profile and has Favorites/Profile Settings nav items with no `link` → `/dashboard/undefined`; `my-listings/UpdateBtn.tsx` has no handler. Delete buttons toast but don't refresh the route.
- `authClient` sets `baseURL: process.env.BETTER_AUTH_URL`, which isn't `NEXT_PUBLIC_`-prefixed, so browser code sees it as undefined and falls back to same-origin.
