# Current Application Audit

## Current Architecture

PosSuite is a Next.js 15 App Router application using TypeScript, Tailwind CSS, server-side API routes, JWT cookie sessions, Supabase Postgres through `@supabase/supabase-js`, Paystack helper functions, reusable dashboard shells, and public marketing pages.

The app has separate public pages, business dashboard pages, super-admin pages, and API routes under `app/api`. Server-side Supabase access is centralized in `lib/supabase.ts`, authentication helpers are in `lib/auth.ts`, role definitions are in `lib/permissions.ts`, plan data is in `lib/plans.ts`, and Paystack wrappers are in `lib/paystack.ts`.

## Current Database Design

The Supabase schema includes businesses, branches, app users, subscription plans, subscriptions, payments, categories, products, customers, suppliers, expenses, inventory transactions, sales, audit logs, and notifications.

Most business-owned tables include `business_id`, and branch-aware tables include `branch_id`. Foreign keys exist for the main tenant relationships and row-level security is enabled, but detailed RLS policies and server-side transaction functions still need to be completed.

## Existing Routes

Public routes include home, pricing, features, about, contact, login, register, and email verification.

Business routes include dashboard, POS, products, categories, inventory, sales, customers, suppliers, expenses, reports, staff, subscription, settings, notifications, and audit logs.

Super-admin routes include dashboard, businesses, subscription plans, payments, platform reports, support messages, audit logs, and settings.

API routes include auth login/logout/me/register/verify-registration, generic resource access, sales, and Paystack initialize/verify.

## Working Features

- Professional Next.js and Tailwind project structure
- Supabase-backed data model and seed script
- JWT session cookies with HTTP-only and SameSite settings
- Public landing/pricing/login/register pages
- Email-confirmation step for registration
- Business and super-admin route protection middleware
- Tenant-scoped basic resource API reads and creates
- Basic POS, dashboard, subscription, settings, and module pages
- Paystack initialization and verification scaffolding
- Empty states for products, sales, staff, subscriptions, and audit logs

## Missing or Weak Features

- Login rate limiting, lockout persistence, and session revocation are not yet database-backed.
- Password reset workflow is not complete.
- API input validation needs to be consistent across all state-changing routes.
- CSRF protection needs a formal origin/token strategy.
- Server-side RBAC exists only partially and must be enforced per API action.
- Supabase RLS policies need to be written, tested, and documented.
- POS checkout is mostly UI; sale completion needs a database transaction or RPC.
- Payments need signed webhook processing, idempotency, reconciliation, and strict amount validation.
- Inventory needs an immutable movement ledger with stock-balance protection.
- Homepage, pricing, SEO, footer, FAQ, and responsive polish need a deeper content pass.
- Tests are not yet implemented.

## Security Risks

- Demo credentials must never be hardcoded or publicly displayed.
- Generic resource API can become too broad unless every resource has explicit permissions and validation.
- Payment verification currently trusts route context too much and needs webhook-backed idempotency.
- Sales stock deduction currently happens outside a single database transaction.
- Database error messages should not be returned directly to users.
- The service-role key must remain server-only and never be exposed through `NEXT_PUBLIC_*`.

## Duplicate or Fragile Code

- Empty module pages repeat patterns that should become reusable list/table templates.
- Currency and plan formatting should be centralized.
- Validation should move into reusable Zod schemas.
- Permission checks should use one server-side helper.
- Paystack payment status handling should use one payment service layer.

## Recommended Implementation Order

1. Critical security and data isolation: remove public demo secrets, add validation, rate limiting, server permission guards, safer errors, and RLS policy plan.
2. Authentication and onboarding: password reset, email verification polish, onboarding wizard, checklist state, and session revocation.
3. Core POS and inventory reliability: product CRUD, inventory ledger, transactional checkout, receipts, refunds, and stock protection.
4. Payments and subscriptions: Paystack webhooks, idempotent payment attempts, reconciliation, plan-limit enforcement, and subscription status model.
5. Reports and admin tools: server-calculated dashboards, exports, staff shifts, audit events, and super-admin operations.
6. Homepage, responsive design, accessibility, and SEO: product preview hero, pricing table, footer, metadata, sitemap, robots, and mobile nav.
7. Tests, performance, and documentation: unit, integration, end-to-end, accessibility, responsive checks, pagination, lazy charts, and deployment guide.
