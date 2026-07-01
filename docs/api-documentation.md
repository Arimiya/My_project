# API Documentation

## Authentication

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Register business owner and create business |
| POST | `/api/auth/login` | Log in user |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Get active session |

## Payments

| Method | Endpoint | Purpose |
| --- | --- | --- |
| POST | `/api/paystack/initialize` | Initialize Paystack subscription payment |
| POST | `/api/paystack/verify` | Verify payment and activate subscription |

## Business Resources

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/resources/[resource]` | List tenant records |
| POST | `/api/resources/[resource]` | Create tenant record |
| POST | `/api/sales` | Complete sale and reduce stock |

Supported resource names include products, categories, customers, suppliers, expenses, notifications, and audit logs.
