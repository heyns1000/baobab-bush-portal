import { useOfflineSync } from '@/hooks/useOfflineSync';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WifiOff, Wifi, RefreshCw, AlertCircle } from 'lucide-react';

export default function OfflineIndicator() {
  const { isOnline, hasPendingSync, syncPendingData } = useOfflineSync();

  if (isOnline && !hasPendingSync) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50">
      {!isOnline ? (
        <Badge variant="destructive" className="flex items-center gap-2 p-3 bg-red-600 text-white">
          <WifiOff className="w-4 h-4" />
          <span>Offline Mode</span>
        </Badge>
      ) : hasPendingSync ? (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-2 p-3 bg-yellow-50 text-yellow-800 border-yellow-200">
            <AlertCircle className="w-4 h-4" />
            <span>Syncing changes...</span>
          </Badge>
          <Button
            size="sm"
            variant="outline"
            onClick={syncPendingData}
            className="border-yellow-200 hover:bg-yellow-50"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}