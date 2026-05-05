# FreshDream Mattress Care

Marketing site and booking system for FreshDream Mattress Care — a dry mattress, sofa and rug cleaning business based in Roysambu, Nairobi, serving Airbnb hosts, serviced apartments and homes.

## Stack

- React 18 + Vite 5 + TypeScript
- Tailwind CSS v3 + shadcn/ui
- React Router
- Lovable Cloud (Supabase) — Postgres, Auth, Edge Functions

## Setup

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
npm run preview  # preview production build
npm test         # run vitest
```

## Environment

Copy `.env.example` to `.env` and fill in Lovable Cloud values (auto-provisioned in Lovable):

```
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_URL=
```

For the first admin account, set the edge function secret `ADMIN_SETUP_CODE` and use it on `/admin` setup screen.

## Structure

- `src/pages` — routed pages (Index, Services, Pricing, HostPackages, FAQ, Contact, Admin, legal pages)
- `src/components` — UI components and section blocks
- `src/data/packages.ts` — single source of truth for service packages and pricing
- `src/config/site.ts` — business contact details and service areas
- `supabase/functions` — edge functions (bootstrap-admin, check-admin-exists)
