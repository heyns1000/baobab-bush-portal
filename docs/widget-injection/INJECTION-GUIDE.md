# 🌳 BushPortal Widget Injection Guide

Complete guide to injecting the BushPortal widget across all your repositories to activate the sovereign signal network.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Widget Types](#widget-types)
3. [Injection Methods](#injection-methods)
4. [Automated Deployment](#automated-deployment)
5. [Manual Injection](#manual-injection)
6. [Repository List](#repository-list)

---

## 🚀 Quick Start

### Option 1: README Badge (Recommended)

Add this single line to any repository's README.md:

```markdown
[![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge&logo=spotify)](https://github.com/heyns1000/baobab-bush-portal)
```

### Option 2: HTML Widget

For repositories with web interfaces, copy `widgets/bushportal-widget.html` into your project's HTML files.

### Option 3: GitHub Pages Integration

Add the widget to your GitHub Pages site for maximum visibility.

---

## 🎨 Widget Types

### 1. **Static Badge** (Markdown)
- ✅ Works in all README files
- ✅ No code changes required
- ✅ GitHub native rendering
- ⚡ Instant deployment

**Usage:**
```markdown
[![BushPortal](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)
```

### 2. **Interactive Widget** (HTML/JS)
- ✅ Floating badge with modal
- ✅ Auto-displays on first visit
- ✅ Network stats display
- ⚡ Copy `bushportal-widget.html` to your site

**Features:**
- Floating bottom-right badge
- Animated VaultPulse indicator
- Click to open modal with network info
- Auto-displays once per session
- Responsive design

### 3. **README Section** (Full Integration)
- ✅ Dedicated BushPortal section
- ✅ Complete branding
- ✅ Network status display

**Template:**
```markdown
## 🌳 BushPortal Network

This repository is part of the **BushPortal Sovereign Signal Network** - connecting voices from Mzansi to Timbuktu.

[![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)
[![VaultPulse](https://img.shields.io/badge/VaultPulse-●●●●●-brightgreen?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)

**Network Features:**
- 🎙️ Live podcast streaming
- 🌍 Global tree house network
- 📡 Sovereign frequency broadcasting
- 🍦 Master SamFox approved

[🌳 **Enter the Portal**](https://github.com/heyns1000/baobab-bush-portal)
```

---

## 🔧 Injection Methods

### Method 1: Automated Bulk Injection (Recommended)

Use the provided script to inject badges into all repositories at once.

```bash
# Clone this repository
git clone git@github.com:heyns1000/baobab-bush-portal.git
cd baobab-bush-portal

# Run the injection script
chmod +x scripts/inject-all-repos.sh
./scripts/inject-all-repos.sh
```

**What it does:**
1. Fetches all your repositories
2. Clones each repository
3. Adds BushPortal badge to README
4. Commits and pushes changes
5. Displays summary report

### Method 2: GitHub Actions Workflow

Create a GitHub Action to automatically add the badge to new repositories.

**File:** `.github/workflows/bushportal-inject.yml`

```yaml
name: BushPortal Network Injection

on:
  create:
    branches:
      - main

jobs:
  inject-widget:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Add BushPortal Badge
        run: |
          if [ -f "README.md" ]; then
            # Check if badge already exists
            if ! grep -q "BushPortal" README.md; then
              # Add badge after title
              sed -i '1a\\n[![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)\n' README.md

              git config --local user.email "github-actions[bot]@users.noreply.github.com"
              git config --local user.name "github-actions[bot]"
              git add README.md
              git commit -m "🌳 Connect to BushPortal Network"
              git push
            fi
          fi
```

### Method 3: Manual One-by-One

For selective injection or custom placement:

1. Open the repository's README.md
2. Add the badge code where desired
3. Commit and push

---

## 🤖 Automated Deployment

### Bulk Injection Script

**File:** `scripts/inject-all-repos.sh`

```bash
#!/bin/bash

# BushPortal Network - Bulk Repository Injection
# Injects BushPortal badge into all repositories under heyns1000

GITHUB_USER="heyns1000"
BADGE_CODE='[![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge&logo=spotify)](https://github.com/heyns1000/baobab-bush-portal)'

echo "🌳 BushPortal Network Injection Starting..."
echo "User: $GITHUB_USER"
echo ""

# Get all repositories
repos=$(gh repo list $GITHUB_USER --limit 1000 --json name -q '.[].name')

total=0
injected=0
skipped=0

for repo in $repos; do
  total=$((total + 1))
  echo "[$total] Processing: $repo"

  # Clone repository
  temp_dir=$(mktemp -d)
  git clone "git@github.com:$GITHUB_USER/$repo.git" "$temp_dir" 2>/dev/null

  if [ $? -ne 0 ]; then
    echo "    ❌ Failed to clone"
    skipped=$((skipped + 1))
    continue
  fi

  cd "$temp_dir"

  # Check if README exists
  if [ ! -f "README.md" ]; then
    echo "    ⚠️  No README.md found"
    skipped=$((skipped + 1))
    cd -
    rm -rf "$temp_dir"
    continue
  fi

  # Check if badge already exists
  if grep -q "BushPortal" README.md; then
    echo "    ℹ️  Badge already exists"
    skipped=$((skipped + 1))
    cd -
    rm -rf "$temp_dir"
    continue
  fi

  # Inject badge after first line (title)
  sed -i "1a\\$BADGE_CODE\\n" README.md

  # Commit and push
  git add README.md
  git commit -m "🌳 Connect to BushPortal Network

Sovereign Signal Station activation.
Part of the Baobab network from Mzansi to Timbuktu.

Trunk version: vs111.111"

  git push origin main 2>/dev/null || git push origin master 2>/dev/null

  if [ $? -eq 0 ]; then
    echo "    ✅ Injected and pushed"
    injected=$((injected + 1))
  else
    echo "    ❌ Failed to push"
    skipped=$((skipped + 1))
  fi

  cd -
  rm -rf "$temp_dir"

  echo ""
done

echo "================================"
echo "🌳 BushPortal Injection Complete"
echo "================================"
echo "Total repositories: $total"
echo "✅ Successfully injected: $injected"
echo "⚠️  Skipped: $skipped"
echo ""
echo "VaultPulse Status: ●●●●● ACTIVE"
echo "Network nodes: $injected active"
echo ""
echo "From Mzansi to Timbuktu 🌳"
```

Save this as `scripts/inject-all-repos.sh` and run:

```bash
chmod +x scripts/inject-all-repos.sh
./scripts/inject-all-repos.sh
```

---

## ✋ Manual Injection

### Step-by-Step for Each Repository

1. **Navigate to repository**
   ```bash
   cd /path/to/your/repository
   ```

2. **Open README.md**
   ```bash
   nano README.md
   # or
   code README.md
   ```

3. **Add badge after title**
   ```markdown
   # Your Project Title

   [![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge)](https://github.com/heyns1000/baobab-bush-portal)

   Rest of your README...
   ```

4. **Commit and push**
   ```bash
   git add README.md
   git commit -m "🌳 Connect to BushPortal Network"
   git push
   ```

---

## 📊 Repository List

Track injection progress across all repositories:

| Repository | Status | Widget Type | Notes |
|------------|--------|-------------|-------|
| baobab-bush-portal | ✅ Complete | Full README | Hub repository |
| AICreator | ⏳ Pending | Badge | - |
| Agent-University | ⏳ Pending | Badge | - |
| Banimal.co.za | ⏳ Pending | Badge | - |
| BushPortal | ⏳ Pending | Badge | Original |
| BaobabTree | ⏳ Pending | Badge | Original |
| ClientMine | ⏳ Pending | Badge | - |
| CornexConnect | ⏳ Pending | Badge + Widget | Has HTML |
| CornexSite | ⏳ Pending | Badge + Widget | Has HTML |
| DoodleDash | ⏳ Pending | Badge | - |
| FAA-Mining-Intelligence-Grid | ⏳ Pending | Badge | - |
| FSF_food | ⏳ Pending | Badge | - |
| Fruitful-Kitchens | ⏳ Pending | Badge | - |
| Fruitful-Global-CodeNest | ⏳ Pending | Badge | - |
| Fruitful-Global-SecureSign | ⏳ Pending | Badge | - |
| Fruitful-Payroll-OS | ⏳ Pending | Badge | - |
| FruitfulAssist | ⏳ Pending | Badge | - |
| FruitfulPlanetChange | ⏳ Pending | Badge | - |
| Game-Build | ⏳ Pending | Badge | - |
| HealthTrack | ⏳ Pending | Badge | - |
| Justlink | ⏳ Pending | Badge + Widget | Has HTML |
| LaundroAI | ⏳ Pending | Badge | - |
| Lesotho-Heritage | ⏳ Pending | Badge | - |
| Madisha-Security | ⏳ Pending | Badge | - |
| Municipal-Intelligence | ⏳ Pending | Badge | - |
| OmniLedger | ⏳ Pending | Badge | - |
| PaypalBackend | ⏳ Pending | Badge | - |
| PentaWeb | ⏳ Pending | Badge + Widget | Has HTML |
| PlaylistBees | ⏳ Pending | Badge | - |
| ProposalCare | ⏳ Pending | Badge | - |
| RenovateLink | ⏳ Pending | Badge | - |
| Routemesh | ⏳ Pending | Badge | - |
| ScrollBinderOne | ⏳ Pending | Badge | - |
| SeedShake | ⏳ Pending | Badge | - |
| SeedwaveConnect | ⏳ Pending | Badge | - |
| SigBuilder | ⏳ Pending | Badge | - |
| SilentOrbitNode | ⏳ Pending | Badge | - |
| Storage | ⏳ Pending | Badge | - |
| TextReader | ⏳ Pending | Badge | - |
| VaultMesh | ⏳ Pending | Badge + Widget | Has HTML |
| VaultPrayer | ⏳ Pending | Badge | - |
| WaveHub | ⏳ Pending | Badge | - |
| WebPageBuilder | ⏳ Pending | Badge + Widget | Has HTML |
| WorkSpaceMind | ⏳ Pending | Badge | - |
| faa.zone | ⏳ Pending | Badge + Widget | Main site |
| gaming-sector | ⏳ Pending | Badge | - |
| sovreign-scrolls | ⏳ Pending | Badge | - |

---

## 🎯 Injection Priority

### Tier 1: High Visibility (HTML Widget + Badge)
- faa.zone (main website)
- CornexConnect
- CornexSite
- VaultMesh
- Justlink
- PentaWeb
- WebPageBuilder

### Tier 2: Active Projects (Badge)
- All Fruitful ecosystem projects
- Municipal-Intelligence
- Agent-University
- AICreator

### Tier 3: Archive/Maintenance (Badge)
- Remaining repositories

---

## 🔍 Verification

After injection, verify:

1. **Badge displays correctly**
   - Check README on GitHub
   - Ensure link works
   - Badge renders properly

2. **Commit message follows format**
   - Includes 🌳 emoji
   - Mentions trunk version

3. **No merge conflicts**
   - Clean git history
   - No duplicate badges

---

## 🌳 Post-Injection

After activating all repositories:

1. **Update network map**
   - Track active nodes
   - Monitor VaultPulse status

2. **Create network dashboard**
   - Visualize all connected repos
   - Show transmission stats

3. **Activate cross-linking**
   - Link repos to each other
   - Build sovereign mesh network

---

**🦍 Trunk Version:** vs111.111

**From Mzansi to Timbuktu - Deep roots. Wide canopy. Eternal connection.**
