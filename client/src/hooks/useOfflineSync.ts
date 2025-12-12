import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SyncData {
  favorites: string[];
  listenHistory: Array<{
    podcastId: string;
    timestamp: number;
    position: number;
  }>;
  userPreferences: {
    theme: string;
    language: string;
    autoPlay: boolean;
    downloadQuality: string;
  };
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasPendingSync, setHasPendingSync] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "You're offline",
        description: "Data will sync when connection is restored",
        variant: "default",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for pending sync data on mount
    checkPendingSync();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkPendingSync = () => {
    const pendingData = localStorage.getItem('bushportal-pending-sync');
    setHasPendingSync(!!pendingData);
  };

  const syncPendingData = async () => {
    const pendingData = localStorage.getItem('bushportal-pending-sync');
    if (!pendingData) return;

    try {
      const data: SyncData = JSON.parse(pendingData);
      
      // Sync with server
      await fetch('/api/sync/offline-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Clear pending data on successful sync
      localStorage.removeItem('bushportal-pending-sync');
      setHasPendingSync(false);
      
      toast({
        title: "Data synced",
        description: "Your offline changes have been saved",
        variant: "default",
      });
    } catch (error) {
      console.error('Sync failed:', error);
      toast({
        title: "Sync failed",
        description: "Will retry when connection improves",
        variant: "destructive",
      });
    }
  };

  const saveForSync = (data: Partial<SyncData>) => {
    const existingData = localStorage.getItem('bushportal-pending-sync');
    const currentData: SyncData = existingData 
      ? JSON.parse(existingData)
      : { favorites: [], listenHistory: [], userPreferences: {} };

    const updatedData = { ...currentData, ...data };
    localStorage.setItem('bushportal-pending-sync', JSON.stringify(updatedData));
    setHasPendingSync(true);

    // Try to sync immediately if online
    if (isOnline) {
      syncPendingData();
    }
  };

  return {
    isOnline,
    hasPendingSync,
    saveForSync,
    syncPendingData,
  };
}

// Service Worker for offline functionality
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};