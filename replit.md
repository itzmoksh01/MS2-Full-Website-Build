# MS2 Entertainment Website

## Overview

This is a single-page marketing website for **MS2 Entertainment**, a media production and influencer management company. The site features a dark-themed design with peach (#F3A28F) and mint (#8ACAC1) accent colors, smooth scroll animations, a video hero section, service showcases, and a contact form that submits inquiries to a PostgreSQL database.

The project follows a monorepo structure with a React frontend (Vite), an Express backend, and a shared schema/routes layer. It uses Drizzle ORM with PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Directory Structure
- `client/` — React frontend (Vite-based SPA)
- `server/` — Express backend API
- `shared/` — Shared types, schemas, and route definitions used by both client and server
- `migrations/` — Drizzle database migrations
- `attached_assets/` — Static assets like logos and partner images

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite with HMR support via custom dev server integration
- **Routing**: Wouter (lightweight client-side router) — single page app with hash-based section navigation
- **Styling**: Tailwind CSS with CSS variables for theming, shadcn/ui component library (new-york style)
- **Animations**: Framer Motion for scroll-triggered animations and reveal effects
- **State/Data**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Icons**: Lucide React
- **Fonts**: Montserrat (body), Playfair Display (headings) via Google Fonts

### Backend Architecture
- **Runtime**: Node.js with TypeScript (tsx for dev, esbuild for production)
- **Framework**: Express 5
- **API Pattern**: REST endpoints defined in `shared/routes.ts` with Zod schemas for input validation and response typing. Both client and server import from the same route definitions ensuring type safety.
- **Database**: PostgreSQL via `node-postgres` (pg) pool
- **ORM**: Drizzle ORM with `drizzle-zod` for schema-to-validation bridging
- **Dev Server**: Vite dev server middleware is integrated into Express during development; in production, static files are served from `dist/public`

### API Routes
- `POST /api/contact` — Creates a contact message. Validates input with Zod schema, stores in `contact_messages` table, returns the created record.

### Database Schema
Single table defined in `shared/schema.ts`:
- **contact_messages**: `id` (serial PK), `name` (text), `email` (text), `message` (text), `createdAt` (timestamp, auto)

### Storage Layer
- `server/storage.ts` implements `IStorage` interface with `DatabaseStorage` class
- This abstraction allows swapping storage implementations if needed

### Build Process
- `script/build.ts` handles production builds: Vite for client, esbuild for server
- Server dependencies are selectively bundled (allowlist) to reduce cold start times
- Output goes to `dist/` (server) and `dist/public/` (client)

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets` → `attached_assets/`

## External Dependencies

### Database
- **PostgreSQL** — Required. Connection via `DATABASE_URL` environment variable. Used with Drizzle ORM.
- **Schema management**: `drizzle-kit push` for applying schema changes (no migration files needed for dev)

### Key NPM Packages
- **drizzle-orm** + **drizzle-zod** — ORM and schema validation bridge
- **express** v5 — HTTP server
- **@tanstack/react-query** — Client-side data fetching and caching
- **framer-motion** — Scroll animations
- **shadcn/ui** (Radix primitives) — Full component library
- **wouter** — Client-side routing
- **zod** — Runtime validation shared between client and server
- **connect-pg-simple** — PostgreSQL session store (available but not actively used for sessions currently)

### External Services
- **Google Fonts** — Montserrat and Playfair Display font families loaded via CDN
- No other third-party API integrations currently configured

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Error overlay in development
- `@replit/vite-plugin-cartographer` and `@replit/vite-plugin-dev-banner` — Dev-only Replit integrations