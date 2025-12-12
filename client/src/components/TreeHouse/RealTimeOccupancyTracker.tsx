import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  Mic,
  Radio,
  Calendar
} from 'lucide-react';
import baobabLocations from '@/data/baobab-locations.json';

interface OccupancyData {
  tree_house_id: string;
  country: string;
  capacity: number;
  current_occupancy: number;
  trend: 'up' | 'down' | 'stable';
  peak_today: number;
  last_updated: string;
  active_podcasts: number;
  queue_length: number;
  avg_session_duration: number;
}

export default function RealTimeOccupancyTracker() {
  const [occupancyData, setOccupancyData] = useState<OccupancyData[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1h' | '6h' | '24h'>('6h');

  useEffect(() => {
    // Initialize occupancy data
    const initialData = baobabLocations.features
      .filter(f => f.properties.status === 'Active')
      .map(feature => {
        const currentOccupancy = Math.floor(Math.random() * feature.properties.podcast_capacity * 0.9);
        return {
          tree_house_id: feature.properties.tree_house_id,
          country: feature.properties.country,
          capacity: feature.properties.podcast_capacity,
          current_occupancy: currentOccupancy,
          trend: Math.random() > 0.5 ? (Math.random() > 0.5 ? 'up' : 'down') : 'stable' as 'up' | 'down' | 'stable',
          peak_today: Math.max(currentOccupancy, Math.floor(Math.random() * feature.properties.podcast_capacity)),
          last_updated: new Date().toISOString(),
          active_podcasts: Math.floor(Math.random() * 5) + 1,
          queue_length: Math.floor(Math.random() * 10),
          avg_session_duration: Math.floor(Math.random() * 120) + 30 // 30-150 minutes
        };
      });

    setOccupancyData(initialData);

    // Update data every 10 seconds
    const interval = setInterval(() => {
      setOccupancyData(prev => prev.map(item => {
        const change = Math.floor(Math.random() * 6) - 3; // -3 to +3
        const newOccupancy = Math.max(0, Math.min(item.capacity, item.current_occupancy + change));
        const newTrend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
        
        return {
          ...item,
          current_occupancy: newOccupancy,
          trend: newTrend,
          peak_today: Math.max(item.peak_today, newOccupancy),
          last_updated: new Date().toISOString(),
          active_podcasts: Math.max(0, item.active_podcasts + Math.floor(Math.random() * 3) - 1),
          queue_length: Math.max(0, item.queue_length + Math.floor(Math.random() * 4) - 2)
        };
      }));
      setLastUpdate(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return (current / capacity) * 100;
  };

  const getOccupancyStatus = (percentage: number) => {
    if (percentage >= 90) return { status: 'Critical', color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' };
    if (percentage >= 75) return { status: 'High', color: 'text-amber-600', bgColor: 'bg-amber-50 dark:bg-amber-900/20' };
    if (percentage >= 50) return { status: 'Moderate', color: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' };
    return { status: 'Low', color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' };
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return `${Math.floor(diffSecs / 3600)}h ago`;
  };

  const totalCapacity = occupancyData.reduce((sum, item) => sum + item.capacity, 0);
  const totalOccupancy = occupancyData.reduce((sum, item) => sum + item.current_occupancy, 0);
  const globalOccupancyPercentage = (totalOccupancy / totalCapacity) * 100;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl mr-3">📊</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100">
            Real-Time Occupancy Tracker
          </h2>
        </div>
        <p className="text-lg text-amber-600 dark:text-amber-200 max-w-2xl mx-auto">
          Monitor live capacity and activity across all tree house studios in real-time.
        </p>
      </div>

      {/* Global Overview */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-amber-900/20 border-amber-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-600" />
            Global Network Status
          </CardTitle>
          <CardDescription>
            Last updated: {lastUpdate.toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{totalOccupancy}</div>
              <div className="text-sm text-muted-foreground">Active Podcasters</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{totalCapacity}</div>
              <div className="text-sm text-muted-foreground">Total Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{globalOccupancyPercentage.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Network Utilization</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">{occupancyData.length}</div>
              <div className="text-sm text-muted-foreground">Active Tree Houses</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Global Network Capacity</span>
              <span>{totalOccupancy}/{totalCapacity} occupied</span>
            </div>
            <Progress value={globalOccupancyPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Timeframe Selection */}
      <div className="flex justify-center">
        <div className="flex gap-2 p-1 bg-amber-100 dark:bg-gray-700 rounded-lg">
          {(['1h', '6h', '24h'] as const).map((timeframe) => (
            <Button
              key={timeframe}
              size="sm"
              variant={selectedTimeframe === timeframe ? 'default' : 'ghost'}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={selectedTimeframe === timeframe ? 'bg-amber-600 hover:bg-amber-700' : ''}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      {/* Individual Tree House Occupancy */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {occupancyData.map((item) => {
          const percentage = getOccupancyPercentage(item.current_occupancy, item.capacity);
          const statusInfo = getOccupancyStatus(percentage);
          
          return (
            <Card 
              key={item.tree_house_id} 
              className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700"
              data-testid={`occupancy-${item.tree_house_id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.country}</CardTitle>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(item.trend)}
                    <Badge 
                      variant="outline" 
                      className={`${statusInfo.color} border-current`}
                    >
                      {statusInfo.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Occupancy Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Current Occupancy
                    </span>
                    <span className="font-medium">
                      {item.current_occupancy}/{item.capacity}
                    </span>
                  </div>
                  <Progress 
                    value={percentage} 
                    className={`h-3 ${statusInfo.bgColor}`}
                  />
                  <div className="text-xs text-muted-foreground">
                    {percentage.toFixed(1)}% capacity • {item.capacity - item.current_occupancy} spaces available
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Radio className="w-3 h-3" />
                      Live Podcasts
                    </span>
                    <span className="font-medium">{item.active_podcasts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Avg Session
                    </span>
                    <span className="font-medium">{item.avg_session_duration}m</span>
                  </div>
                </div>

                {/* Peak and Queue Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Peak Today:</span>
                    <span className="font-medium">{item.peak_today}/{item.capacity}</span>
                  </div>
                  
                  {item.queue_length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <AlertCircle className="w-3 h-3" />
                        Queue Length:
                      </span>
                      <Badge variant="outline" className="text-amber-600 border-amber-200">
                        {item.queue_length} waiting
                      </Badge>
                    </div>
                  )}

                  {item.queue_length === 0 && percentage < 90 && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Available now
                    </div>
                  )}
                </div>

                {/* Last Updated */}
                <div className="text-xs text-muted-foreground border-t pt-2">
                  Updated {formatLastUpdated(item.last_updated)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts */}
      {occupancyData.some(item => getOccupancyPercentage(item.current_occupancy, item.capacity) >= 90) && (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">High Capacity Alert</span>
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              Some tree houses are at critical capacity. Consider directing new users to less occupied locations.
            </p>
          </CardContent>
        </Card>
      )}

      {/* View Full Analytics Button */}
      <div className="text-center pt-6">
        <Button 
          size="lg" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-8"
          data-testid="button-view-analytics"
        >
          <Activity className="w-5 h-5 mr-2" />
          View Detailed Analytics
        </Button>
      </div>
    </div>
  );
}