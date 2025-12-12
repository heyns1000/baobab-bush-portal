import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import OfflineIndicator from "./OfflineIndicator";
import { 
  Menu, 
  Bell, 
  Sun, 
  Moon, 
  Settings, 
  Download, 
  LogOut, 
  User,
  ChevronDown 
} from "lucide-react";

interface HeaderProps {
  onSidebarToggle: () => void;
  isConnected?: boolean;
}

export default function Header({ onSidebarToggle, isConnected = true }: HeaderProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { data: alerts } = useQuery({
    queryKey: ['/api/alerts', { unreadOnly: true }],
    refetchInterval: 10000,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: async (preferences: any) => {
      await apiRequest('PATCH', '/api/user/preferences', preferences);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update Failed",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme();
    updatePreferencesMutation.mutate({ theme: newTheme });
  };

  const unreadAlertsCount = alerts?.length || 0;

  return (
    <>
      <OfflineIndicator />
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={onSidebarToggle}
            >
              <Menu className="w-6 h-6" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🌳</div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  BushPortal™
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Global Podcasting Network
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Real-time data status indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
                {isConnected ? 'Live Data' : 'Offline'}
              </span>
            </div>
            
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeToggle}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative text-gray-400 hover:text-gray-500"
            >
              <Bell className="w-5 h-5" />
              {unreadAlertsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
                </Badge>
              )}
            </Button>
            
            {/* User menu */}
            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || 'User'} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Custom Alerts
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.location.href = '/api/logout'}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
    </>
  );
}
