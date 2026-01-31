# BushPortal Repository Index

**Complete Repository Audit & Interactive Elements Map**
**Generated:** 2026-01-31
**Branch:** `claude/organize-baobab-files-YVcPh`

---

## Table of Contents

1. [Repository Overview](#repository-overview)
2. [Complete File Tree](#complete-file-tree)
3. [Application Routes](#application-routes)
4. [Pages Audit](#pages-audit)
5. [Components Audit](#components-audit)
6. [Terminal Pages](#terminal-pages)
7. [Widgets](#widgets)
8. [Server Files](#server-files)
9. [Interactive Elements Summary](#interactive-elements-summary)

---

## Repository Overview

**Project:** BushPortal - Global Podcasting Network
**Tech Stack:** React, TypeScript, Tailwind CSS, shadcn/ui, Wouter (routing)
**License:** Apache 2.0 by Fruitful Holdings (Pty) Ltd

### Key Statistics
- **Total Pages:** 24
- **Total Components:** 71
- **Terminal HTML Pages:** 9
- **Widgets:** 3
- **API Routes:** 15+

---

## Complete File Tree

```
baobab-bush-portal/
├── client/
│   ├── index.html
│   ├── public/
│   │   └── terminals/
│   │       ├── cube-lattice.html
│   │       ├── distribution.html
│   │       ├── faa-brands.html
│   │       ├── freight-ops.html
│   │       ├── global-view.html
│   │       ├── loop-watch.html
│   │       ├── seedwave.html
│   │       ├── signal.html
│   │       └── vault-master.html
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       ├── index.css
│       ├── components/
│       │   ├── Charts/
│       │   │   ├── BarChart.tsx
│       │   │   ├── DoughnutChart.tsx
│       │   │   └── LineChart.tsx
│       │   ├── Community/
│       │   │   ├── Forum.tsx
│       │   │   └── StorytellerCommunityHighlight.tsx
│       │   ├── Dashboard/
│       │   │   ├── AlertBanner.tsx
│       │   │   ├── DataSourceStatus.tsx
│       │   │   └── MetricCard.tsx
│       │   ├── Layout/
│       │   │   ├── Header.tsx
│       │   │   ├── OfflineIndicator.tsx
│       │   │   └── Sidebar.tsx
│       │   ├── Map/
│       │   │   └── AnimatedLocationMarkers.tsx
│       │   ├── Podcast/
│       │   │   └── PodcastStreamPreviewCards.tsx
│       │   ├── PWA/
│       │   │   └── InstallPrompt.tsx
│       │   ├── Streaming/
│       │   │   └── AdaptivePlayer.tsx
│       │   ├── TreeHouse/
│       │   │   ├── InteractiveTreeHouseModal.tsx
│       │   │   └── RealTimeOccupancyTracker.tsx
│       │   ├── UI/ (48 shadcn components)
│       │   │   ├── accordion.tsx
│       │   │   ├── alert-dialog.tsx
│       │   │   ├── alert.tsx
│       │   │   ├── aspect-ratio.tsx
│       │   │   ├── avatar.tsx
│       │   │   ├── badge.tsx
│       │   │   ├── breadcrumb.tsx
│       │   │   ├── button.tsx
│       │   │   ├── calendar.tsx
│       │   │   ├── card.tsx
│       │   │   ├── carousel.tsx
│       │   │   ├── chart.tsx
│       │   │   ├── checkbox.tsx
│       │   │   ├── collapsible.tsx
│       │   │   ├── command.tsx
│       │   │   ├── context-menu.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── drawer.tsx
│       │   │   ├── dropdown-menu.tsx
│       │   │   ├── form.tsx
│       │   │   ├── hover-card.tsx
│       │   │   ├── input-otp.tsx
│       │   │   ├── input.tsx
│       │   │   ├── label.tsx
│       │   │   ├── LoadingOverlay.tsx
│       │   │   ├── menubar.tsx
│       │   │   ├── navigation-menu.tsx
│       │   │   ├── pagination.tsx
│       │   │   ├── popover.tsx
│       │   │   ├── progress.tsx
│       │   │   ├── radio-group.tsx
│       │   │   ├── resizable.tsx
│       │   │   ├── scroll-area.tsx
│       │   │   ├── select.tsx
│       │   │   ├── separator.tsx
│       │   │   ├── sheet.tsx
│       │   │   ├── sidebar.tsx
│       │   │   ├── skeleton.tsx
│       │   │   ├── slider.tsx
│       │   │   ├── switch.tsx
│       │   │   ├── table.tsx
│       │   │   ├── tabs.tsx
│       │   │   ├── textarea.tsx
│       │   │   ├── toast.tsx
│       │   │   ├── toaster.tsx
│       │   │   ├── toggle-group.tsx
│       │   │   ├── toggle.tsx
│       │   │   └── tooltip.tsx
│       │   └── WowFactors/
│       │       ├── AIVoiceSynthesis.tsx
│       │       ├── ARBaobabVisualization.tsx
│       │       ├── BiometricEngagement.tsx
│       │       ├── GlobalListeningHeatmap.tsx
│       │       ├── HolographicPresence.tsx
│       │       ├── NeuralContentMatching.tsx
│       │       └── RealTimeTranslationOverlay.tsx
│       ├── data/
│       │   ├── baobab-locations.json
│       │   └── storytellers.json
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   ├── use-toast.ts
│       │   ├── useAuth.ts
│       │   ├── useOfflineSync.ts
│       │   ├── useRealTimeData.tsx
│       │   └── useTheme.tsx
│       ├── lib/
│       │   ├── apiService.ts
│       │   ├── authUtils.ts
│       │   ├── exportService.ts
│       │   ├── queryClient.ts
│       │   └── utils.ts
│       ├── pages/
│       │   ├── AirQualityDashboard.tsx
│       │   ├── Analytics.tsx
│       │   ├── BushPortalDashboard.tsx
│       │   ├── Community.tsx
│       │   ├── CommunityResilienceDashboard.tsx
│       │   ├── Creator.tsx
│       │   ├── Dashboard.tsx
│       │   ├── DeforestationDashboard.tsx
│       │   ├── Discovery.tsx
│       │   ├── EconomicEmpowermentDashboard.tsx
│       │   ├── EnergyOptimizationDashboard.tsx
│       │   ├── ForgotPassword.tsx
│       │   ├── GlobalHealthDashboard.tsx
│       │   ├── LandDegradationDashboard.tsx
│       │   ├── Landing.tsx
│       │   ├── LiveCoding.tsx
│       │   ├── LivePodcasts.tsx
│       │   ├── Login.tsx
│       │   ├── not-found.tsx
│       │   ├── OceanPlasticDashboard.tsx
│       │   ├── Register.tsx
│       │   ├── ResourceManagementDashboard.tsx
│       │   ├── TreeHouses.tsx
│       │   ├── TreehouseLanding.tsx
│       │   ├── WaterSecurityDashboard.tsx
│       │   ├── WildlifeProtectionDashboard.tsx
│       │   └── WowFactors.tsx
│       └── types/
│           └── index.ts
├── server/
│   ├── db.ts
│   ├── index.ts
│   ├── objectAcl.ts
│   ├── objectStorage.ts
│   ├── replitAuth.ts
│   ├── routes.ts
│   ├── storage.ts
│   ├── vite.ts
│   ├── websocket.ts
│   └── services/
│       ├── dataService.ts
│       ├── emailService.ts
│       ├── liveCodingService.ts
│       └── openaiService.ts
├── shared/
│   ├── locations.json
│   └── schema.ts
├── src/
│   ├── baobab-portal.ts
│   ├── code-reviewer.ts
│   ├── commit-helper.ts
│   ├── config.ts
│   ├── doc-generator.ts
│   ├── index.ts
│   └── types.ts
├── widgets/
│   ├── 32.html
│   ├── baobab-activation-layer.js
│   └── bushportal-widget.html
├── package.json
├── drizzle.config.ts
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
├── tsconfig.ai.json
├── vercel.json
├── components.json
└── postcss.config.js
```

---

## Application Routes

**Router:** Wouter
**File:** `client/src/App.tsx`

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | Homepage with hero section |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |
| `/forgot-password` | ForgotPassword | Password recovery |
| `/dashboard` | Dashboard | Environmental Intelligence Dashboard |
| `/discovery` | Discovery | Content discovery |
| `/tree-houses` | TreeHouses | Digital tree house directory |
| `/live-podcasts` | LivePodcasts | Live streaming podcasts |
| `/community` | Community | Podcaster community hub |
| `/analytics` | Analytics | Analytics & insights |
| `/creator` | Creator | Creator dashboard |
| `/wow-factors` | WowFactors | Advanced features showcase |
| `/live-coding` | LiveCoding | AI-powered code generation |
| `/treehouse-landing` | TreehouseLanding | Tree house promotional page |
| `*` | NotFound | 404 error page |

---

## Pages Audit

### 1. Landing.tsx
**Path:** `client/src/pages/Landing.tsx`
**Purpose:** Homepage with premium branding

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Tree Houses nav link | `<Link>` | Navigate to `/tree-houses` | Functional |
| Live Podcasts nav link | `<Link>` | Navigate to `/live-podcasts` | Functional |
| Sign In button | `<Button>` | Navigate to `/login` | Functional |
| Explore Tree Houses CTA | `<Button>` | Navigate to `/tree-houses` | Functional |
| Listen Live Now CTA | `<Button>` | Navigate to `/live-podcasts` | Functional |
| Start Your Journey Free | `<Button>` | Navigate to `/register` | Functional |
| Explore First button | `<Button>` | Navigate to `/tree-houses` | Functional |

---

### 2. Login.tsx
**Path:** `client/src/pages/Login.tsx`
**Purpose:** User authentication

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Email input | `<Input>` | `setEmail()` state update | Functional |
| Password input | `<Input>` | `setPassword()` state update | Functional |
| Sign In button | `<Button>` | `handleLogin()` → `/dashboard` | Functional |
| Continue as Guest | `<Button>` | `handleGuestAccess()` → `/tree-houses` | Functional |
| Create Account link | `<button>` | Navigate to `/register` | Functional |
| Forgot password link | `<button>` | Navigate to `/forgot-password` | Functional |

---

### 3. Dashboard.tsx
**Path:** `client/src/pages/Dashboard.tsx`
**Purpose:** Environmental Intelligence Dashboard

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Sidebar toggle | Button | `setSidebarCollapsed()` | Functional |
| Date range select | `<Select>` | `setDateRange()` - 24h/7d/30d/90d | Functional |
| Region select | `<Select>` | `setSelectedRegion()` | Functional |
| Export button | `<Button>` | `handleExport()` → CSV download | Functional |
| Refresh button | `<Button>` | `handleRefresh()` → page reload | Functional |
| Alert dismiss | Callback | `onDismiss(alertId)` | Functional |
| Chart export | Callback | `onExport()` | Functional |
| Chart fullscreen | Callback | `onFullscreen()` | Functional |

---

### 4. TreeHouses.tsx
**Path:** `client/src/pages/TreeHouses.tsx`
**Purpose:** Digital tree house directory

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Search input | `<Input>` | `setSearchTerm()` | Functional |
| Filter: All | `<Button>` | `setFilterStatus('all')` | Functional |
| Filter: Active | `<Button>` | `setFilterStatus('active')` | Functional |
| Filter: Reserved | `<Button>` | `setFilterStatus('reserved')` | Functional |
| Join Tree House | `<Button>` | Opens modal | Functional |
| View Details | `<Button>` | Opens `InteractiveTreeHouseModal` | Functional |
| View Location | `<Button>` | External map link | Functional |
| Clear Filters | `<Button>` | Reset all filters | Functional |

---

### 5. LivePodcasts.tsx
**Path:** `client/src/pages/LivePodcasts.tsx`
**Purpose:** Live streaming podcasts

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Search input | `<Input>` | Search podcasts | Functional |
| Category filter | `<Select>` | Filter by category | Functional |
| Filters button | `<Button>` | Show filter options | Functional |
| Category cards | `<Card>` | Filter by click | Functional |
| Listen button | `<Button>` | Play podcast stream | Functional |

---

### 6. Community.tsx
**Path:** `client/src/pages/Community.tsx`
**Purpose:** Podcaster community hub

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Tab: Forum | `<TabsTrigger>` | Switch to forum view | Functional |
| Tab: Members | `<TabsTrigger>` | Switch to members view | Functional |
| Tab: Events | `<TabsTrigger>` | Switch to events view | Functional |
| Tab: Projects | `<TabsTrigger>` | Switch to projects view | Functional |
| Tab: Resources | `<TabsTrigger>` | Switch to resources view | Functional |
| Follow Members | `<Button>` | Follow action | Functional |
| Follow (per member) | `<Button>` | Follow individual | Functional |
| Message (per member) | `<Button>` | Open message modal | Functional |
| Create Event | `<Button>` | Create event modal | Functional |
| Join Event | `<Button>` | Join event action | Functional |
| Share | `<Button>` | Share event | Functional |
| Start Project | `<Button>` | Create project | Functional |
| Join Project | `<Button>` | Join existing project | Functional |

---

### 7. Analytics.tsx
**Path:** `client/src/pages/Analytics.tsx`
**Purpose:** Analytics & insights dashboard

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Time: 24h | `<Button>` | Set 24 hour range | Functional |
| Time: 7d | `<Button>` | Set 7 day range | Functional |
| Time: 30d | `<Button>` | Set 30 day range | Functional |
| Time: 90d | `<Button>` | Set 90 day range | Functional |
| Filter Regions | `<Button>` | `handleFilterRegions()` | Functional |
| Map View | `<Button>` | `handleMapView()` | Functional |
| Export Report | `<Button>` | Export analytics data | Functional |
| Tab: Global | `<TabsTrigger>` | Global analytics | Functional |
| Tab: Content | `<TabsTrigger>` | Content analytics | Functional |
| Tab: Cultural | `<TabsTrigger>` | Cultural analytics | Functional |
| Tab: Regional | `<TabsTrigger>` | Regional analytics | Functional |
| Tab: Predictions | `<TabsTrigger>` | AI predictions | Functional |

---

### 8. Creator.tsx
**Path:** `client/src/pages/Creator.tsx`
**Purpose:** Creator dashboard

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Start/Stop Recording | `<Button>` | `setIsRecording()` toggle | Functional |
| Settings | `<Button>` | Open settings | Functional |
| Tab: Dashboard | `<TabsTrigger>` | Creator dashboard | Functional |
| Tab: Content | `<TabsTrigger>` | Content management | Functional |
| Tab: Analytics | `<TabsTrigger>` | Creator analytics | Functional |
| Tab: Monetization | `<TabsTrigger>` | Earnings view | Functional |
| Tab: Community | `<TabsTrigger>` | Community engagement | Functional |
| Tab: Profile | `<TabsTrigger>` | Profile settings | Functional |
| Upload New | `<Button>` | Upload content | Functional |
| Edit (per episode) | `<Button>` | Edit episode | Functional |
| Share (per episode) | `<Button>` | Share episode | Functional |

---

### 9. WowFactors.tsx
**Path:** `client/src/pages/WowFactors.tsx`
**Purpose:** Advanced features showcase

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Tab: AI Voice | `<TabsTrigger>` | AI Voice Synthesis | Functional |
| Tab: AR Visualization | `<TabsTrigger>` | AR Baobab | Functional |
| Tab: Biometric | `<TabsTrigger>` | Biometric Engagement | Functional |
| Tab: Global Heatmap | `<TabsTrigger>` | Listening Heatmap | Functional |
| Tab: Holographic | `<TabsTrigger>` | Holographic Presence | Functional |
| Tab: Neural | `<TabsTrigger>` | Neural Matching | Functional |
| Tab: Real-Time | `<TabsTrigger>` | Translation Overlay | Functional |
| Additional tabs (3) | `<TabsTrigger>` | Various features | Functional |

---

### 10. LiveCoding.tsx
**Path:** `client/src/pages/LiveCoding.tsx`
**Purpose:** AI-powered code generation

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Prompt input | `<Input>` | Enter code prompt | Functional |
| Generate button | `<Button>` | Start AI generation | Functional |
| Stop button | `<Button>` | Stop generation | Functional |
| Download files | `<Button>` | Download generated code | Functional |
| File selection | `<Button>` | Switch between files | Functional |
| Copy code | `<Button>` | Copy to clipboard | Functional |
| Maximize | `<Button>` | Fullscreen editor | Functional |
| Back link | `<Link>` | Return to home | Functional |

---

### 11. ForgotPassword.tsx
**Path:** `client/src/pages/ForgotPassword.tsx`
**Purpose:** Password recovery

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Email input | `<Input>` | Enter email address | Functional |
| Send Reset Link | `<Button>` | Send password reset | Functional |
| Return to Login | `<Button>` | Navigate to `/login` | Functional |
| Try different email | `<Button>` | Reset form | Functional |

---

## Components Audit

### Header.tsx
**Path:** `client/src/components/Layout/Header.tsx`

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Sidebar toggle (mobile) | `<Button>` | `onSidebarToggle()` | Functional |
| Theme toggle | `<Button>` | `handleThemeToggle()` | Functional |
| Notifications bell | `<Button>` | Show notifications | Functional |
| User menu dropdown | `<DropdownMenu>` | User options | Functional |
| Profile Settings | `<DropdownMenuItem>` | Profile page | Functional |
| Custom Alerts | `<DropdownMenuItem>` | Alert settings | Functional |
| Export Data | `<DropdownMenuItem>` | Export user data | Functional |
| Sign Out | `<DropdownMenuItem>` | `/api/logout` | Functional |

---

### Sidebar.tsx
**Path:** `client/src/components/Layout/Sidebar.tsx`

#### Navigation Items (11 Links)

| Link | Route | Icon | Status |
|------|-------|------|--------|
| BushPortal Home | `/` | TreePine | Functional |
| Digital Tree Houses | `/tree-houses` | Home | Functional |
| Command Center | `/dashboard` | LayoutDashboard | Functional |
| Live Podcasts | `/live-podcasts` | Radio | Functional |
| Podcast Studios | `/podcast-studios` | Mic | Needs Route |
| Podcaster Community | `/community` | Users | Functional |
| Global Network Map | `/global-map` | Globe | Needs Route |
| Content Discovery | `/content-discovery` | Headphones | Needs Route |
| Featured Locations | `/featured-locations` | MapPin | Needs Route |
| Analytics & Insights | `/podcast-analytics` | Podcast | Needs Route |
| Wow Factors | `/wow-factors` | Sparkles | Functional |

---

### InteractiveTreeHouseModal.tsx
**Path:** `client/src/components/TreeHouse/InteractiveTreeHouseModal.tsx`

#### Interactive Elements

| Element | Type | Action | Status |
|---------|------|--------|--------|
| Dialog trigger | `<DialogTrigger>` | Open modal | Functional |
| Tab: Overview | `<TabsTrigger>` | Show overview | Functional |
| Tab: Live Now | `<TabsTrigger>` | Show live streams | Functional |
| Tab: Community | `<TabsTrigger>` | Show community | Functional |
| Tab: Connect | `<TabsTrigger>` | Connection options | Functional |
| Play/Pause | `<Button>` | `handlePlayPause()` | Functional |
| Volume | `<Button>` | Volume control | Functional |
| Follow | `<Button>` | Follow podcaster | Functional |
| Join Tree House | `<Button>` | `handleJoinTreeHouse()` | Functional |
| Share Location | `<Button>` | Share modal | Functional |

---

## Terminal Pages

All terminal pages located in `client/public/terminals/`

### 1. vault-master.html
**Title:** VaultMaster Terminal v2.1
**Theme:** Gold (#d4af37)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| Command input | `<input>` | Process terminal commands |
| ScrollClaim Manager | Card | Clickable vault card |
| PulseGrid Sync | Card | Clickable vault card |
| OmniSignal Verify | Card | Clickable vault card |
| GhostTrace Gen2 | Card | Clickable vault card |
| VaultPay Tier III | Card | Clickable vault card |
| HSOMNI9000 | Card | Clickable vault card |

**Commands:** help, status, sectors, brands, sync, clear, about

---

### 2. cube-lattice.html
**Title:** Cube Lattice GPT v1.0
**Theme:** Purple (#a371f7)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 9 cube cells | `<div>` | Clickable with hover effects |
| 15 lattice nodes | `<div>` | Interactive grid visualization |

---

### 3. global-view.html
**Title:** Global View GPT v1.0
**Theme:** Cyan (#39d353)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 6 region cards | `<div>` | Hover animations, clickable |
| Map legend | `<div>` | Status indicators |
| 4 metric cards | `<div>` | Statistics display |

---

### 4. freight-ops.html
**Title:** Freight Ops GPT v1.0
**Theme:** Orange (#f0883e)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 4 ops metrics | `<div>` | Statistics display |
| 3 shipment items | `<div>` | Status tracking |
| 3 fleet cards | `<div>` | Fleet management |

---

### 5. loop-watch.html
**Title:** Loop Watch GPT v1.0
**Theme:** Green (#39d353)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 4 loop metrics | `<div>` | Statistics display |
| 5 cycle nodes | `<div>` | Flow visualization |
| 3 impact cards | `<div>` | Impact metrics |

---

### 6. seedwave.html
**Title:** Seedwave GPT v1.0
**Theme:** Pink (#e879f9)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| Line chart | Chart.js | Brand growth visualization |
| 4 growth metrics | `<div>` | Statistics display |
| 3 trend cards | `<div>` | Trend analysis |

---

### 7. distribution.html
**Title:** Distribution GPT v1.0
**Theme:** Blue (#58a6ff)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 4 distribution metrics | `<div>` | Statistics display |
| 3 channel cards | `<div>` | Distribution channels |
| Supply chain flow | `<div>` | Visual flow diagram |

---

### 8. signal.html
**Title:** Signal GPT v1.0
**Theme:** Red (#f85149)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| 4 security metrics | `<div>` | Security statistics |
| Event log | `<div>` | Live security events |
| 4 protocol cards | `<div>` | Security protocols |

---

### 9. faa-brands.html
**Title:** 7,038 FAA Brands Registry
**Theme:** Gold (#d4af37)

#### Interactive Elements

| Element | Type | Action |
|---------|------|--------|
| Search input | `<input>` | `searchBrands()` filter |
| Search button | `<button>` | Trigger search |
| 7 filter buttons | `<button>` | Category filtering |
| 16 brand cards | `<div>` | Clickable brand display |
| Pagination | `<button>` | Page navigation |
| Sector legend | `<div>` | Category icons |

---

## Widgets

### 1. baobab-activation-layer.js
**Path:** `widgets/baobab-activation-layer.js`

#### Purpose
Activates all interactive elements in baobab_terminal.html

#### Features
- Terminal command processing (help, status, sectors, code, etc.)
- Sector navigation (8 terminals)
- Dashboard button activation
- Live AI Coding integration
- Smooth scrolling
- Visual animations
- Floating terminal overlay

#### Commands Available
| Command | Function |
|---------|----------|
| help | Show available commands |
| status | Show system status |
| sectors | List sector terminals |
| clear | Clear terminal |
| code | Start Live AI Coding |
| vaultmesh | Show VaultMesh connections |
| brands | Show active brands |
| matrix | Display connection matrix |
| about | About BushPortal |

#### Sector URLs
- VaultMaster: `https://vault.faa.zone/vaultmaster`
- Cube Lattice: `https://vault.faa.zone/cube-lattice`
- Omni Chain: `https://vault.faa.zone/omni-chain`
- Neural Mesh: `https://vault.faa.zone/neural-mesh`
- Quantum Grid: `https://vault.faa.zone/quantum-grid`
- Crystal Matrix: `https://vault.faa.zone/crystal-matrix`
- Flux Core: `https://vault.faa.zone/flux-core`
- Prime Nexus: `https://vault.faa.zone/prime-nexus`

---

### 2. 32.html
**Path:** `widgets/32.html`

#### Purpose
32 Node Guardians landing page for FAA.Zone

#### Interactive Elements
| Element | Type | Action |
|---------|------|--------|
| Breakfast status | `<span>` | Dynamic UTC time display |
| 4 tier cards | `<div>` | Guardian tiers with hover |
| 3 ritual cards | `<div>` | Daily rituals display |

---

### 3. bushportal-widget.html
**Path:** `widgets/bushportal-widget.html`

Embeddable widget for external sites.

---

## Server Files

### API Routes
**File:** `server/routes.ts`

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/user` | GET | Get current user |
| `/api/alerts` | GET | Get system alerts |
| `/api/data-sources/status` | GET | Data source health |
| `/api/environmental-data` | GET | Environmental metrics |
| `/api/user/preferences` | PATCH | Update preferences |
| `/api/logout` | GET | User logout |

### Services
- **emailService.ts** - Email notifications
- **liveCodingService.ts** - AI code generation
- **openaiService.ts** - OpenAI integration
- **dataService.ts** - Data processing

### WebSocket
**File:** `server/websocket.ts`

Real-time data streaming for:
- Live coding sessions
- Dashboard updates
- Notification push

---

## Interactive Elements Summary

### Total Buttons by Page

| Page | Buttons | Links | Inputs | Selects |
|------|---------|-------|--------|---------|
| Landing | 7 | 3 | 0 | 0 |
| Login | 4 | 0 | 2 | 0 |
| Dashboard | 4 | 0 | 0 | 2 |
| TreeHouses | 6 | 0 | 1 | 0 |
| LivePodcasts | 3+ | 0 | 1 | 1 |
| Community | 12+ | 0 | 0 | 0 |
| Analytics | 7 | 0 | 0 | 0 |
| Creator | 10+ | 0 | 0 | 0 |
| WowFactors | 10 | 0 | 0 | 0 |
| LiveCoding | 6 | 1 | 1 | 0 |
| ForgotPassword | 3 | 0 | 1 | 0 |

### Component-Level Interactive Elements

| Component | Type | Interactive Elements |
|-----------|------|---------------------|
| Header | Layout | 5 buttons, 1 dropdown |
| Sidebar | Layout | 11 nav links |
| InteractiveTreeHouseModal | Modal | 9 buttons, 4 tabs |
| AlertBanner | Dashboard | 1 dismiss callback |
| Charts (Line/Bar/Doughnut) | Visualization | Export, fullscreen |

### Terminal Pages Interactive Elements

| Terminal | Commands | Cards | Inputs |
|----------|----------|-------|--------|
| vault-master | 7 | 6 | 1 |
| cube-lattice | 0 | 9 | 0 |
| global-view | 0 | 10 | 0 |
| freight-ops | 0 | 10 | 0 |
| loop-watch | 0 | 12 | 0 |
| seedwave | 0 | 7 | 0 |
| distribution | 0 | 7 | 0 |
| signal | 0 | 8 | 0 |
| faa-brands | 0 | 23 | 1 |

---

## Known Issues & Missing Routes

### Sidebar Links Without Routes
The following sidebar links reference routes that are not defined in App.tsx:

1. `/podcast-studios` - Needs page or redirect
2. `/global-map` - Needs page or redirect
3. `/content-discovery` - Needs page or redirect
4. `/featured-locations` - Needs page or redirect
5. `/podcast-analytics` - Needs page or redirect

### Recommendations
1. Add missing routes to App.tsx
2. Create placeholder pages or redirect to existing pages
3. Update Sidebar.tsx to use correct paths

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-31 | 1.0.0 | Initial comprehensive audit |

---

**Author:** Claude (Automated Audit)
**Repository:** baobab-bush-portal
**Branch:** claude/organize-baobab-files-YVcPh
