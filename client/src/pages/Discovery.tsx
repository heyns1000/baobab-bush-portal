import { useState, useEffect } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Globe, 
  Heart,
  Play,
  Bookmark,
  Share2,
  Languages,
  Zap,
  Filter,
  Clock,
  Users,
  Star,
  Download,
  Headphones
} from 'lucide-react';

export default function Discovery() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Mock AI-powered recommendations
  const aiRecommendations = [
    {
      id: 'rec-001',
      title: 'Stories from the Sahel',
      host: 'Aminata Traoré',
      country: 'Mali',
      description: 'Traditional griot stories reimagined for modern audiences, connecting ancient wisdom with contemporary life.',
      tags: ['Culture', 'Tradition', 'Storytelling'],
      aiReason: 'Based on your interest in African culture and traditional narratives',
      listeners: 15600,
      rating: 4.8,
      duration: '35 min',
      language: 'French/Bambara',
      culturalContext: 'Griots are traditional West African historians, storytellers, and musicians.',
      thumbnail: '🏺'
    },
    {
      id: 'rec-002',
      title: 'Digital Nomads of Madagascar',
      host: 'Hery Rasolofo',
      country: 'Madagascar',
      description: 'Tech entrepreneurs building global businesses from the unique biodiversity hotspot of Madagascar.',
      tags: ['Technology', 'Business', 'Innovation'],
      aiReason: 'Matches your entrepreneurship interests and unique cultural perspectives',
      listeners: 12300,
      rating: 4.6,
      duration: '42 min',
      language: 'English/Malagasy',
      culturalContext: 'Madagascar\'s isolation has fostered unique innovation approaches.',
      thumbnail: '💻'
    },
    {
      id: 'rec-003',
      title: 'Arctic Voices Rising',
      host: 'Aput Qimmiq',
      country: 'Canada (Inuit)',
      description: 'Indigenous perspectives on climate change from those witnessing it firsthand in the Arctic.',
      tags: ['Environment', 'Indigenous', 'Climate'],
      aiReason: 'Recommended for global environmental awareness',
      listeners: 28900,
      rating: 4.9,
      duration: '50 min',
      language: 'English/Inuktitut',
      culturalContext: 'Inuit communities have observed climate change for generations.',
      thumbnail: '❄️'
    }
  ];

  const trendingTopics = [
    { topic: 'Climate Adaptation Stories', growth: '+156%', countries: 23 },
    { topic: 'Digital Culture Bridge', growth: '+89%', countries: 15 },
    { topic: 'Grandmother\'s Wisdom', growth: '+67%', countries: 31 },
    { topic: 'Urban Migration Tales', growth: '+45%', countries: 18 },
    { topic: 'Food as Identity', growth: '+78%', countries: 27 }
  ];

  const languages = ['All', 'English', 'Spanish', 'French', 'Arabic', 'Swahili', 'Mandarin', 'Portuguese', 'Hindi'];
  const genres = ['All', 'Culture', 'Technology', 'Environment', 'Business', 'Arts', 'History', 'Health'];

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
                <div className="text-5xl mr-4">🔍</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Content Discovery
                  </h1>
                  <p className="text-xl text-amber-600 dark:text-amber-200">
                    AI-Powered Recommendations from 120+ Countries
                  </p>
                </div>
              </div>

              {/* Smart Search */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                  <Input
                    placeholder="Search by topic, culture, language, or ask AI for recommendations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg border-amber-200 dark:border-gray-600 focus:border-amber-400 rounded-2xl"
                    data-testid="input-smart-search"
                  />
                  <Button 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700"
                    data-testid="button-ai-search"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    AI Search
                  </Button>
                </div>

                {/* Filter Row */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <select 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="px-4 py-2 border border-amber-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                  
                  <select 
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="px-4 py-2 border border-amber-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>

                  <Button variant="outline" className="border-amber-200 hover:bg-amber-50">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </div>

            <Tabs defaultValue="recommendations" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="cultural">Cultural Spotlight</TabsTrigger>
                <TabsTrigger value="personalized">For You</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-amber-600" />
                    AI-Powered Recommendations
                  </h2>
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                    <Zap className="w-4 h-4 mr-1" />
                    Smart Discovery
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {aiRecommendations.map((podcast) => (
                    <Card 
                      key={podcast.id}
                      className="hover:shadow-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200 dark:border-gray-700 group"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="text-3xl">{podcast.thumbnail}</div>
                            <div>
                              <CardTitle className="text-lg text-amber-900 dark:text-amber-100 group-hover:text-amber-600 transition-colors">
                                {podcast.title}
                              </CardTitle>
                              <CardDescription className="text-amber-700 dark:text-amber-300">
                                {podcast.host} • {podcast.country}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{podcast.rating}</span>
                          </div>
                        </div>

                        {/* AI Recommendation Reason */}
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">AI Recommendation</span>
                          </div>
                          <p className="text-sm text-amber-700 dark:text-amber-300">{podcast.aiReason}</p>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                          {podcast.description}
                        </p>

                        {/* Cultural Context */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <Globe className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Cultural Context</span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-300">{podcast.culturalContext}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {podcast.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {podcast.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Headphones className="w-4 h-4" />
                              {podcast.listeners.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Languages className="w-4 h-4" />
                              {podcast.language}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                            <Play className="w-4 h-4 mr-2" />
                            Listen Now
                          </Button>
                          <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Trending Topics Globally
                  </h2>
                  <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                    Live Data
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingTopics.map((trend, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-amber-900 dark:text-amber-100">{trend.topic}</h3>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            {trend.growth}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="w-4 h-4" />
                          <span>{trend.countries} countries</span>
                        </div>
                        <Progress value={Math.random() * 100} className="mt-3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cultural" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Cultural Spotlight
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Discover authentic voices and stories from cultures around the world
                  </p>
                </div>
                {/* Cultural content would go here */}
              </TabsContent>

              <TabsContent value="personalized" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Personalized for You
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Content curated based on your listening history and preferences
                  </p>
                </div>
                {/* Personalized content would go here */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}