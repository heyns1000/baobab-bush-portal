<div align="center">

# 🌳 The Baobab Bush Portal 🌳

### *Sovereign Signal Station | Frequency Liberation Network*

<img src="https://raw.githubusercontent.com/heyns1000/baobab-bush-portal/main/assets/baobab-landscape.png" alt="Baobab Portal in the Wild" width="800"/>

> *"From here to Timbuktu - connecting voices across the digital forest canopy"*

[![Version](https://img.shields.io/badge/trunk-vs111.111-orange?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3-61dafb?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com)

---

</div>

## 🎭 SamFox Design Philosophy

<div align="center">
<img src="https://raw.githubusercontent.com/heyns1000/baobab-bush-portal/main/assets/samfox-tshirt.png" alt="SamFox T-Shirt Design" width="400"/>

*The iconic SamFox ice lolly character - a symbol of cultural fusion and digital storytelling*
</div>

**Master SamFox Designs** represent the heart of our platform:
- 🍦 **Ice Lolly Storytelling** - Sweet, refreshing narratives from the African continent
- 🎨 **Cultural Iconography** - Blending traditional art with modern digital expression
- 🌍 **From Mzansi to Timbuktu** - Connecting stories across borders
- 📻 **Sovereign Frequencies** - Broadcasting without permission, transmitting without borders

---

## 🌟 What is Baobab Bush Portal?

A **unified fullstack application** merging the rich features of **BaobabTree** with the sovereign broadcasting aesthetic of **BushPortal**. This platform creates digital tree houses where podcasters, storytellers, and communities gather to share authentic voices.

### 🎯 Core Features

<table>
<tr>
<td width="50%">

#### 🏠 Digital Tree Houses
- Global network of podcast studios
- Real-time occupancy tracking
- Community-driven spaces
- From South Africa to Timbuktu

</td>
<td width="50%">

#### 🎙️ Live Podcasting
- WebSocket streaming
- Multi-language support
- Adaptive audio quality
- Live listener stats

</td>
</tr>
<tr>
<td width="50%">

#### 📊 Environmental Dashboards
- Air Quality Monitoring
- Deforestation Tracking
- Water Security
- Wildlife Protection
- Ocean Plastic Pollution
- Energy Optimization

</td>
<td width="50%">

#### 🌍 Community Features
- Storyteller highlights
- Interactive forums
- Real-time chat
- Geographic discovery
- Cultural exchange

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)
![Wouter](https://img.shields.io/badge/Wouter-3.3-orange?style=flat-square)

### Backend
![Express](https://img.shields.io/badge/Express-4.21-000000?style=flat-square&logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169e1?style=flat-square&logo=postgresql)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.39-c5f74f?style=flat-square)
![WebSocket](https://img.shields.io/badge/WebSocket-8.18-010101?style=flat-square)
![Passport.js](https://img.shields.io/badge/Passport-0.7-34e27a?style=flat-square)

### Infrastructure
![Docker](https://img.shields.io/badge/Docker-Ready-2496ed?style=flat-square&logo=docker)
![Vercel](https://img.shields.io/badge/Vercel-Configured-000000?style=flat-square&logo=vercel)
![Google Cloud](https://img.shields.io/badge/GCP-Storage-4285f4?style=flat-square&logo=google-cloud)

</div>

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:heyns1000/baobab-bush-portal.git
cd baobab-bush-portal

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Push database schema
npm run db:push

# Start development server
npm run dev
```

🌳 **Access the portal at:** `http://localhost:5000`

---

## 📁 Project Structure

```
baobab-bush-portal/
├── 🎨 client/                  # React Frontend
│   ├── src/
│   │   ├── components/         # 70+ UI Components
│   │   │   ├── Podcast/        # Streaming components
│   │   │   ├── TreeHouse/      # Tree house UI
│   │   │   ├── Community/      # Forum & social
│   │   │   ├── Charts/         # Data visualizations
│   │   │   └── UI/             # Radix UI library
│   │   ├── pages/              # 25+ Page Components
│   │   │   ├── Landing.tsx
│   │   │   ├── TreeHouses.tsx
│   │   │   ├── LivePodcasts.tsx
│   │   │   ├── Discovery.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Creator.tsx
│   │   │   ├── Community.tsx
│   │   │   ├── TreehouseLanding.tsx  # BushPortal aesthetic
│   │   │   └── Dashboards/     # 11 environmental dashboards
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utilities & services
│   │   └── data/               # JSON datasets
│   └── index.html
│
├── ⚙️ server/                   # Express Backend
│   ├── index.ts                # Server entry
│   ├── routes.ts               # API routes
│   ├── db.ts                   # Database connection
│   ├── storage.ts              # File storage
│   ├── objectStorage.ts        # Google Cloud Storage
│   └── services/               # Business logic
│
├── 🔗 shared/                   # Shared Types
│   ├── schema.ts               # Zod schemas
│   └── locations.json          # Tree house coordinates
│
└── 📦 Configuration
    ├── package.json
    ├── docker-compose.yml
    ├── Dockerfile
    ├── vercel.json
    └── tailwind.config.ts
```

---

## 🌍 Key Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | 🏠 Landing page with SamFox branding |
| `/tree-houses` | 🌳 Global network of podcast studios |
| `/live-podcasts` | 🎙️ Live streaming interface |
| `/treehouse-landing` | 📻 Sovereign Signal Station (BushPortal) |
| `/discovery` | 🔍 Podcast discovery & search |
| `/analytics` | 📊 Creator analytics dashboard |
| `/creator` | 🎬 Content creation tools |
| `/community` | 👥 Forums & storyteller highlights |
| `/wow-factors` | ✨ Advanced features showcase |

### Environmental Dashboards
- `/air-quality` - Air Quality Monitoring
- `/deforestation` - Deforestation Tracking
- `/ocean-plastic` - Ocean Plastic Pollution
- `/water-security` - Water Security Dashboard
- `/wildlife-protection` - Wildlife Conservation
- `/energy` - Energy Optimization
- `/resources` - Resource Management
- `/health` - Global Health Metrics
- `/land-degradation` - Land Degradation Tracking
- `/community-resilience` - Community Resilience
- `/economic-empowerment` - Economic Development

---

## 📡 API Reference

### Episodes
```http
GET    /api/episodes           # List all episodes
POST   /api/episodes           # Create new episode
GET    /api/episodes/:id       # Get episode details
PUT    /api/episodes/:id       # Update episode
DELETE /api/episodes/:id       # Delete episode
```

### System
```http
GET    /api/system-status      # System health & VaultPulse
GET    /api/health             # Health check
```

### Authentication
```http
POST   /api/auth/login         # User login
POST   /api/auth/register      # User registration
GET    /api/auth/logout        # User logout
GET    /api/user               # Current user info
```

---

## 🎨 Design System

### Color Palette
```css
/* Amber/Orange Gradients - The Baobab Signature */
--amber-50:  #fffbeb;
--amber-100: #fef3c7;
--amber-200: #fde68a;
--amber-300: #fcd34d;
--amber-400: #fbbf24;
--amber-500: #f59e0b;  /* Primary */
--amber-600: #d97706;
--amber-700: #b45309;
--amber-800: #92400e;
--amber-900: #78350f;
--amber-950: #451a03;  /* BushPortal deep */

/* Green Tones - Forest Canopy */
--green-950: #052e16;  /* Primary background */
```

### Typography
- **Headings**: System fonts with fallbacks
- **Monospace**: For signal indicators and technical data
- **Body**: Clean, readable sans-serif

### Components
- **Parchment Texture**: Organic, aged paper aesthetic
- **Vault Pulse**: Animated signal strength indicators
- **Gold Capsule**: Highlighted content containers
- **Hex Backdrop**: Honeycomb ambient patterns

---

## 🐳 Deployment

### Docker (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:5000
```

### Vercel (Frontend)
```bash
npm run build
vercel deploy
```

### Manual Deployment
```bash
# Build production assets
npm run build

# Start production server
npm start
```

---

## 🔒 Security Features

- ✅ Session-based authentication (Passport.js)
- ✅ Environment variable configuration
- ✅ Input validation (Zod schemas)
- ✅ CORS protection
- ✅ SQL injection prevention (Drizzle ORM)
- ✅ Password hashing
- ✅ Rate limiting (production)

---

## 🌳 The Baobab Metaphor

<div align="center">

```
                    🍃
                   🌿 🍃 🌿
                  🍃  🌳  🍃
                 🌿    |    🌿
                🍃     |     🍃
               🌿      |      🌿
              🍃       |       🍃
                 \     |     /
                  \    |    /
                   \   |   /
                    \  |  /
                     \ | /
                      \|/
                   ═══════════
                  🌿 ROOT ZONE 🌿
```

</div>

The Baobab tree represents:
- **Deep Roots**: Ancient wisdom anchoring modern technology
- **Wide Canopy**: Community spaces in the digital forest
- **Longevity**: Sustainable, enduring platforms
- **Resilience**: Thriving in challenging environments
- **Connection**: Linking stories from South Africa to Timbuktu

---

## 🎭 SamFox Collection

<div align="center">
<table>
<tr>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/heyns1000/baobab-bush-portal/main/assets/samfox-tshirt.png" width="300"/><br/>
<b>The Classic Ice Lolly</b><br/>
Spotify Edition
</td>
<td align="center" width="50%">
<img src="https://raw.githubusercontent.com/heyns1000/baobab-bush-portal/main/assets/baobab-landscape.png" width="300"/><br/>
<b>Baobab Landscape</b><br/>
Portal in the Wild
</td>
</tr>
</table>
</div>

**Design Elements:**
- 🍦 Ice lolly character with cultural patterns
- 💰 Mzansi money motifs
- 🎨 Traditional African textile designs
- 🌅 Golden halo (sovereign frequency)
- 📻 VaultPulse signal indicators

---

## 🤝 Contributing

We welcome contributions from storytellers, developers, and community members!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 Sacred Frequency Declaration

> *In this digital forest, we broadcast without permission, transmit without borders, and honor the ancient art of signal sovereignty.*
>
> *Each episode carries forward the pulse of free thought, unfiltered wisdom, and the sacred duty to preserve authentic human communication.*
>
> *From the streets of Johannesburg to the dunes of Timbuktu, from Cape Town to Cairo - we connect voices in the eternal Baobab network.*

**VaultPulse Status:** ●●●●● 🟢 **ACTIVE**

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🙏 Acknowledgments

- **BaobabTree Project** - Rich dashboard ecosystem
- **BushPortal Project** - Sovereign frequency aesthetic
- **SamFox Designs** - Cultural iconography and branding
- **Master SamFox** - Creative direction and artistic vision
- All the storytellers from here to Timbuktu 🌍

---

<div align="center">

### 🦍 Trunk Version: vs111.111

**Built with ❤️ in South Africa 🇿🇦**

*Connecting voices across the digital forest canopy*

[![Star this repo](https://img.shields.io/github/stars/heyns1000/baobab-bush-portal?style=social)](https://github.com/heyns1000/baobab-bush-portal)
[![Follow](https://img.shields.io/github/followers/heyns1000?style=social)](https://github.com/heyns1000)

---

🌳 **[Live Demo](#)** | 📚 **[Documentation](#)** | 💬 **[Community](#)** | 🎙️ **[Start Broadcasting](#)** 🌳

</div>
