# FitPro SaaS Fitness Application

Production-ready full-stack SaaS fitness application with personalized plans, JWT auth, Stripe subscriptions and admin analytics.

## Project structure

```
/backend
/frontend
```

## Backend setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### Backend environment variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: JWT signing key
- `JWT_EXPIRES_IN`: Token TTL (default: 1d)
- `STRIPE_SECRET_KEY`: Stripe API secret
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signature secret
- `STRIPE_PRICE_ID`: Stripe recurring monthly price ID (`R$19.90`)
- `FRONTEND_URL`: Frontend origin for CORS and Stripe redirects
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`: Fixed admin seeding

## Frontend setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

### Frontend environment variables

- `VITE_API_URL`: Backend API URL (`http://localhost:5000/api`)

## Stripe configuration

1. Create a Stripe product with monthly recurring price `R$19.90`.
2. Copy the price id to `STRIPE_PRICE_ID`.
3. Run Stripe CLI to forward webhooks:

```bash
stripe listen --forward-to localhost:5000/api/subscription/webhook
```

4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`.

## MongoDB configuration

Use local MongoDB or Atlas URI and assign to `MONGO_URI`.

Example local value:

```env
MONGO_URI=mongodb://localhost:27017/fitness_saas
```

## Features

- Registration/login with bcrypt hashed passwords and JWT
- BMI auto-calculation and persistence
- Auto-generated diet/workout/sleep plans
- JWT-protected dashboard with subscription gating
- Stripe checkout subscription with 3-day trial and webhook status sync
- Admin panel with user metrics and estimated revenue
- Responsive dark neon design (React + Tailwind)
