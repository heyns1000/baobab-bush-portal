import { BaobabPortalConfig } from './types';

export const PORTAL_CONFIG: BaobabPortalConfig = {
  apiKey: process.env.ANTHROPIC_API_KEY || '',
  model: 'claude-3-5-sonnet-20241022',
  maxTokens: 4096,
};

export const FOXED_MOBILES = {
  name: 'Foxed Has Mobiles',
  description: 'Mobile TypeScript solutions nested within the Baobab ecosystem',
  repository: 'https://github.com/heyns1000/Foxed-Has-Mobiles',
  technologies: ['TypeScript', 'React Native', 'Node.js'],
};

export const PORTAL_INFO = {
  name: 'Baobab Bush Portal',
  tagline: 'A trunk made of data - Where Security Meets Innovation',
  owner: 'Heyns Schoeman',
  company: 'Fruitful Holdings (Pty) Ltd 🔥 CodeNest',
  location: 'Pretoria, South Africa',
};
