# Testing Plan

## Authentication Tests

- Register a new business owner.
- Log in with valid credentials.
- Reject invalid credentials.
- Protect dashboard routes from anonymous users.

## POS Tests

- Add products to cart.
- Increase and reduce quantity.
- Apply discount and tax.
- Complete sale.
- Confirm stock deduction.

## Subscription Tests

- Register with trial plan.
- Initialize paid plan payment.
- Verify payment in demo mode.
- Confirm expired subscription restriction.

## Admin Tests

- Super Admin can access platform pages.
- Business users cannot access Super Admin pages.
- Tenant data remains scoped by business.

## UI Tests

- Check desktop, tablet, and mobile layouts.
- Confirm empty states display when no records exist.
- Confirm buttons and navigation links are not broken.
