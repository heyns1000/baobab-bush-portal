import { useState } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  TrendingUp,
  Globe,
  Users,
  Radio,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  Filter,
  Zap,
  MapPin,
  Languages,
  Clock,
  Headphones,
  Heart,
  Share2
} from 'lucide-react';

export default function Analytics() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [showRegionFilter, setShowRegionFilter] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const { toast } = useToast();

  const handleFilterRegions = () => {
    setShowRegionFilter(!showRegionFilter);
    toast({
      title: showRegionFilter ? "Showing all regions" : "Region filter active",
      description: showRegionFilter ? "Displaying data from all regions" : "Select regions to filter",
    });
  };

  const handleMapView = () => {
    setViewMode(viewMode === 'list' ? 'map' : 'list');
    toast({
      title: viewMode === 'list' ? "Map View" : "List View",
      description: viewMode === 'list' ? "Showing regional data on map" : "Showing regional data as list",
    });
  };

  // Mock analytics data
  const globalStats = {
    totalListeners: 156847,
    activeTreeHouses: 47,
    livePodcasts: 23,
    countriesActive: 32,
    totalHours: 89456,
    averageSession: 28.5,
    topLanguages: [
      { language: 'English', percentage: 34, listeners: 53208 },
      { language: 'Spanish', percentage: 18, listeners: 28233 },
      { language: 'French', percentage: 12, listeners: 18822 },
      { language: 'Arabic', percentage: 10, listeners: 15685 },
      { language: 'Swahili', percentage: 8, listeners: 12548 },
      { language: 'Portuguese', percentage: 6, listeners: 9411 },
      { language: 'Mandarin', percentage: 5, listeners: 7842 },
      { language: 'Other', percentage: 7, listeners: 10098 }
    ]
  };

  const trendingContent = [
    {
      title: 'Climate Stories from the Sahel',
      country: 'Mali',
      category: 'Environment',
      growth: '+234%',
      listeners: 15600,
      engagement: 94,
      shareRate: 23.5,
      culturalImpact: 'High'
    },
    {
      title: 'Tech Innovation in Lagos',
      country: 'Nigeria',
      category: 'Technology',
      growth: '+189%',
      listeners: 22100,
      engagement: 87,
      shareRate: 31.2,
      culturalImpact: 'Medium'
    },
    {
      title: 'Maasai Wisdom for Modern Life',
      country: 'Kenya',
      category: 'Culture',
      growth: '+156%',
      listeners: 18750,
      engagement: 96,
      shareRate: 28.9,
      culturalImpact: 'Very High'
    }
  ];

  const regionalData = [
    { region: 'West Africa', listeners: 45200, growth: '+23%', podcasts: 156, languages: 8 },
    { region: 'East Africa', listeners: 38700, growth: '+19%', podcasts: 134, languages: 6 },
    { region: 'North America', listeners: 34500, growth: '+15%', podcasts: 89, languages: 4 },
    { region: 'Europe', listeners: 23400, growth: '+12%', podcasts: 67, languages: 9 },
    { region: 'Asia Pacific', listeners: 15000, growth: '+31%', podcasts: 45, languages: 7 }
  ];

  const culturalEngagement = [
    { topic: 'Traditional Stories', engagement: 94.2, growth: '+45%', reach: 67 },
    { topic: 'Modern Culture', engagement: 87.8, growth: '+23%', reach: 89 },
    { topic: 'Language Learning', engagement: 91.5, growth: '+67%', reach: 78 },
    { topic: 'Music & Arts', engagement: 89.3, growth: '+34%', reach: 82 },
    { topic: 'Environmental Stories', engagement: 96.1, growth: '+78%', reach: 91 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          dataSourceStatuses={[]}
        />
        
        <main className="flex-1 ml-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl mr-4">📊</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Analytics & Insights
                  </h1>
                  <p className="text-xl text-amber-600 dark:text-amber-200">
                    Real-time Global Network Intelligence
                  </p>
                </div>
              </div>

              {/* Time Range Selector */}
              <div className="flex justify-center items-center gap-4 mb-8">
                <span className="text-sm text-muted-foreground">Time Range:</span>
                {['24h', '7d', '30d', '90d'].map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? 'default' : 'outline'}
                    onClick={() => setTimeRange(range)}
                    className={timeRange === range ? 'bg-amber-600 hover:bg-amber-700' : 'border-amber-200 hover:bg-amber-50'}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>

            {/* Global Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Listeners</p>
                      <p className="text-3xl font-bold text-amber-600">{globalStats.totalListeners.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">+12.5%</span>
                    <span className="text-muted-foreground ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Tree Houses</p>
                      <p className="text-3xl font-bold text-amber-600">{globalStats.activeTreeHouses}</p>
                    </div>
                    <Radio className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">+8.2%</span>
                    <span className="text-muted-foreground ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Live Podcasts</p>
                      <p className="text-3xl font-bold text-amber-600">{globalStats.livePodcasts}</p>
                    </div>
                    <Activity className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">+15.7%</span>
                    <span className="text-muted-foreground ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Countries Active</p>
                      <p className="text-3xl font-bold text-amber-600">{globalStats.countriesActive}</p>
                    </div>
                    <Globe className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">+6.3%</span>
                    <span className="text-muted-foreground ml-1">vs last period</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="global" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="global">Global Overview</TabsTrigger>
                <TabsTrigger value="content">Content Performance</TabsTrigger>
                <TabsTrigger value="cultural">Cultural Impact</TabsTrigger>
                <TabsTrigger value="regional">Regional Insights</TabsTrigger>
                <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
              </TabsList>

              <TabsContent value="global" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Language Distribution */}
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Languages className="w-5 h-5 text-amber-600" />
                        Language Distribution
                      </CardTitle>
                      <CardDescription>Listener breakdown by language</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {globalStats.topLanguages.map((lang, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{lang.language}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">{lang.listeners.toLocaleString()}</span>
                                <span className="text-sm font-medium">{lang.percentage}%</span>
                              </div>
                            </div>
                            <Progress value={lang.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Listening Patterns */}
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-600" />
                        Global Listening Patterns
                      </CardTitle>
                      <CardDescription>Peak listening times by region</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <span className="font-medium">Total Hours Listened</span>
                          <span className="text-lg font-bold text-amber-600">{globalStats.totalHours.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="font-medium">Average Session</span>
                          <span className="text-lg font-bold text-blue-600">{globalStats.averageSession} min</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="font-medium">Peak Hour</span>
                          <span className="text-lg font-bold text-green-600">19:00 UTC</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Trending Content Performance
                  </h2>
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                    <Zap className="w-4 h-4 mr-1" />
                    Real-time Data
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {trendingContent.map((content, idx) => (
                    <Card key={idx} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100">{content.title}</h3>
                            <p className="text-sm text-muted-foreground">{content.country} • {content.category}</p>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {content.growth}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Headphones className="w-4 h-4 text-amber-600 mr-1" />
                              <span className="text-sm text-muted-foreground">Listeners</span>
                            </div>
                            <div className="text-lg font-semibold">{content.listeners.toLocaleString()}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Heart className="w-4 h-4 text-red-500 mr-1" />
                              <span className="text-sm text-muted-foreground">Engagement</span>
                            </div>
                            <div className="text-lg font-semibold">{content.engagement}%</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Share2 className="w-4 h-4 text-blue-500 mr-1" />
                              <span className="text-sm text-muted-foreground">Share Rate</span>
                            </div>
                            <div className="text-lg font-semibold">{content.shareRate}%</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-1">
                              <Globe className="w-4 h-4 text-green-500 mr-1" />
                              <span className="text-sm text-muted-foreground">Cultural Impact</span>
                            </div>
                            <div className="text-sm font-semibold">
                              <Badge variant={content.culturalImpact === 'Very High' ? 'default' : 'secondary'}>
                                {content.culturalImpact}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cultural" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Cultural Engagement Metrics
                  </h2>
                  <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {culturalEngagement.map((item, idx) => (
                    <Card key={idx} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-4">{item.topic}</h3>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Engagement Rate</span>
                              <span className="font-medium">{item.engagement}%</span>
                            </div>
                            <Progress value={item.engagement} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Global Reach</span>
                              <span className="font-medium">{item.reach} countries</span>
                            </div>
                            <Progress value={(item.reach / 120) * 100} className="h-2" />
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-sm text-muted-foreground">Growth</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {item.growth}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="regional" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100">
                    Regional Performance
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-amber-200 hover:bg-amber-50 ${showRegionFilter ? 'bg-amber-100' : ''}`}
                      onClick={handleFilterRegions}
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      {showRegionFilter ? 'Clear Filter' : 'Filter Regions'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`border-amber-200 hover:bg-amber-50 ${viewMode === 'map' ? 'bg-amber-100' : ''}`}
                      onClick={handleMapView}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {viewMode === 'map' ? 'List View' : 'Map View'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionalData.map((region, idx) => (
                    <Card key={idx} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-amber-900 dark:text-amber-100">{region.region}</h3>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {region.growth}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Listeners</span>
                            <span className="font-medium">{region.listeners.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Podcasts</span>
                            <span className="font-medium">{region.podcasts}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Languages</span>
                            <span className="font-medium">{region.languages}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="predictions" className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">🔮</div>
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    AI-Powered Predictions
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200 mb-8">
                    Machine learning insights for content strategy and network growth
                  </p>
                </div>

                {/* AI Predictions content would go here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-purple-600" />
                        <h3 className="font-semibold">Content Trend Prediction</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        AI predicts "Climate Adaptation Stories" will grow 340% over next 30 days based on current engagement patterns.
                      </p>
                      <Badge variant="outline" className="text-purple-600 border-purple-200">
                        95% Confidence
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Globe className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold">Geographic Expansion</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Model suggests focusing on Southeast Asia and South America for next quarter expansion.
                      </p>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        87% Confidence
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}