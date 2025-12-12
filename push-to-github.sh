#!/bin/bash

# Script to create GitHub repository and push baobab-bush-portal
# Run this after authenticating with: gh auth login

echo "🌳 Creating baobab-bush-portal repository on GitHub..."

# Create the repository and push
gh repo create heyns1000/baobab-bush-portal \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description="Unified fullstack application merging BaobabTree and BushPortal - Sovereign Signal Station & Frequency Liberation Network"

if [ $? -eq 0 ]; then
  echo "✅ Repository created and pushed successfully!"
  echo "🌳 URL: https://github.com/heyns1000/baobab-bush-portal"
else
  echo "❌ Failed to create repository. Please authenticate first with: gh auth login"
fi
