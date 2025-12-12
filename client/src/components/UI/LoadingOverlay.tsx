import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export default function LoadingOverlay({ isVisible, message = "Loading..." }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex items-center space-x-4 shadow-xl">
        <Loader2 className="h-8 w-8 border-b-2 border-primary-600 animate-spin" />
        <span className="text-gray-700 dark:text-gray-300 font-medium">{message}</span>
      </div>
    </div>
  );
}
