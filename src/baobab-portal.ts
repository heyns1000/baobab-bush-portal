import Anthropic from '@anthropic-ai/sdk';
import * as dotenv from 'dotenv';
import * as readline from 'readline';

dotenv.config();

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function chat(userMessage: string): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `You are the AI assistant of the Baobab Bush Portal, a security and innovation network by Heyns Schoeman in Pretoria, South Africa. The portal integrates Foxed Has Mobiles (mobile TypeScript solutions) within its ecosystem. Respond with technical expertise and creativity.\n\nUser: ${userMessage}`
    }]
  });

  const textContent = message.content.find(block => block.type === 'text');
  return textContent && textContent.type === 'text' ? textContent.text : 'No response';
}

function askQuestion() {
  rl.question('🌳 You: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('🦊 Goodbye from the Baobab Portal!');
      rl.close();
      return;
    }

    console.log('🤖 Baobab AI: Thinking...\n');
    const response = await chat(input);
    console.log(`🦊 Baobab AI: ${response}\n`);
    askQuestion();
  });
}

console.log('🌳 Baobab Bush Portal - Interactive AI Chat 🌳');
console.log('🦊 Foxed Has Mobiles Integration Active');
console.log('Type "exit" to quit\n');
askQuestion();
