# ProSale POS

Subscription-based Point of Sale prototype for SMEs, generated from the PRD.

The frontend is connected to a Node.js API and MongoDB database.

## Included

- Dashboard inspired by the provided reference image
- Products, sales checkout, customers, suppliers, expenses, reports, subscriptions, and settings screens
- Interactive cart, inventory updates, receipt output, report metrics, and plan management
- PRD and roadmap documentation

## Run

Install dependencies:

```bash
npm.cmd run install:all
```

Create your backend environment file:

```bash
copy backend\.env.example backend\.env
```

Edit `backend/.env` and add your MongoDB connection:

```text
MONGODB_URI=mongodb://127.0.0.1:27017/prosale_pos
```

For MongoDB Atlas, use your Atlas URI instead.

Run frontend and backend together:

```bash
npm.cmd run dev
```

Or run only the frontend:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then visit:

```text
http://127.0.0.1:4173/index.html
```

Backend API:

```text
http://127.0.0.1:5000/api/health
```

The frontend loads database data from:

```text
http://127.0.0.1:5000/api/bootstrap
```
