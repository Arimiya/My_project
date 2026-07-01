# System Requirements

## Functional Requirements

- Users can register and log in securely.
- Businesses can choose and manage subscription plans.
- Cashiers can process sales through a POS screen.
- Stock is reduced after completed sales.
- Owners can manage products, categories, customers, suppliers, staff, expenses, and reports.
- The system can generate receipts and transaction history.
- Super Admin can manage businesses, subscriptions, payments, and platform reports.
- Expired subscriptions are restricted from premium modules.

## Non-Functional Requirements

- Passwords must be hashed.
- Dashboard routes must be protected.
- Business records must be isolated by `businessId`.
- The interface must be responsive on desktop, tablet, and mobile.
- API routes must validate inputs and return clear errors.
- The system should be deployable on Vercel.
- The database should support growth across many businesses.
