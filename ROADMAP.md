# Product Roadmap

## Phase 1: MVP Foundation

**Goal:** Prove the core POS workflow for one business and one branch.

- Build authentication and role-based access.
- Add business profile setup.
- Create product, category, and inventory management.
- Implement checkout, receipt generation, discounts, tax, and payment recording.
- Add customers and staff roles.
- Add basic reports for sales, inventory, products, and staff.
- Add subscription plans and manual payment history.
- Add admin dashboard for businesses and plans.

**Exit Criteria**

- A cashier can complete a sale and generate a receipt.
- Inventory updates automatically after each sale.
- An owner can view daily sales, low-stock items, and subscription status.
- A platform admin can view businesses and manage subscription plans.

## Phase 2: Subscription and Operations

**Goal:** Make the product reliable for paying SME customers.

- Integrate payment gateway for subscription billing.
- Add subscription expiry alerts and automatic access restrictions.
- Add supplier purchase records and cost tracking.
- Add refunds, returns, held sales, and reprinted receipts.
- Export reports as PDF and Excel.
- Add audit logs for sensitive actions.
- Improve dashboard performance and mobile usability.

**Exit Criteria**

- Businesses can subscribe, renew, upgrade, downgrade, and see billing history.
- Expired accounts are restricted according to plan rules.
- Owners can export useful financial and inventory reports.

## Phase 3: Growth Features

**Goal:** Support larger SMEs and higher transaction volume.

- Add multi-branch support.
- Add barcode scanner integration.
- Add customer loyalty points.
- Add SMS and email receipts.
- Add advanced analytics and forecasting.
- Add expense management.
- Add accounting and e-commerce integrations.
- Add WhatsApp order management.

**Exit Criteria**

- Multi-branch businesses can manage staff, stock, and reports by location.
- Businesses can run customer retention programs.
- Owners have deeper analytics for forecasting and growth decisions.

## Phase 4: Mobile and Offline

**Goal:** Improve reliability in markets with unstable internet access.

- Build Android and iOS apps.
- Add offline checkout mode.
- Sync offline sales and inventory changes when internet returns.
- Add conflict resolution for inventory adjustments.
- Add local receipt printing support.

**Exit Criteria**

- Cashiers can continue selling during internet interruptions.
- Offline and online data sync safely without losing transactions.

## Implementation Roadmap

| Area | Prototype Status | Production Next Step |
| --- | --- | --- |
| Sales Checkout | Static interactive cart | Connect to backend transaction API |
| Inventory | Sample stock and alerts | Add PostgreSQL product and stock tables |
| Customers | Sample records | Add customer CRUD and purchase history |
| Staff Roles | Role matrix display | Enforce permissions in API middleware |
| Subscriptions | Plan comparison | Integrate billing provider |
| Reports | Sample KPI cards | Aggregate from sales and inventory data |
| Admin | Sample business table | Build platform admin APIs |
| Receipts | Printable preview | Store receipts and support reprints |

