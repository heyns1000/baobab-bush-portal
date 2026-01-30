# CLAUDE.md - AI Assistant Guide for Baobab Bush Portal

## Project Overview

**Baobab Bush Portal** is a fullstack web application that combines digital podcasting infrastructure with cultural storytelling traditions and environmental monitoring dashboards. It features a network of "digital tree houses" for podcast streaming, community engagement, and real-time environmental data visualization.

- **Owner**: Heyns Schoeman / CodeNest / Fruitful Holdings (Pty) Ltd
- **Location**: Pretoria, South Africa
- **License**: MIT

## Tech Stack

### Frontend
- **React 18.3** with TypeScript 5.6+
- **Vite** for build tooling
- **Tailwind CSS 3.4** with CSS variables for theming
- **shadcn/ui** (New York style) built on Radix UI primitives
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Chart.js** for data visualizations

### Backend
- **Express.js** with TypeScript
- **PostgreSQL 15+** database
- **Drizzle ORM** for type-safe database operations
- **Zod** for runtime validation
- **Passport.js** for authentication (Replit Auth integration)

### Infrastructure
- Docker & Docker Compose support
- Vercel deployment configuration
- Google Cloud Storage for object storage

## Directory Structure

```
baobab-bush-portal/
├── client/                     # React Frontend
│   ├── index.html              # HTML entry point
│   └── src/
│       ├── App.tsx             # Root component with routing
│       ├── main.tsx            # React entry point
│       ├── components/
│       │   ├── Charts/         # Chart.js visualizations (Bar, Line, Doughnut)
│       │   ├── Community/      # Forum and storyteller components
│       │   ├── Dashboard/      # Metric cards, alerts, data status
│       │   ├── Layout/         # Header, Sidebar, OfflineIndicator
│       │   ├── Map/            # Geographic marker components
│       │   ├── Podcast/        # Streaming preview cards
│       │   ├── PWA/            # Install prompt for PWA
│       │   ├── Streaming/      # Adaptive media player
│       │   ├── TreeHouse/      # Tree house modal and occupancy tracker
│       │   ├── UI/             # shadcn/ui components (40+ primitives)
│       │   └── WowFactors/     # AI voice, AR, biometric, translation overlays
│       ├── hooks/
│       │   ├── useAuth.ts      # Authentication state hook
│       │   ├── useTheme.tsx    # Theme provider and hook
│       │   ├── useRealTimeData.tsx
│       │   ├── useOfflineSync.ts
│       │   └── use-toast.ts    # Toast notifications
│       ├── lib/
│       │   ├── queryClient.ts  # TanStack Query configuration
│       │   ├── apiService.ts   # API helper functions
│       │   ├── authUtils.ts    # Auth utilities
│       │   ├── exportService.ts
│       │   └── utils.ts        # cn() and general utilities
│       ├── pages/              # 25+ page components
│       │   ├── Landing.tsx     # Home page
│       │   ├── Dashboard.tsx   # Admin dashboard
│       │   ├── BushPortalDashboard.tsx
│       │   ├── TreeHouses.tsx  # Global studio network
│       │   ├── LivePodcasts.tsx
│       │   ├── Discovery.tsx   # Podcast discovery
│       │   ├── Analytics.tsx   # Creator stats
│       │   ├── Creator.tsx     # Production tools
│       │   ├── Community.tsx   # Forums
│       │   ├── WowFactors.tsx  # Advanced features showcase
│       │   ├── Login.tsx / Register.tsx
│       │   └── *Dashboard.tsx  # 11 environmental dashboards
│       └── data/               # Static JSON datasets
│
├── server/                     # Express Backend
│   ├── index.ts                # Server entry point (port 5000)
│   ├── routes.ts               # API route definitions
│   ├── db.ts                   # PostgreSQL connection via Drizzle
│   ├── storage.ts              # DatabaseStorage class (IStorage interface)
│   ├── objectStorage.ts        # Google Cloud Storage integration
│   ├── objectAcl.ts            # Access control for objects
│   ├── replitAuth.ts           # Replit authentication setup
│   ├── vite.ts                 # Vite dev server integration
│   └── services/
│       ├── dataService.ts      # Data sync and report generation
│       └── openaiService.ts    # AI service integration
│
├── shared/                     # Shared between client and server
│   ├── schema.ts               # Drizzle ORM schema + Zod validation
│   └── locations.json          # GeoJSON tree house coordinates
│
├── src/                        # AI Portal CLI Tools
│   ├── index.ts                # Main CLI entry
│   ├── baobab-portal.ts        # Interactive AI assistant
│   ├── code-reviewer.ts        # AI code review tool
│   ├── doc-generator.ts        # Documentation generator
│   ├── commit-helper.ts        # Commit message generator
│   ├── config.ts               # Portal configuration
│   └── types.ts                # TypeScript definitions
│
├── scripts/                    # Utility scripts
├── docs/                       # Documentation
├── widgets/                    # Widget configurations
│
└── Configuration Files
    ├── package.json            # Dependencies and scripts
    ├── tsconfig.json           # TypeScript config (strict mode)
    ├── tsconfig.ai.json        # AI tools TypeScript config
    ├── vite.config.ts          # Vite build configuration
    ├── tailwind.config.ts      # Tailwind with CSS variables
    ├── drizzle.config.ts       # Database migration config
    ├── components.json         # shadcn/ui configuration
    ├── postcss.config.js       # PostCSS plugins
    ├── .stylelintrc.json       # Stylelint rules
    ├── vercel.json             # Vercel deployment
    └── docker-compose.yml      # Container orchestration
```

## Key Development Commands

