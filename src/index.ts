import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

console.log('🌳 Welcome to the Baobab Bush Portal 🌳');
console.log('🦊 Foxed Has Mobiles Integration Active\n');

async function initializePortal() {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: 'Introduce the Baobab Bush Portal and explain how it integrates with Foxed Has Mobiles in 3 sentences.'
      }]
    });

    const textContent = message.content.find(block => block.type === 'text');
    if (textContent && textContent.type === 'text') {
      console.log(textContent.text);
    }
    
    console.log('\n✅ Portal initialized successfully!');
  } catch (error) {
    console.error('❌ Portal initialization failed:', error);
  }
}

initializePortal();
