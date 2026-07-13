# Subscription-Based POS System for SMEs

Design and Implementation of a Subscription-Based Point of Sale POS System for Small and Medium Enterprises.

This is a modern SaaS POS web application for SMEs. It includes a marketing website, business registration, subscription plans, protected business dashboards, a POS checkout flow, inventory, products, sales, customers, suppliers, expenses, reports, staff, settings, notifications, audit logs, and a Super Admin area.

## Features

- Professional public landing, pricing, features, about, contact, login, and register pages
- Multi-tenant business dashboard with role-aware navigation
- POS checkout screen with cart, discounts, tax, customers, and payment methods
- Product, category, inventory, sales, customer, supplier, expense, staff, report, subscription, and settings modules
- Super Admin dashboard for businesses, plans, payments, platform reports, support, and audit logs
- Supabase Postgres data layer with scalable tenant fields
- Secure password hashing with bcrypt and JWT cookie sessions
- Paystack payment initialization and verification wrappers with safe demo mode
- Recharts analytics, printable receipt-ready structure, CSV/PDF export placeholders
- Responsive SaaS UI with Tailwind CSS and lucide-react icons
- Optional private seed accounts for testing

## Technologies Used

- Next.js 15 with TypeScript
- Tailwind CSS
- Supabase Postgres with `@supabase/supabase-js`
- JWT sessions with jose
- bcryptjs for password hashing
- Paystack-ready API integration
- Recharts
- jsPDF and react-to-print
- lucide-react

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run dev
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
PAYSTACK_PUBLIC_KEY=
PAYSTACK_SECRET_KEY=
RESEND_API_KEY=
EMAIL_FROM=
ENABLE_DEMO_LOGIN=false
DEMO_ADMIN_EMAIL=
DEMO_ADMIN_PASSWORD=
DEMO_OWNER_EMAIL=
DEMO_OWNER_PASSWORD=
DEMO_CASHIER_EMAIL=
DEMO_CASHIER_PASSWORD=
```

Run `supabase/schema.sql` in the Supabase SQL Editor before registration or seeding. If Paystack keys are missing, the app uses demo-safe payment responses so academic testing still works. Registration confirmation emails are sent with Resend when `RESEND_API_KEY` and `EMAIL_FROM` are configured; otherwise local development prints the code in the server log.

## Seed Data

```bash
npm run seed
```

The seed command always syncs subscription plans. Demo users are optional and are created only when the private `DEMO_*` environment variables are set. Do not commit real demo passwords to the repository.

## Folder Structure

```text
app/                  Next.js routes, dashboards, and API endpoints
components/           Reusable UI, landing, and dashboard components
docs/                 Academic project documentation
lib/                  Auth, database, plans, permissions, utilities, demo data
supabase/             Supabase SQL schema
scripts/              Supabase seed and maintenance scripts
```

## Deployment Guide

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables in Vercel Project Settings.
4. Set `NEXTAUTH_URL` to the production domain.
5. Deploy.

## Screenshots

Add screenshots of the landing page, dashboard, POS screen, products page, reports page, and Super Admin panel after deployment.

## Future Improvements

- Real-time barcode scanner support
- Offline POS mode with background sync
- Native Android and iOS app
- Full Paystack recurring subscriptions
- Stripe support for international businesses
- Accounting software integrations
- AI sales forecasting
- WhatsApp order management
