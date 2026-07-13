# Database Design

The system uses Supabase Postgres. Multi-tenancy is handled by attaching `business_id` to business records and `branch_id` to branch-supported records.

## Core Models

- User
- Business
- Branch
- SubscriptionPlan
- Subscription
- Payment
- Product
- Category
- InventoryTransaction
- Sale
- SaleItem
- Customer
- Supplier
- Expense
- StaffRole
- Permission
- AuditLog
- Notification
- ReceiptSetting

## Design Notes

- Users can belong to a business and branch.
- Products, sales, customers, suppliers, expenses, inventory transactions, notifications, and audit logs are tenant scoped.
- Subscription records track plan, status, start date, and expiry date.
- Payment records store gateway reference and verification status.
- Audit logs record sensitive actions for accountability.
