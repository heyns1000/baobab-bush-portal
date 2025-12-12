import { useState, useEffect } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Mic, 
  Settings, 
  BarChart3, 
  Calendar,
  Upload,
  Headphones,
  Globe,
  Users,
  Clock,
  TrendingUp,
  Edit,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  Star,
  Heart,
  MessageCircle,
  DollarSign,
  Zap,
  Award,
  Target
} from 'lucide-react';

export default function Creator() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Mock creator data
  const creatorProfile = {
    name: "Amara Kikwete",
    title: "Traditional Wisdom Keeper",
    treeHouse: "Tanzania Tree House",
    country: "Tanzania",
    bio: "Preserving centuries-old Maasai and Swahili oral traditions through modern podcasting.",
    followers: 12400,
    totalEpisodes: 87,
    totalListens: 245600,
    averageRating: 4.8,
    languages: ["Swahili", "English", "Maasai"],
    specialties: ["Traditional Stories", "Cultural Heritage", "Oral History"],
    joinDate: "March 2024",
    verified: true,
    achievements: [
      { title: "Cultural Ambassador", description: "Top 10% cultural content creator", icon: "🏆" },
      { title: "Story Master", description: "100+ traditional stories shared", icon: "📚" },
      { title: "Global Reach", description: "Content accessed in 45+ countries", icon: "🌍" }
    ]
  };

  const recentEpisodes = [
    {
      id: 'ep-001',
      title: 'The Legend of Mount Kilimanjaro',
      description: 'Ancient Maasai stories about the sacred mountain and its spiritual significance.',
      duration: '32 min',
      uploadDate: '2024-01-15',
      listens: 15600,
      likes: 1240,
      comments: 89,
      status: 'published',
      thumbnail: '🏔️'
    },
    {
      id: 'ep-002',
      title: 'Grandmother\'s Healing Songs',
      description: 'Traditional healing songs passed down through generations of Maasai women.',
      duration: '28 min',
      uploadDate: '2024-01-08',
      listens: 12300,
      likes: 987,
      comments: 67,
      status: 'published',
      thumbnail: '🎵'
    },
    {
      id: 'ep-003',
      title: 'The Baobab Tree Wisdom',
      description: 'Stories and teachings centered around the mighty baobab tree.',
      duration: '45 min',
      uploadDate: '2024-01-01',
      listens: 18900,
      likes: 1567,
      comments: 123,
      status: 'published',
      thumbnail: '🌳'
    }
  ];

  const analytics = {
    thisMonth: {
      totalListens: 45600,
      growth: '+23%',
      newFollowers: 567,
      followerGrowth: '+15%',
      averageSession: '28.5 min',
      sessionGrowth: '+8%',
      engagement: '94.2%',
      engagementGrowth: '+5%'
    },
    topCountries: [
      { country: 'Tanzania', percentage: 45, listeners: 20520 },
      { country: 'Kenya', percentage: 18, listeners: 8208 },
      { country: 'United States', percentage: 12, listeners: 5472 },
      { country: 'United Kingdom', percentage: 8, listeners: 3648 },
      { country: 'Canada', percentage: 6, listeners: 2736 },
      { country: 'Other', percentage: 11, listeners: 5016 }
    ]
  };

  const monetization = {
    thisMonth: {
      totalEarnings: 2450,
      currency: 'USD',
      subscribers: 340,
      subscriptionRevenue: 1700,
      donationRevenue: 450,
      sponsorshipRevenue: 300
    },
    payoutHistory: [
      { date: '2024-01-01', amount: 2450, status: 'paid' },
      { date: '2023-12-01', amount: 2180, status: 'paid' },
      { date: '2023-11-01', amount: 1950, status: 'paid' }
    ]
  };

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
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20 border-4 border-amber-200">
                    <AvatarImage src="/api/placeholder/amara-kikwete" />
                    <AvatarFallback className="bg-amber-100 text-amber-800 text-2xl font-bold">
                      AK
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                        {creatorProfile.name}
                      </h1>
                      {creatorProfile.verified && (
                        <Badge className="bg-blue-600 text-white">
                          ✓ Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-amber-600 dark:text-amber-200 mb-2">
                      {creatorProfile.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {creatorProfile.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Since {creatorProfile.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className={`${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'} text-white px-6`}
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Button>
                  <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Followers</p>
                        <p className="text-2xl font-bold text-amber-600">{creatorProfile.followers.toLocaleString()}</p>
                      </div>
                      <Users className="w-6 h-6 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Episodes</p>
                        <p className="text-2xl font-bold text-amber-600">{creatorProfile.totalEpisodes}</p>
                      </div>
                      <Headphones className="w-6 h-6 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Listens</p>
                        <p className="text-2xl font-bold text-amber-600">{creatorProfile.totalListens.toLocaleString()}</p>
                      </div>
                      <Play className="w-6 h-6 text-amber-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                        <p className="text-2xl font-bold text-amber-600">{creatorProfile.averageRating}</p>
                      </div>
                      <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="monetization">Monetization</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Performance */}
                  <Card className="lg:col-span-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-amber-600" />
                        This Month's Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Total Listens</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {analytics.thisMonth.growth}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-amber-600">
                            {analytics.thisMonth.totalListens.toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">New Followers</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {analytics.thisMonth.followerGrowth}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">
                            {analytics.thisMonth.newFollowers}
                          </div>
                        </div>

                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Avg Session</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {analytics.thisMonth.sessionGrowth}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            {analytics.thisMonth.averageSession}
                          </div>
                        </div>

                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Engagement</span>
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {analytics.thisMonth.engagementGrowth}
                            </Badge>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">
                            {analytics.thisMonth.engagement}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-600" />
                        Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {creatorProfile.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div>
                              <div className="font-medium text-amber-900 dark:text-amber-100">
                                {achievement.title}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {achievement.description}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Episodes */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Episodes</CardTitle>
                      <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEpisodes.map((episode) => (
                        <div key={episode.id} className="flex items-center gap-4 p-4 border border-amber-200 dark:border-gray-600 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors">
                          <div className="text-3xl">{episode.thumbnail}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                              {episode.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {episode.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {episode.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Headphones className="w-3 h-3" />
                                {episode.listens.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-3 h-3" />
                                {episode.likes}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {episode.comments}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monetization" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">Total Earnings</p>
                          <p className="text-2xl font-bold text-green-600">
                            ${monetization.thisMonth.totalEarnings.toLocaleString()}
                          </p>
                        </div>
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Subscribers</p>
                          <p className="text-2xl font-bold text-blue-600">{monetization.thisMonth.subscribers}</p>
                        </div>
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Subscriptions</p>
                          <p className="text-2xl font-bold text-purple-600">${monetization.thisMonth.subscriptionRevenue}</p>
                        </div>
                        <Target className="w-6 h-6 text-purple-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Donations</p>
                          <p className="text-2xl font-bold text-amber-600">${monetization.thisMonth.donationRevenue}</p>
                        </div>
                        <Heart className="w-6 h-6 text-amber-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Breakdown */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Revenue Breakdown</CardTitle>
                    <CardDescription>January 2024 earnings by source</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="font-medium">Subscriptions</span>
                        <span className="text-lg font-bold text-blue-600">
                          ${monetization.thisMonth.subscriptionRevenue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <span className="font-medium">Donations</span>
                        <span className="text-lg font-bold text-amber-600">
                          ${monetization.thisMonth.donationRevenue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="font-medium">Sponsorships</span>
                        <span className="text-lg font-bold text-green-600">
                          ${monetization.thisMonth.sponsorshipRevenue}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Other tab contents would go here */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Detailed Analytics
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Deep insights into your content performance and audience engagement
                  </p>
                </div>
                {/* Analytics content would go here */}
              </TabsContent>

              <TabsContent value="content" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Content Management
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Upload, edit, and manage your podcast episodes
                  </p>
                </div>
                {/* Content management would go here */}
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Community Engagement
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Connect with your audience and build relationships
                  </p>
                </div>
                {/* Community features would go here */}
              </TabsContent>

              <TabsContent value="profile" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Profile Settings
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Manage your creator profile and preferences
                  </p>
                </div>
                {/* Profile settings would go here */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}