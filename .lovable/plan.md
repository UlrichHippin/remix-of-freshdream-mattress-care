# FreshDream Mattress Care — WhatsApp-Only Booking

Static marketing website with a WhatsApp-only booking flow. No database, no backend, no authentication, no admin dashboard.

## How booking works

Customers fill the booking form and on submit the website opens WhatsApp with a fully prefilled booking request message. A client-side Request ID is generated (FD-YYYYMMDD-4DIGITS). The booking is only confirmed after FreshDream replies on WhatsApp.

## Pages

- Home (Index) — hero, technology teaser, how it works, comparison, quick quote, booking form, location fees, FAQ
- Services — detailed service descriptions
- Pricing — full pricing with opening offers
- Host Packages — Airbnb host packages
- Technology — JIMMY BX7 Pro Max specs
- About — company info
- FAQ, Contact, Privacy, Terms, Disclaimer, Cancellation

## Stack

React 18 + Vite 5 + TypeScript + Tailwind CSS v3 + shadcn/ui
