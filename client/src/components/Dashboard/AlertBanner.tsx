import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Alert } from "@shared/schema";

interface AlertBannerProps {
  alerts: Alert[];
  onDismiss: (alertId: number) => void;
}

export default function AlertBanner({ alerts, onDismiss }: AlertBannerProps) {
  if (alerts.length === 0) return null;

  const primaryAlert = alerts[0];

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 animate-fade-in">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            {primaryAlert.title}
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mt-1">
            {primaryAlert.description}{' '}
            <button className="font-medium underline hover:no-underline">
              View Details →
            </button>
          </p>
          {alerts.length > 1 && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
              +{alerts.length - 1} more critical alert{alerts.length > 2 ? 's' : ''}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDismiss(primaryAlert.id)}
          className="text-red-400 hover:text-red-600 -mr-2 -mt-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
