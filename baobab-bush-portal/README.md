# 🌳 Baobab Bush Portal

A unified fullstack application merging **BaobabTree** and **BushPortal** - Sovereign Signal Station & Frequency Liberation Network.

## 🎯 Features

### Frontend
- **Digital Tree Houses**: Global network of podcast studios
- **Live Podcasts**: Real-time streaming with occupancy tracking
- **Community Features**: Storyteller highlights and interactive modals
- **Dashboards**: Air Quality, Deforestation, Energy, Water Security, Wildlife Protection
- **Analytics & Discovery**: Podcast analytics and discovery interface
- **Creator Tools**: Podcast creation and management
- **Treehouse Landing**: Sovereign frequency broadcasting interface

### Backend
- **Express.js**: Modern REST API
- **WebSocket Support**: Real-time communication
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session management
- **File Storage**: Google Cloud Storage integration
- **OpenAI Integration**: AI-powered features

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Build for Production

```bash
# Build both frontend and backend
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
baobab-bush-portal/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utilities
│   │   ├── data/        # JSON data files
│   │   └── types/       # TypeScript types
│   └── index.html       # Entry HTML
│
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── db.ts            # Database connection
│   ├── storage.ts       # File storage
│   ├── objectStorage.ts # Cloud storage
│   └── services/        # Business logic
│
├── shared/              # Shared types and utilities
│
└── docs/                # Documentation
```

## 🌍 Key Pages

- `/` - Landing page
- `/tree-houses` - Digital tree houses network
- `/live-podcasts` - Live streaming podcasts
- `/discovery` - Podcast discovery
- `/community` - Community features
- `/creator` - Creator dashboard
- `/analytics` - Analytics dashboard
- `/treehouse-landing` - Sovereign signal station

## 🛠️ Technology Stack

### Frontend
- React 18.3
- TypeScript
- Tailwind CSS
- Vite
- Wouter (routing)
- TanStack Query
- Radix UI components
- Framer Motion
- Chart.js & Recharts

### Backend
- Express 4.21
- TypeScript
- Drizzle ORM
- PostgreSQL
- Passport.js
- WebSocket (ws)
- OpenAI integration
- Google Cloud Storage

## 🎨 Design Philosophy

The Baobab Bush Portal combines:
- **BaobabTree's** rich dashboard and community features
- **BushPortal's** sovereign frequency broadcasting aesthetic
- Unified amber/orange gradient design language
- Tree house metaphor for digital community spaces

## 📡 API Endpoints

### Episodes
- `GET /api/episodes` - List all episodes
- `POST /api/episodes` - Create new episode
- `GET /api/episodes/:id` - Get episode details
- `PUT /api/episodes/:id` - Update episode
- `DELETE /api/episodes/:id` - Delete episode

### System
- `GET /api/system-status` - Get system status
- `GET /api/health` - Health check

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/logout` - User logout
- `GET /api/user` - Get current user

## 🔒 Security

- Session-based authentication
- Environment variable configuration
- Input validation with Zod
- CORS protection
- SQL injection prevention via ORM

## 🚢 Deployment

### Vercel (Recommended for Frontend)
```bash
npm run build
vercel deploy
```

### Railway/Render (Recommended for Backend)
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```bash
docker build -t baobab-bush-portal .
docker run -p 5000:5000 baobab-bush-portal
```

## 📄 License

MIT

## 🌳 About

From here to Timbuktu - connecting voices across the digital forest canopy.

**Trunk Version**: vs111.111 🦍
