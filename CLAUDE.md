# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with integrated user management, Stripe payments, and points system built with Better Auth and Prisma. The project uses TypeScript throughout and includes internationalization (i18n) support for English, Chinese, and Japanese.

## Key Technologies

- **Framework**: Next.js 15 with App Router
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Styling**: Tailwind CSS (v4)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Internationalization**: i18next with next-i18n-router

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production (includes Prisma generation)
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint

# Database commands
pnpm db:generate     # Generate Prisma client
pnpm db:push         # Push schema to database
pnpm db:migrate      # Run migrations
pnpm db:seed         # Seed database with initial data
pnpm db:studio       # Open Prisma Studio GUI
```

## Project Architecture

### Directory Structure

- **`src/app/`**: Next.js App Router pages
  - `[locale]/`: Internationalized routes (en, zh, ja)
  - `api/`: API endpoints for authentication, payments, points, etc.
- **`src/components/`**: React components
- **`src/lib/`**: Core utilities and services
  - `auth.ts`: Better Auth configuration
  - `db.ts`: Prisma database client
  - `stripe.ts`: Stripe client configuration
  - `services/`: Business logic services
- **`prisma/`**: Database schema and migrations
- **`translations/`**: i18n translation files for each locale

### Key Architectural Patterns

1. **Internationalization**: All user-facing routes are nested under `[locale]` dynamic segment
2. **Authentication**: Better Auth handles sessions, OAuth (Google), and user management
3. **Database Access**: All database operations go through Prisma ORM
4. **API Design**: RESTful endpoints under `/api` following Next.js conventions
5. **Payment Processing**: Stripe webhooks handle asynchronous payment events

## Database Schema

The application uses PostgreSQL with these main entities:
- `User`: Core user accounts with auth data
- `Session`: Better Auth session management
- `Account`: OAuth account linking
- `Price`: Product pricing with Stripe integration
- `Order`: Purchase orders and transactions
- `Subscription`: Recurring subscription management
- `PointTransaction`: Complete points transaction history
- `AppSetting`: System configuration

## Business Logic Overview

### Points System
- **Two types**: One-time points (with expiration) and subscription points (no expiration)
- **Smart deduction**: Subscription points used first when spending
- **Yearly subscriptions**: Points distributed monthly automatically

### Payment Flow
1. Order created in pending state
2. Stripe PaymentIntent generated
3. Webhook confirms payment
4. Points awarded automatically
5. Order status updated

## Testing Approach

The project currently does not have a test suite configured. When implementing tests:
1. Check for test framework in package.json before adding
2. Follow existing patterns if tests exist
3. Ask user for preferred testing approach if needed

## Important Considerations

1. **MCP Integration**: The project includes MCP (Model Context Protocol) feedback rules in `.CLAUDE.md`
2. **Stripe Webhooks**: Always verify webhook signatures for security
3. **Environment Variables**: Never commit sensitive keys; use `.env` files
4. **Database Migrations**: Always use `pnpm db:migrate` for schema changes in production
5. **Internationalization**: When adding new UI text, update all three translation files (en, zh, ja)

## Common Development Tasks

### Adding a New API Endpoint
1. Create route file in `src/app/api/[endpoint]/route.ts`
2. Use Better Auth's session verification for protected routes
3. Follow existing error handling patterns

### Adding New UI Components
1. Check existing components for similar patterns
2. Use translation keys for all user-facing text
3. Follow Tailwind CSS v4 syntax

### Database Schema Changes
1. Update `prisma/schema.prisma`
2. Run `pnpm db:generate` to update client
3. Use `pnpm db:push` for development or `pnpm db:migrate` for production