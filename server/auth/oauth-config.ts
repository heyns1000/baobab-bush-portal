import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { db } from '../db';
import { users } from '../../shared/schema';
import { eq } from 'drizzle-orm';

// OAuth provider configurations
const providers = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_API_URL}/auth/google/callback`,
    scope: ['profile', 'email'],
  },
  microsoft: {
    clientID: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_API_URL}/auth/microsoft/callback`,
    scope: ['user.read'],
    tenant: 'common',
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_API_URL}/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'name', 'picture'],
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY!,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
    callbackURL: `${process.env.VITE_API_URL}/auth/twitter/callback`,
    includeEmail: true,
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_API_URL}/auth/github/callback`,
    scope: ['user:email'],
  },
};

// Find or create user from OAuth profile
async function findOrCreateOAuthUser(profile: any, provider: string) {
  const email = profile.emails?.[0]?.value || `${profile.id}@${provider}.oauth`;
  const displayName = profile.displayName || profile.username || email.split('@')[0];
  
  const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (existingUser) {
    const [updatedUser] = await db.update(users).set({
      lastLogin: new Date(),
      oauthProvider: provider,
      oauthId: profile.id,
      avatar: profile.photos?.[0]?.value || existingUser.avatar,
    }).where(eq(users.id, existingUser.id)).returning();
    return updatedUser;
  }

