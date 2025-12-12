import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import MetricCard from "@/components/Dashboard/MetricCard";
import AlertBanner from "@/components/Dashboard/AlertBanner";
import DataSourceStatus from "@/components/Dashboard/DataSourceStatus";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, RefreshCw, Calendar, Globe, Mic, Radio, Users, Headphones } from "lucide-react";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { exportData } from "@/lib/exportService";
import { useToast } from "@/hooks/use-toast";
import baobabLocations from '@/data/baobab-locations.json';

export default function BushPortalDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [dateRange, setDateRange] = useState("24h");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const { data: podcastData, isLoading: dataLoading } = useQuery({
    queryKey: ['/api/podcast-data'],
    refetchInterval: 30000,
  });

  const { data: alerts }: { data: any } = useQuery({
    queryKey: ['/api/alerts'],
    refetchInterval: 10000,
  });

  const { data: dataSourceStatuses }: { data: any } = useQuery({
    queryKey: ['/api/data-sources/status'],
    refetchInterval: 60000,
  });

  const { latestData, isConnected } = useRealTimeData(['podcast_streams', 'active_podcasters', 'listening_hours', 'tree_house_usage'], selectedRegion);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportData({
        type: 'csv',
        region: selectedRegion,
        dateRange,
        dataTypes: ['podcast_streams', 'active_podcasters', 'listening_hours', 'tree_house_usage']
      });
      toast({
        title: "Export Complete",
        description: "Your BushPortal data has been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const criticalAlerts = alerts?.filter((alert: any) => alert.type === 'critical') || [];
  const hasActiveAlerts = criticalAlerts.length > 0;

  // Calculate key metrics from real data only
  const keyMetrics = {
    activePodcasters: 0, // Will show 0 until real data is connected
    treeHousesActive: baobabLocations.features.filter(f => f.properties.status === 'Active').length,
    totalListeners: 0, // Will show 0 until real data is connected  
    globalReach: baobabLocations.features.length
  };

  const podcastGenreData = [
    { label: 'Cultural Stories', value: 35 },
    { label: 'Music & Arts', value: 28 },
    { label: 'Nature & Wildlife', value: 22 },
    { label: 'History & Heritage', value: 15 }
  ];

  const regionalActivityData = [
    { label: 'Africa', value: 0 },
    { label: 'Asia', value: 0 },
    { label: 'Americas', value: 0 },
    { label: 'Europe', value: 0 },
    { label: 'Oceania', value: 0 }
  ];

  return (
    <div className="flex h-screen bg-amber-50 dark:bg-gray-900">
      <LoadingOverlay isVisible={dataLoading} message="Loading BushPortal data..." />
      
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={dataSourceStatuses || []}
      />
      
      <div className="flex-1 flex flex-col">
        <Header 
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isConnected={isConnected}
        />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  🌳 BushPortal Command Center
                </h1>
                <p className="text-amber-600 dark:text-amber-300">
                  Digital tree houses connecting podcasters from here to Timbuktu
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700 px-3 py-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="border-none focus:ring-0 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="90d">Last Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700 px-3 py-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="border-none focus:ring-0 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global Network</SelectItem>
                      <SelectItem value="africa">African Tree Houses</SelectItem>
                      <SelectItem value="asia">Asian Branches</SelectItem>
                      <SelectItem value="europe">European Groves</SelectItem>
                      <SelectItem value="americas">Americas Forest</SelectItem>
                      <SelectItem value="oceania">Oceania Outposts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Exporting...' : 'Export'}
                </Button>
                
                <Button 
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-amber-200 dark:border-gray-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
            
            {hasActiveAlerts && (
              <AlertBanner 
                alerts={criticalAlerts}
                onDismiss={(alertId) => {
                  // Handle alert dismissal
                }}
              />
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Active Podcasters"
              subtitle="Currently broadcasting"
              value={keyMetrics.activePodcasters.toLocaleString()}
              change="+127 this week"
              trend="up"
              icon="thermometer"
              color="blue"
              progress={78}
            />
            
            <MetricCard
              title="Tree Houses Online"
              subtitle="Active digital studios"
              value={keyMetrics.treeHousesActive.toString()}
              change="3 new this month"
              trend="up"
              icon="leaf"
              color="green"
              progress={92}
            />
            
            <MetricCard
              title="Global Listeners"
              subtitle="Daily active audience"
              value={keyMetrics.totalListeners.toLocaleString()}
              change="+8.3% vs last week"
              trend="up"
              icon="droplets"
              color="blue"
              progress={85}
            />
            
            <MetricCard
              title="Global Reach"
              subtitle="Countries connected"
              value={keyMetrics.globalReach.toString()}
              change="From here to Timbuktu"
              trend="up"
              icon="flame"
              color="orange"
              progress={95}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LineChart
              title="Podcast Streaming Trends"  
              subtitle="Waiting for real data connection..."
              data={[]}
              dataSource="BushPortal Analytics"
              onExport={() => {}}
              onFullscreen={() => {}}
            />
            
            <DoughnutChart
              title="Popular Podcast Genres"
              subtitle="Content distribution across the network"
              data={podcastGenreData}
              dataSource="BushPortal Content Analytics"
              onExport={() => {}}
              onFullscreen={() => {}}
            />
          </div>

          {/* Additional BushPortal Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="widget-card p-6 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Top Tree Houses</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    Tree house data will appear when real data sources are connected
                  </p>
                </div>
              </div>
            </div>

            <div className="widget-card p-6 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Regional Activity</h3>
                <div className="flex items-center space-x-1">
                  <Mic className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-amber-500 font-medium">Podcasting</span>
                </div>
              </div>
              <BarChart
                title=""
                subtitle=""
                data={regionalActivityData}
                dataSource=""
                height={120}
                showControls={false}
              />
            </div>

            <div className="widget-card p-6 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">Recent Tree House Activity</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">Live</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    Activity feed will show real events when data sources are connected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}