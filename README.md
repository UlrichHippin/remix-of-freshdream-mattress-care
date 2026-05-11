# FreshDream Mattress Care

Static marketing website with WhatsApp-only booking flow for FreshDream Mattress Care. No database, no Supabase, no admin login required.

## Stack

- React 18 + Vite 5 + TypeScript
- Tailwind CSS v3 + shadcn/ui
- React Router

## Setup

```bash
npm install
npm run dev      # start local dev server
npm run build    # production build
npm run preview  # preview production build
npm test         # run vitest
```

## How booking works

The booking form on the site does not store any data. On submit it generates a client-side Request ID and opens WhatsApp with a fully prefilled booking message. The booking is only confirmed after FreshDream replies on WhatsApp with availability, final price, location fee and payment details.

## Structure

- `src/pages` — routed pages (Index, Services, Pricing, HostPackages, FAQ, Contact, legal pages)
- `src/components` — UI components and section blocks
- `src/data/packages.ts` — single source of truth for service packages and pricing
- `src/config/site.ts` — business contact details and service areas
