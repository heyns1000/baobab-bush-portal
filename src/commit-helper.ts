import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import { execSync } from 'child_process';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateCommitMessage() {
  try {
    const diff = execSync('git diff --staged').toString();
    
    if (!diff) {
      console.log('⚠️  No staged changes found. Use: git add <files>');
      return;
    }

    console.log('🌳 Generating Baobab-themed commit message...\n');

    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Generate a concise, professional git commit message for these changes. Use Baobab Portal theme where appropriate. Follow conventional commits format (feat/fix/docs/etc).\n\nDiff:\n${diff.substring(0, 3000)}`
      }]
    });

    const textContent = message.content.find(block => block.type === 'text');
    if (textContent && textContent.type === 'text') {
      console.log('📝 Suggested commit message:\n');
      console.log(textContent.text);
      console.log('\n💡 To use: git commit -m "message above"');
    }
  } catch (error) {
    console.error('❌ Failed to generate commit message:', error);
  }
}

generateCommitMessage();
