# Deployment Guide

## Local Setup

```bash
npm install
npm run dev
```

## Vercel Deployment

1. Push the repository to GitHub.
2. Create or import the project in Vercel.
3. Add environment variables:
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - `PAYSTACK_PUBLIC_KEY`
   - `PAYSTACK_SECRET_KEY`
4. Deploy the project.
5. Run the seed script locally or from a secure admin environment if demo data is needed.

## Production Notes

- Use a strong `NEXTAUTH_SECRET`.
- Store Paystack secret keys only in server environment variables.
- Use a production MongoDB database.
- Enable Vercel analytics and logs for monitoring.
- Keep demo accounts out of a real production launch.
