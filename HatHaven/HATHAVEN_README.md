# Premium Hat Store - E-commerce Application

## Overview

This is a premium e-commerce web application for a luxury hat store called "Artisan Hat Co." The application showcases handcrafted hats with an emphasis on timeless elegance, craftsmanship, and product excellence. The design draws inspiration from luxury e-commerce brands like Hermès and Burberry, featuring sophisticated typography, spacious layouts, and product-focused presentation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for client-side routing (lightweight alternative to React Router)

**UI Component Strategy**
- shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming support (light/dark mode ready)
- Custom typography system using Google Fonts (Playfair Display for headings, Inter for body text)

**State Management**
- TanStack Query (React Query) for server state management, data fetching, and caching
- React hooks for local component state
- No global state management library - relying on React Query for data synchronization

**Design System**
- Component-based architecture with reusable UI components in `/client/src/components/ui`
- Custom design guidelines documented in `design_guidelines.md`
- Responsive design with mobile-first approach
- Consistent spacing using Tailwind's spacing scale (4, 8, 12, 16, 24)

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- TypeScript for type safety across the entire backend
- Custom middleware for logging and JSON parsing
- Development mode with Vite middleware integration for SSR-like development experience

**API Design**
- RESTful API structure with endpoints under `/api` prefix
- Products API: GET `/api/products` (list all), GET `/api/products/:id` (single product)
- Newsletter API: POST `/api/newsletter/subscribe`
- Consistent error handling and response format
- Zod schema validation for request bodies

**Data Access Pattern**
- Storage abstraction layer (`IStorage` interface) separating business logic from data persistence
- In-memory storage implementation (`MemStorage`) for development/demo purposes
- Pre-seeded sample product data for immediate functionality

### Data Storage Solutions

**Database Technology**
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Schema definition using Drizzle's type-safe schema builder
- Migration support via drizzle-kit

**Database Schema**
- `users` table: User authentication (id, username, password)
- `products` table: Product catalog (id, name, price, image, material, category)
- `newsletter_subscriptions` table: Email subscriptions (id, email, subscribedAt)
- All tables use UUID primary keys with auto-generation

**Data Validation**
- Drizzle-Zod integration for automatic schema-to-validator generation
- Custom Zod validators for complex validation rules (e.g., email format)
- Type inference from database schema to ensure type consistency

### Authentication and Authorization

**Current Implementation**
- User schema exists but authentication is not currently implemented
- Session management dependency installed (`connect-pg-simple`) but not configured
- Foundation prepared for future authentication implementation

**Planned Architecture**
- Session-based authentication using Express sessions
- PostgreSQL session store for production scalability
- Password hashing (bcrypt/scrypt) would be needed before implementation

### Component Architecture

**Page Components**
- Single-page application with homepage (`/client/src/pages/Home.tsx`)
- 404 page for unmatched routes

**Feature Components**
- `Header`: Sticky navigation with logo, menu links, cart/search icons
- `HeroSection`: Full-screen hero with background image and CTA
- `ProductGallery`: Filterable product grid with material filters
- `ProductCard`: Individual product display with hover effects
- `BrandHeritage`: Brand story section with image and narrative
- `CraftsmanshipSection`: Feature showcase with icon cards
- `Footer`: Newsletter signup, social links, and site information

**Shared Utilities**
- Image mapping system for product images (`/client/src/lib/imageMap.ts`)
- API request utilities with error handling
- Tailwind utility function (`cn`) for conditional class merging

## External Dependencies

### Core Framework Dependencies
- **React 18**: UI library
- **Express**: Backend HTTP server
- **TypeScript**: Type system for both frontend and backend
- **Vite**: Build tool and development server

### UI Component Libraries
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **shadcn/ui**: Pre-built component implementations
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework

### Data Management
- **TanStack Query**: Server state management and data fetching
- **Drizzle ORM**: Type-safe SQL query builder
- **@neondatabase/serverless**: PostgreSQL database driver for serverless environments
- **Zod**: Schema validation and type inference

### Form Handling
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Validation resolver for React Hook Form

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production backend
- **PostCSS & Autoprefixer**: CSS processing

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator

### Asset Management
- Product images stored in `/attached_assets/generated_images/`
- Image references mapped through centralized image map
- Static assets served through Vite in development, Express in production