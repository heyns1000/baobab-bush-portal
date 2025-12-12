import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TreePine, Lock, User, Mail } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - redirect to dashboard
    setLocation('/dashboard');
  };

  const handleGuestAccess = () => {
    setLocation('/tree-houses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TreePine className="w-12 h-12 text-amber-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                BushPortal™
              </h1>
              <p className="text-sm text-amber-600 dark:text-amber-300">
                Digital Tree House Network
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
            🌍 From Here to Timbuktu
          </Badge>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to access your digital tree house and join the global podcasting community.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                data-testid="button-login"
              >
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-amber-200 dark:border-gray-600">
              <Button 
                variant="outline" 
                className="w-full border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={handleGuestAccess}
                data-testid="button-guest-access"
              >
                <TreePine className="w-4 h-4 mr-2" />
                Continue as Guest
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Explore tree houses and listen to podcasts without signing in
              </p>
            </div>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                New to BushPortal?{' '}
                <button 
                  className="text-amber-600 hover:text-amber-700 font-medium"
                  onClick={() => setLocation('/register')}
                >
                  Create Account
                </button>
              </p>
              <p className="text-xs text-muted-foreground">
                <button 
                  className="text-amber-600 hover:text-amber-700"
                  onClick={() => setLocation('/forgot-password')}
                >
                  Forgot your password?
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Licensed under Apache License v2.0 by{' '}
            <span className="font-medium">Fruitful Holdings (Pty) Ltd</span>
          </p>
        </div>
      </div>
    </div>
  );
}