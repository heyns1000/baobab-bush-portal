#!/bin/bash

# 🌳 BushPortal Network - Automated Widget Injection
# Injects BushPortal badges into all repositories under heyns1000
# Activates the sovereign signal network across the entire GitHub profile

set -e

GITHUB_USER="heyns1000"
BADGE_CODE='[![BushPortal Network](https://img.shields.io/badge/🌳_BushPortal-Network-orange?style=for-the-badge&logo=spotify)](https://github.com/heyns1000/baobab-bush-portal)'

echo "╔════════════════════════════════════════╗"
echo "║  🌳 BushPortal Network Injection 🌳   ║"
echo "║  Sovereign Signal Station Activation  ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "User: $GITHUB_USER"
echo "Trunk Version: vs111.111"
echo "VaultPulse: ●●●●● ACTIVE"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed"
    echo "Install: brew install gh  (macOS)"
    echo "         or visit: https://cli.github.com/"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI"
    echo "Run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI authenticated"
echo ""
echo "Fetching repositories..."

# Get all repositories
repos=$(gh repo list $GITHUB_USER --limit 1000 --json name -q '.[].name')

if [ -z "$repos" ]; then
    echo "❌ No repositories found"
    exit 1
fi

total=0
injected=0
skipped=0
failed=0

echo "Found repositories. Starting injection..."
echo "════════════════════════════════════════"
echo ""

for repo in $repos; do
    total=$((total + 1))
    echo "[$total] 🌳 $repo"

    # Skip the baobab-bush-portal itself
    if [ "$repo" = "baobab-bush-portal" ]; then
        echo "    ℹ️  Skipping hub repository"
        skipped=$((skipped + 1))
        echo ""
        continue
    fi

    # Create temporary directory
    temp_dir=$(mktemp -d)

    # Clone repository
    if ! git clone "git@github.com:$GITHUB_USER/$repo.git" "$temp_dir" 2>/dev/null; then
        echo "    ❌ Failed to clone"
        failed=$((failed + 1))
        rm -rf "$temp_dir"
        echo ""
        continue
    fi

    cd "$temp_dir"

    # Check if README exists
    if [ ! -f "README.md" ]; then
        echo "    ⚠️  No README.md found"
        skipped=$((skipped + 1))
        cd - > /dev/null
        rm -rf "$temp_dir"
        echo ""
        continue
    fi

    # Check if badge already exists
    if grep -q "BushPortal" README.md; then
        echo "    ✓ Badge already active"
        skipped=$((skipped + 1))
        cd - > /dev/null
        rm -rf "$temp_dir"
        echo ""
        continue
    fi

    # Inject badge after first line
    # Create temp file with badge
    {
        head -n 1 README.md
        echo ""
        echo "$BADGE_CODE"
        echo ""
        tail -n +2 README.md
    } > README.md.tmp

    mv README.md.tmp README.md

    # Commit and push
    git add README.md
    git commit -m "🌳 Connect to BushPortal Network

Sovereign Signal Station activation.
Part of the Baobab network from Mzansi to Timbuktu.

Features:
- 🎙️ Live podcast streaming
- 🌍 Global tree house network
- 📡 Sovereign frequency broadcasting
- 🍦 Master SamFox approved

VaultPulse: ●●●●● ACTIVE
Trunk version: vs111.111

[View Portal](https://github.com/heyns1000/baobab-bush-portal)" 2>/dev/null

    # Try to push
    if git push origin main 2>/dev/null || git push origin master 2>/dev/null; then
        echo "    ✅ Injected and activated"
        injected=$((injected + 1))
    else
        echo "    ❌ Failed to push"
        failed=$((failed + 1))
    fi

    cd - > /dev/null
    rm -rf "$temp_dir"

    echo ""

    # Add small delay to avoid rate limiting
    sleep 1
done

echo "════════════════════════════════════════"
echo ""
echo "╔════════════════════════════════════════╗"
echo "║     🌳 Injection Complete 🌳          ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📊 Summary:"
echo "  Total repositories: $total"
echo "  ✅ Successfully injected: $injected"
echo "  ✓ Already active: $((skipped - (total - injected - failed)))"
echo "  ⚠️  Skipped: $skipped"
echo "  ❌ Failed: $failed"
echo ""
echo "📡 Network Status:"
echo "  VaultPulse: ●●●●● ACTIVE"
echo "  Active nodes: $injected"
echo "  Signal strength: MAXIMUM"
echo "  Coverage: CONTINENTAL"
echo ""
echo "🌳 From Mzansi to Timbuktu"
echo "🦍 Trunk version: vs111.111"
echo "🍦 Master SamFox Approved"
echo ""
echo "View network: https://github.com/heyns1000/baobab-bush-portal"
