import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(iOS);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed for this session
    sessionStorage.setItem('pwa-dismissed', 'true');
  };

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('pwa-dismissed') === 'true') {
    return null;
  }

  if (!showPrompt && !isIOS) {
    return null;
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl z-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🌳</div>
            <div>
              <CardTitle className="text-sm">Install BushPortal™</CardTitle>
              <CardDescription className="text-xs">
                Get the full app experience
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {isIOS ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              To install this app on your iPhone:
            </p>
            <ol className="text-xs space-y-1 text-muted-foreground">
              <li>1. Tap the Share button in Safari</li>
              <li>2. Scroll down and tap "Add to Home Screen"</li>
              <li>3. Tap "Add" to install</li>
            </ol>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Install BushPortal™ for offline access and better performance.
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={handleInstall}
                size="sm"
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Install
              </Button>
              <Button 
                onClick={handleDismiss}
                variant="outline"
                size="sm"
                className="border-amber-200 hover:bg-amber-50"
              >
                Later
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-amber-100 dark:border-gray-600">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Smartphone className="w-3 h-3" />
            Mobile
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Monitor className="w-3 h-3" />
            Desktop
          </div>
        </div>
      </CardContent>
    </Card>
  );
}