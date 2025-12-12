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
import { Download, RefreshCw, Calendar, Globe } from "lucide-react";
import { useRealTimeData } from "@/hooks/useRealTimeData";
import { exportData } from "@/lib/exportService";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [dateRange, setDateRange] = useState("24h");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const { data: environmentalData, isLoading: dataLoading } = useQuery({
    queryKey: ['/api/environmental-data'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: alerts }: { data: any } = useQuery({
    queryKey: ['/api/alerts'],
    refetchInterval: 10000, // Check alerts every 10 seconds
  });

  const { data: dataSourceStatuses }: { data: any } = useQuery({
    queryKey: ['/api/data-sources/status'],
    refetchInterval: 60000, // Check data sources every minute
  });

  const { latestData, isConnected } = useRealTimeData(['temperature', 'deforestation', 'water_quality', 'air_quality'], selectedRegion);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportData({
        type: 'csv',
        region: selectedRegion,
        dateRange,
        dataTypes: ['temperature', 'deforestation', 'water_quality', 'air_quality']
      });
      toast({
        title: "Export Complete",
        description: "Your data has been exported successfully.",
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

  // Calculate key metrics from latest data
  const keyMetrics = {
    temperature: latestData.find(d => d.dataType === 'temperature')?.value || 1.42,
    deforestation: latestData.find(d => d.dataType === 'deforestation')?.value || 28470,
    waterStress: latestData.find(d => d.dataType === 'water_quality')?.value || 0.64,
    renewableEnergy: 34.7 // This would come from energy data
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <LoadingOverlay isVisible={dataLoading} message="Loading environmental data..." />
      
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
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Environmental Intelligence Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring of global environmental indicators and security threats
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
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
                
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="border-none focus:ring-0 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="south-america">South America</SelectItem>
                      <SelectItem value="oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isExporting ? 'Exporting...' : 'Export'}
                </Button>
                
                <Button 
                  onClick={handleRefresh}
                  variant="outline"
                  className="border-gray-200 dark:border-gray-700"
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
              title="Global Temperature"
              subtitle="Anomaly from baseline"
              value={`+${keyMetrics.temperature}°C`}
              change="+0.08°C this month"
              trend="up"
              icon="thermometer"
              color="red"
              progress={71}
            />
            
            <MetricCard
              title="Deforestation Rate"
              subtitle="Hectares per day"
              value={keyMetrics.deforestation.toLocaleString()}
              change="+47% vs last month"
              trend="up"
              icon="flame"
              color="red"
              progress={85}
            />
            
            <MetricCard
              title="Water Stress Index"
              subtitle="Global average"
              value={keyMetrics.waterStress.toString()}
              change="+12% vs last year"
              trend="up"
              icon="droplets"
              color="orange"
              progress={64}
            />
            
            <MetricCard
              title="Renewable Energy"
              subtitle="% of global consumption"
              value={`${keyMetrics.renewableEnergy}%`}
              change="+3.2% vs last year"
              trend="up"
              icon="leaf"
              color="green"
              progress={35}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <LineChart
              title="Global Deforestation Trends"
              subtitle="Real-time forest loss monitoring via satellite"
              data={environmentalData?.filter((d: any) => d.dataType === 'deforestation') || []}
              dataSource="NASA MODIS"
              onExport={() => {}}
              onFullscreen={() => {}}
            />
            
            <DoughnutChart
              title="Ocean Plastic Concentration"
              subtitle="Microplastic density by ocean region"
              data={[
                { label: 'Pacific', value: 45 },
                { label: 'Atlantic', value: 28 },
                { label: 'Indian', value: 18 },
                { label: 'Arctic', value: 9 }
              ]}
              dataSource="Ocean Cleanup Foundation"
              onExport={() => {}}
              onFullscreen={() => {}}
            />
          </div>

          {/* Additional Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="widget-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wildlife Protection</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-red-500 font-medium">Critical</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🐘</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">African Elephants</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Population trend</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-600 dark:text-red-400">-18.3%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">vs 2020</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="widget-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Air Quality Index</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs text-yellow-500 font-medium">Moderate</span>
                </div>
              </div>
              <BarChart
                title=""
                subtitle=""
                data={[
                  { label: 'Beijing', value: 167 },
                  { label: 'Delhi', value: 198 },
                  { label: 'Los Angeles', value: 87 },
                  { label: 'Stockholm', value: 32 }
                ]}
                dataSource=""
                height={120}
                showControls={false}
              />
            </div>

            <div className="widget-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent AI Interventions</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-500 font-medium">Active</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4 bg-green-600 dark:bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Poaching Prevention</span>
                  </div>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    Detected suspicious activity in Kruger National Park. Ranger team dispatched.
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">23 minutes ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
