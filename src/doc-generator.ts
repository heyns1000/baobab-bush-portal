import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateDocs() {
  console.log('📚 Generating Baobab Portal Documentation...\n');

  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Generate comprehensive documentation for the Baobab Bush Portal project. Include:
      
1. Project Overview
2. Architecture (Baobab Portal + Foxed Has Mobiles integration)
3. Getting Started
4. API Reference
5. TypeScript Examples
6. Security Best Practices
7. Contributing Guidelines

Format as a professional README with markdown.`
    }]
  });

  const textContent = message.content.find(block => block.type === 'text');
  if (textContent && textContent.type === 'text') {
    fs.writeFileSync('DOCS.md', textContent.text);
    console.log('✅ Documentation generated: DOCS.md');
  }
}

generateDocs();
