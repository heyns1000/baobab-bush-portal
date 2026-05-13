import { Router } from 'express';
import passport from 'passport';

const router = Router();

// Provider configuration
const providers = [
  { name: 'google', scope: ['profile', 'email'] },
  { name: 'microsoft', scope: ['user.read'] },
  { name: 'facebook', scope: ['email', 'public_profile'] },
  { name: 'twitter', scope: [] },
  { name: 'github', scope: ['user:email'] },
  { name: 'apple', scope: ['email', 'name'] },
  { name: 'slack', scope: ['identity.basic', 'identity.email'] },
  { name: 'tiktok', scope: ['user.info.basic'] }, // Will add TikTok strategy
  { name: 'temu', scope: ['user.info'] }, // Will add Temu strategy
  { name: 'amazon', scope: ['profile'] }, // Will add Amazon strategy
];

// Generate routes for each provider
providers.forEach(({ name, scope }) => {
  // Initiate OAuth flow
  router.get(`/${name}`, passport.authenticate(name, { scope }));

  // OAuth callback
  router.get(
    `/${name}/callback`,
    passport.authenticate(name, { 
      failureRedirect: '/login?error=oauth_failed',
      successRedirect: '/dashboard',
    })
  );
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Current user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;
