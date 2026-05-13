import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as MicrosoftStrategy } from 'passport-microsoft';
import { Strategy as AppleStrategy } from 'passport-apple';
import { Strategy as SlackStrategy } from 'passport-slack-oauth2';
import { db } from '../db';
import { users } from '../../shared/schema';
import { eq } from 'drizzle-orm';

const CALLBACK_BASE = process.env.VITE_APP_URL || 'http://localhost:5000';

// User profile normalization
interface NormalizedProfile {
  provider: string;
  providerId: string;
  email: string;
  name: string;
  avatar?: string;
}

function normalizeProfile(provider: string, profile: any): NormalizedProfile {
  const emailField = profile.emails?.[0]?.value || profile.email || `${profile.id}@${provider}.oauth`;
  
  return {
    provider,
    providerId: profile.id,
    email: emailField,
    name: profile.displayName || profile.name || profile.username || 'User',
    avatar: profile.photos?.[0]?.value || profile.picture || profile.avatar_url,
  };
}

// Find or create user
async function findOrCreateUser(profile: NormalizedProfile) {
  // Check if user exists by email
  let [user] = await db.select().from(users).where(eq(users.email, profile.email));
  
  if (!user) {
    // Create new user
    [user] = await db.insert(users).values({
      email: profile.email,
      username: profile.name.toLowerCase().replace(/\s+/g, '_'),
      password: '', // OAuth users don't need password
      oauthProvider: profile.provider,
      oauthId: profile.providerId,
      avatar: profile.avatar,
      createdAt: new Date(),
    }).returning();
  } else if (!user.oauthProvider) {
    // Link OAuth to existing email-based account
    await db.update(users)
      .set({ 
        oauthProvider: profile.provider,
        oauthId: profile.providerId,
        avatar: profile.avatar || user.avatar,
      })
      .where(eq(users.id, user.id));
  }
  
  return user;
}

// OAuth callback handler
const oauthCallback = async (
  provider: string,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any
) => {
  try {
    const normalized = normalizeProfile(provider, profile);
    const user = await findOrCreateUser(normalized);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
};

export function setupOAuthProviders() {
  // 1. GOOGLE
  if (process.env.GOOGLE_CLIENT_ID) {
    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/google/callback`,
    }, (accessToken, refreshToken, profile, done) => 
      oauthCallback('google', accessToken, refreshToken, profile, done)
    ));
  }

  // 2. MICROSOFT
  if (process.env.MICROSOFT_CLIENT_ID) {
    passport.use(new MicrosoftStrategy({
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/microsoft/callback`,
      scope: ['user.read'],
    }, (accessToken, refreshToken, profile, done) => 
      oauthCallback('microsoft', accessToken, refreshToken, profile, done)
    ));
  }

  // 3. FACEBOOK
  if (process.env.FACEBOOK_APP_ID) {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name', 'photos'],
    }, (accessToken, refreshToken, profile, done) => 
      oauthCallback('facebook', accessToken, refreshToken, profile, done)
    ));
  }

  // 4. TWITTER
  if (process.env.TWITTER_CONSUMER_KEY) {
    passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/twitter/callback`,
      includeEmail: true,
    }, (token, tokenSecret, profile, done) => 
      oauthCallback('twitter', token, tokenSecret, profile, done)
    ));
  }

  // 5. GITHUB
  if (process.env.GITHUB_CLIENT_ID) {
    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/github/callback`,
      scope: ['user:email'],
    }, (accessToken, refreshToken, profile, done) => 
      oauthCallback('github', accessToken, refreshToken, profile, done)
    ));
  }

  // 6. APPLE
  if (process.env.APPLE_CLIENT_ID) {
    passport.use(new AppleStrategy({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID!,
      keyID: process.env.APPLE_KEY_ID!,
      privateKeyString: process.env.APPLE_PRIVATE_KEY!,
      callbackURL: `${CALLBACK_BASE}/auth/apple/callback`,
      scope: ['email', 'name'],
    }, (accessToken, refreshToken, idToken, profile, done) => 
      oauthCallback('apple', accessToken, refreshToken, profile, done)
    ));
  }

  // 7. SLACK
  if (process.env.SLACK_CLIENT_ID) {
    passport.use(new SlackStrategy({
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET!,
      callbackURL: `${CALLBACK_BASE}/auth/slack/callback`,
      scope: ['identity.basic', 'identity.email', 'identity.avatar'],
    }, (accessToken, refreshToken, profile, done) => 
      oauthCallback('slack', accessToken, refreshToken, profile, done)
    ));
  }

  console.log('✅ OAuth providers configured');
}

// Serialize/deserialize user for sessions
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
