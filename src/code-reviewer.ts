import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function reviewCode(filePath: string) {
  try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    console.log(`🔍 Reviewing ${fileName}...\n`);

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3000,
      messages: [{
        role: 'user',
        content: `As the Baobab Portal AI code reviewer, analyze this TypeScript code for the Foxed Has Mobiles project. Provide:\n1. Code quality assessment\n2. Security concerns\n3. Performance suggestions\n4. Best practices recommendations\n\nFile: ${fileName}\n\n\`\`\`typescript\n${code}\n\`\`\``
      }]
    });

    const textContent = message.content.find(block => block.type === 'text');
    if (textContent && textContent.type === 'text') {
      console.log('📋 Review Results:\n');
      console.log(textContent.text);
    }
  } catch (error) {
    console.error('❌ Review failed:', error);
  }
}

const fileToReview = process.argv[2] || 'src/index.ts';
reviewCode(fileToReview);