```bash
# Install dependencies
npm install
# or
yarn install

# Development server (runs on port 5000)
npm run dev

# Build for production
npm run build

# AI Portal commands
npm run start       # Initialize portal with AI
npm run chat        # Interactive AI assistant
npm run review      # AI code review
npm run docs        # Generate documentation
npm run commit      # AI commit message helper
```

## Code Conventions

### TypeScript
- **Strict mode enabled** - all code must be type-safe
- Use path aliases: `@/*` for client/src, `@shared/*` for shared
- Prefer interfaces over type aliases for object shapes
- Export types alongside implementations in shared/schema.ts

### React Components
- Functional components with hooks only
- Use TanStack Query for server state (not local state for API data)
- Components in PascalCase, files match component names
- Co-locate related components in feature folders

### Styling
- Tailwind CSS with CSS variables for theming
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow shadcn/ui patterns for new UI components
- Color palette based on amber/earth tones (Baobab theme)

### API Patterns
- All API routes prefixed with `/api/`
- Use Zod schemas for request validation
- Authentication via `isAuthenticated` middleware
- Return JSON with consistent error format: `{ message: string }`

### Database
- Drizzle ORM with PostgreSQL
- Schema defined in `shared/schema.ts`
- Use `createInsertSchema` from drizzle-zod for validation
- Migrations output to `./migrations/`

## Authentication

The app uses Replit Auth via Passport.js:
- Session-based authentication
- `isAuthenticated` middleware protects routes
- User data accessed via `req.user.claims.sub`
- Client uses `useAuth()` hook from `@/hooks/useAuth.ts`

Protected routes redirect to Landing page when not authenticated.

## API Routes

### Authentication
- `GET /api/auth/user` - Get current user (protected)
- `PATCH /api/user/preferences` - Update user preferences

### Environmental Data
- `GET /api/environmental-data` - Query environmental data
- `POST /api/environmental-data/sync` - Trigger data sync
- `GET /api/real-time/latest` - Get latest readings

### Alerts
- `GET /api/alerts` - Get user alerts
- `PATCH /api/alerts/:id/read` - Mark alert as read
- `GET /api/custom-alerts` - Get custom alert rules
- `POST /api/custom-alerts` - Create custom alert
- `DELETE /api/custom-alerts/:id` - Delete custom alert

### Reports
- `GET /api/reports` - List user reports
- `POST /api/reports` - Create new report
- `GET /api/reports/:id/download` - Download report

### System
- `GET /api/data-sources/status` - Data source health status

## Database Schema (Key Tables)

```typescript
// Episodes - Podcast content
episodes: {
  id, title, description, fileName, fileSize,
  duration, status, objectPath, frequency,
  createdAt, updatedAt
}

// Episode Stats - Playback metrics
episodeStats: {
  id, episodeId, plays, downloads,
  signalStrength, lastPlayed
}

// Treaty Logs - System events
treatyLogs: {
  id, event, description, vaultPulse,
  episodeId, timestamp
}

// System Status - Global system state
systemStatus: {
  id, sovereignStatus, feedDrift, lastDrop,
  vaultPulse, activePlays, downloadsPerHour,
  signalStrength, listeners, uptime, connections
}
```

## Environment Variables

Required environment variables (store in `.env`):
```
DATABASE_URL=postgresql://...
ANTHROPIC_API_KEY=...           # For AI features
SESSION_SECRET=...              # Express session
PORT=5000                       # Server port (default)
```

## Testing

Currently minimal test setup:
```bash
npm run test   # Outputs "Tests coming soon"
```

When adding tests:
- Use Jest or Vitest for unit tests
- Use React Testing Library for component tests
- Test API routes with supertest

## Deployment

### Docker
```bash
docker-compose up --build
```

### Vercel
- Frontend builds to `dist/public`
- Configure via `vercel.json`
- Backend requires separate deployment (Railway recommended)

### Manual
```bash
npm run build
pm2 start npm --name "baobab-portal" -- start
```

## Important Patterns

### Adding New Pages
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx` Router component
3. Wrap in auth check if protected

### Adding API Endpoints
1. Add route in `server/routes.ts`
2. Create Zod schema in `shared/schema.ts` if needed
3. Implement storage method in `server/storage.ts`

### Adding UI Components
1. Use `npx shadcn-ui add <component>` for new primitives
2. Components go to `client/src/components/UI/`
3. Follow existing naming conventions (lowercase with dashes)

### State Management
- Server state: TanStack Query (`useQuery`, `useMutation`)
- UI state: React useState/useReducer
- Theme: ThemeProvider context
- Auth: useAuth hook

## Common Gotchas

1. **Port 5000 only** - Server must run on port 5000 (firewall restrictions)
2. **Path aliases** - Use `@/` not relative paths in client code
3. **Auth redirect** - Unauthenticated users on protected routes see Landing page
4. **Drizzle migrations** - Run `npm run db:push` after schema changes
5. **CSS variables** - Theme colors defined as CSS vars, not Tailwind classes directly

## CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/ci.yml`):
- **build** - TypeScript check and Vite build
- **lint** - ESLint (continues on error)
- **security** - npm audit
- **deploy-preview** - Notification on main branch push

## Contributing

1. Create feature branch: `git checkout -b feature/AmazingStory`
2. Follow TypeScript strict mode
3. Use conventional commits
4. Ensure build passes before PR
5. Add tests for new functionality

## Quick Reference

| Task | Command/Location |
|------|------------------|
| Start dev server | `npm run dev` |
| Add shadcn component | `npx shadcn-ui add <name>` |
| Database schema | `shared/schema.ts` |
| API routes | `server/routes.ts` |
| Client routing | `client/src/App.tsx` |
| Environment vars | `.env` (not committed) |
| Build output | `dist/public` |
