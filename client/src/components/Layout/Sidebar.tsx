import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import DataSourceStatus from "@/components/Dashboard/DataSourceStatus";
import type { DataSourceStatus as DataSourceStatusType } from "@shared/schema";
import {
  LayoutDashboard,
  TreePine,
  Radio,
  Mic,
  Headphones,
  Home,
  Globe,
  Users,
  MapPin,
  Podcast,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  dataSourceStatuses: DataSourceStatusType[];
  activeSection?: string;
}

const navigationItems = [
  { 
    href: "/", 
    label: "BushPortal Home", 
    icon: TreePine,
    section: "home"
  },
  { 
    href: "/tree-houses", 
    label: "Digital Tree Houses", 
    icon: Home,
    section: "tree-houses",
    alertCount: 16  // Number of active tree houses
  },
  { 
    href: "/dashboard", 
    label: "Command Center", 
    icon: LayoutDashboard,
    section: "dashboard"
  },
  { 
    href: "/live-podcasts", 
    label: "Live Podcasts", 
    icon: Radio,
    section: "live",
    alertCount: 47  // Number of live streams
  },
  { 
    href: "/podcast-studios", 
    label: "Podcast Studios", 
    icon: Mic,
    section: "studios"
  },
  { 
    href: "/community", 
    label: "Podcaster Community", 
    icon: Users,
    section: "community"
  },
  { 
    href: "/global-map", 
    label: "Global Network Map", 
    icon: Globe,
    section: "map"
  },
  { 
    href: "/content-discovery", 
    label: "Content Discovery", 
    icon: Headphones,
    section: "discovery"
  },
  { 
    href: "/featured-locations", 
    label: "Featured Locations", 
    icon: MapPin,
    section: "locations"
  },
  { 
    href: "/podcast-analytics", 
    label: "Analytics & Insights", 
    icon: Podcast,
    section: "analytics"
  },
  { 
    href: "/wow-factors", 
    label: "Wow Factors", 
    icon: Sparkles,
    section: "wow-factors"
  },
];

export default function Sidebar({ collapsed, dataSourceStatuses, activeSection }: SidebarProps) {
  const [location] = useLocation();
  
  // Mock BushPortal status data - in real app would come from API
  const bushPortalStatus = {
    livePodcasts: 47,
    activePodcasters: 1247,
    treeHousesOnline: 16
  };

  return (
    <aside className={cn(
      "sidebar bg-white dark:bg-gray-900 w-64 border-r border-gray-200 dark:border-gray-700 fixed lg:relative h-full z-20 lg:z-0 transition-transform duration-300",
      collapsed && "transform -translate-x-full lg:-translate-x-0"
    )}>
      <div className="p-4 h-full overflow-y-auto">
        {/* Quick stats overview */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
            🌳 Network Status
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Live Podcasts</span>
              <span className="text-sm font-bold text-green-700 dark:text-green-400">
                🎙️ {bushPortalStatus.livePodcasts}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Active Podcasters</span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                👥 {bushPortalStatus.activePodcasters.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400">Tree Houses Online</span>
              <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
                🏠 {bushPortalStatus.treeHousesOnline}
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard navigation */}
        <nav className="space-y-1">
          <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
            🎧 BushPortal Network
          </h3>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section || 
              (item.section === "overview" && location === "/");
            
            return (
              <Link
                key={item.section}
                href={item.href}
                className={cn(
                  "nav-item flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                  isActive
                    ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border-l-4 border-amber-600"
                    : "text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800"
                )}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
                {item.alertCount && (
                  <Badge variant="destructive" className="ml-auto text-xs px-2 py-0.5">
                    {item.alertCount}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Data sources status */}
        <div className="mt-8 pt-4 border-t border-amber-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-3">
            🌍 Connected Regions
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Africa</span>
              <span className="text-green-600 font-medium">🟢 12 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Asia</span>
              <span className="text-green-600 font-medium">🟢 8 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Americas</span>
              <span className="text-green-600 font-medium">🟢 5 active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Europe</span>
              <span className="text-yellow-600 font-medium">🟡 3 active</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
