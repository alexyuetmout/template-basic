# User System + Payment System + Points System

A comprehensive Next.js application with integrated user management, Stripe payments, and points system built with Better Auth and Prisma.

## 🚀 Features

### User System
- **Email/Password Registration** with username auto-generation
- **Google OAuth** integration
- **User Profiles** with avatar, country, IP tracking
- **Admin Management** with role-based access
- **User Status** management (active/inactive/suspended)

### Payment System
- **Stripe Integration** for secure payments
- **One-time Purchases** with instant point rewards
- **Subscription Management** (monthly/yearly/weekly)
- **Order Tracking** with detailed history
- **Webhook Processing** for real-time updates

### Points System
- **Two Point Types**:
  - One-time points (purchasable, with expiration)
  - Subscription points (monthly grants, no expiration)
- **Automatic Distribution** for yearly subscriptions
- **Complete Transaction History**
- **Point Spending** with smart deduction logic
- **Expiration Management** with automated cleanup

### Technical Features
- **PostgreSQL Database** with Prisma ORM
- **Better Auth** for modern authentication
- **TypeScript** throughout
- **RESTful API** design
- **Webhook Security** with signature verification
- **Cron Jobs** for automated tasks

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Prisma
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd template-basic
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your actual values:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/your_db_name"
   
   # Better Auth
   BETTER_AUTH_SECRET="your-random-secret-key-here"
   BETTER_AUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
   STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
   STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Push database schema
   pnpm db:push
   
   # Seed initial data
   pnpm db:seed
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Stripe Setup
1. Create a [Stripe account](https://dashboard.stripe.com/)
2. Get your API keys from the Stripe dashboard
3. Set up webhook endpoint: `http://localhost:3000/api/webhooks/stripe`
4. Subscribe to these events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### Database Schema
The application uses the following main entities:
- `User` - User accounts with authentication data
- `Session` - Better Auth session management
- `Account` - OAuth account linking
- `Price` - Product pricing with Stripe integration
- `Order` - Purchase orders and transactions
- `Subscription` - Recurring subscription management
- `PointTransaction` - Complete points transaction history
- `AppSetting` - System configuration

## 📚 API Endpoints

### Authentication
- `POST /api/auth/sign-in` - Email/password sign in
- `POST /api/auth/sign-up` - User registration
- `GET /api/auth/callback/google` - Google OAuth callback

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Payments & Orders
- `GET /api/prices` - List available prices
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

### Subscriptions
- `GET /api/subscriptions` - Get user subscriptions
- `POST /api/subscriptions/cancel` - Cancel subscription

### Points System
- `GET /api/points/balance` - Get points balance
- `GET /api/points/transactions` - Get transaction history
- `POST /api/points/spend` - Spend points

### Webhooks
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Settings (Admin Only)
- `GET /api/settings` - Get system settings
- `POST /api/settings` - Create/update settings

## 🔄 Business Logic

### User Registration Flow
1. User provides email/password or uses Google OAuth
2. Username auto-generated from email prefix
3. Stripe customer created automatically
4. Registration IP and country tracked

### Purchase Flow
1. User selects product/plan
2. Order created in pending state
3. Stripe PaymentIntent generated
4. Payment processed via Stripe
5. Webhook confirms payment
6. Points awarded automatically
7. Order status updated to succeeded

### Subscription Management
1. User subscribes to plan
2. Stripe subscription created
3. Initial points awarded (for yearly plans)
4. Automatic point distribution:
   - Monthly: Points awarded on each renewal
   - Yearly: Points distributed monthly

### Points System Logic
1. **Earning Points**:
   - Purchase rewards (one-time points with expiration)
   - Subscription grants (monthly, no expiration)

2. **Spending Points**:
   - Subscription points used first
   - Then one-time points
   - Complete transaction history maintained

3. **Point Expiration**:
   - One-time points expire after configurable period
   - Automatic cleanup via cron jobs
   - Yearly subscription points distributed monthly

## 🔒 Security Features

- **Webhook Signature Verification** for Stripe events
- **SQL Injection Protection** via Prisma ORM
- **Password Hashing** with bcrypt
- **Session Management** via Better Auth
- **CSRF Protection** built into Next.js
- **Environment Variable** protection

## 🚀 Deployment

### Environment Setup
1. Set up PostgreSQL database
2. Configure all environment variables
3. Set up Stripe webhooks with production URL
4. Configure Google OAuth with production domains

### Database Migration
```bash
pnpm db:migrate
pnpm db:seed
```

### Build and Deploy
```bash
pnpm build
pnpm start
```

### Cron Jobs
Set up a cron job to run point expiration cleanup:
```bash
# Daily at 2 AM
0 2 * * * curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://yourdomain.com/api/cron/points
```

## 📝 Development

### Database Commands
```bash
pnpm db:generate     # Generate Prisma client
pnpm db:push         # Push schema changes
pnpm db:migrate      # Create and run migrations
pnpm db:seed         # Seed initial data
pnpm db:studio       # Open Prisma Studio
```

### Code Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Auth pages
│   └── globals.css     # Global styles
├── components/         # React components
├── lib/               # Utility libraries
│   ├── services/      # Business logic services
│   ├── utils/         # Helper functions
│   ├── auth.ts        # Better Auth config
│   ├── db.ts          # Database client
│   └── stripe.ts      # Stripe client
└── types/             # TypeScript types
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Stripe Webhook Issues**
   - Verify webhook secret
   - Check endpoint URL
   - Ensure proper event subscriptions

3. **Google OAuth Issues**
   - Check redirect URI configuration
   - Verify OAuth consent screen setup
   - Ensure proper scopes configured

4. **Points Not Distributing**
   - Check cron job setup
   - Verify subscription status
   - Review point transaction logs

### Logs and Debugging
- Check browser console for client-side errors
- Review server logs for API errors
- Use Prisma Studio to inspect database state
- Monitor Stripe dashboard for payment issues

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support, please create an issue in the repository or contact the development team.