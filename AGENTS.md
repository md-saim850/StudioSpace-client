<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# StudioSpace client

Next.js 16 App Router storefront for listing and booking creative studios. Standalone npm project; no test suite and no CI.

## Commands

- `npm run dev` — Turbopack dev server on :3000. It regenerates the Next.js block at the top of this file.
- `npm run lint` — ESLint flat config; there is no auto-fix script (use `npx eslint . --fix`).
- `npx next typegen && npx tsc --noEmit` — generate route types before typechecking. `next build` no longer runs ESLint in Next 16.
- `npm run build` — production build; fails on TypeScript errors.
- No test runner is installed; there is no `npm test`.

## Setup

- `.env` is gitignored. Required keys: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`.
- The API is a separate Express/Mongo app in `../studio-space-server` (its own git repo and `node_modules`). It has no start script; run `node index.js` there with `PORT` and `MONGODB_URI` set.
- Client pages fetch `NEXT_PUBLIC_API_URL` (`/studios`, `/studios/:id`, `/add-studio`, `/add-booking`). `next/image` only allows `images.unsplash.com` unless you extend `next.config.ts`.
- Server contract: `GET /studios`, `/studios/:id`, `/my-booking`, `/my-listing`; `POST /add-studio` wraps the posted body as `{ data: body }`, while `/add-booking` stores it flat. Database: `studio-space-db`.

## Layout and conventions

- App Router lives in `src/app`; shared UI in `src/components/{layout,home,ui}`; import via `@/*` (`./src/*`).
- Better Auth: server config `src/lib/auth.ts` (MongoDB adapter), route at `src/app/api/auth/[...all]/route.ts`, browser client `src/lib/auth-client.ts`. Client components use `authClient.useSession()`.
- UI is shadcn `base-nova` built on Base UI (`@base-ui/react`), not Radix. Generate with `npx shadcn@latest add ...` so `components.json` is honored; keep components in `src/components/ui`. Use `cn` from `@/lib/utils` (re-export of the `cn` package) and `lucide-react` icons.
- Tailwind v4 is loaded through the Turbopack rule in `next.config.ts` (`@tailwindcss/turbopack`) plus `src/app/globals.css`; there is no `tailwind.config.*` or PostCSS config. Don't add them.
- React Compiler is enabled (`reactCompiler: true`); don't add manual memoization just to satisfy it.

## Known data-model traps

- `src/type.ts` defines the API model `StudioType` with fields nested under `data` and Mongo `_id`; home/marketing components use separate hardcoded flat data. `FeaturedStudios.tsx` still imports a `Studio` type that `src/type.ts` does not export, so the build fails until the shapes are reconciled.
- Several dashboard paths are placeholders: add-studio redirects to `/dashboard/my-studios` (no route exists), and my-listings fetches `/api/spaces` (no route here) while expecting an `ownerEmail` prop the page route never passes.
- Dashboard values (bookings, stats, profile) are currently hardcoded mock data, not fetched.
