import { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TreePine, UserPlus, User, Mail, Lock, Globe } from 'lucide-react';

export default function Register() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration - redirect to dashboard
    setLocation('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            🌍 Join Our Global Community
          </Badge>
        </div>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-amber-600" />
              Create Account
            </CardTitle>
            <CardDescription>
              Join podcasters from 120 countries across our baobab tree house network.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  placeholder="Your country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-country"
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
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="border-amber-200 dark:border-gray-600 focus:border-amber-400"
                  data-testid="input-confirm-password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                data-testid="button-register"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-amber-200 dark:border-gray-600">
              <Button 
                variant="outline" 
                className="w-full border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                onClick={() => setLocation('/tree-houses')}
                data-testid="button-guest-access"
              >
                <TreePine className="w-4 h-4 mr-2" />
                Continue as Guest
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button 
                  className="text-amber-600 hover:text-amber-700 font-medium"
                  onClick={() => setLocation('/login')}
                >
                  Sign In
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