# PokeDex Cloud UI

Next.js 14 frontend for PokeDex Cloud API - serverless Pokemon management platform.

## Architecture

**Framework:** Next.js 14 (App Router)  
**Runtime:** Node.js 20+  
**Styling:** Tailwind CSS  
**Authentication:** JWT (httpOnly cookies)  
**State Management:** React Context API  
**Deployment:** Vercel

## Setup

```bash
npm install
cp .env.example .env.local
# Configure NEXT_PUBLIC_API_URL
npm run dev
```

## Environment Variables

```bash
NEXT_PUBLIC_API_URL=https://your-api-gateway.execute-api.region.amazonaws.com/Prod
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Landing page
├── components/         # React components
├── context/           # Global state (AuthContext)
├── layout/            # Layout wrappers (Providers)
├── lib/               # Utilities and API client
├── middleware.ts      # Route protection
└── types/             # TypeScript definitions
```

## Authentication

JWT-based authentication with httpOnly cookies:

- Middleware intercepts protected routes
- Token stored securely in cookies (not localStorage)
- Automatic token refresh on API calls
- CSRF protection via SameSite attribute

## API Integration

Backend API endpoints:

```typescript
POST   /auth/login       # Authenticate user
POST   /auth/register    # Create account
GET    /pokemon          # List Pokemon (paginated)
GET    /pokemon/{id}     # Get Pokemon details
GET    /health           # Health check
```

## Development

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # TypeScript validation
```

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

Set environment variable in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`

### Docker

```bash
docker build -t pokedex-ui .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com pokedex-ui
```

## Security

- JWT tokens in httpOnly cookies (XSS protection)
- SameSite=Strict (CSRF protection)
- No sensitive data in client-side storage
- Environment variables for configuration
- Route-level authentication middleware

## Performance

- Server-side rendering (SSR)
- Automatic code splitting
- Image optimization
- Static asset caching
- API response memoization

## Related

- [Backend API](../pokedex-cloud-api)
- [Documentation](../../docs)
- [AWS Deployment Guide](../../docs/AWS_COSTS.md)
