import { useState } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import PodcastStreamPreviewCards from "@/components/Podcast/PodcastStreamPreviewCards";
import RealTimeOccupancyTracker from "@/components/TreeHouse/RealTimeOccupancyTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Radio, 
  Search, 
  Filter, 
  Users, 
  Clock,
  Globe,
  Headphones,
  Mic,
  Play
} from 'lucide-react';

export default function LivePodcasts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const categories = ['All', 'Cultural Stories', 'Music & Arts', 'History', 'Nature', 'News', 'Technology'];

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
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl mr-4">📻</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Live Podcasts
                  </h1>
                  <p className="text-xl text-amber-600 dark:text-amber-200">
                    Tune into conversations happening right now across our global network
                  </p>
                </div>
              </div>
              
              {/* Live Status Badge */}
              <Badge variant="default" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg">
                <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                LIVE NOW
              </Badge>
            </div>

            {/* Search and Filter Controls */}
            <Card className="mb-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      placeholder="Search live podcasts, hosts, or topics..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-amber-200 dark:border-gray-600 focus:border-amber-400"
                      data-testid="input-search-podcasts"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-4 py-2 border border-amber-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-amber-400 focus:outline-none"
                      data-testid="select-category-filter"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <Button 
                      variant="outline" 
                      className="border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                      data-testid="button-filter"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Radio className="w-6 h-6 text-red-600 mr-2" />
                    <div className="text-2xl font-bold text-red-600">23</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Live Streams</div>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Headphones className="w-6 h-6 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-blue-600">8.2K</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Active Listeners</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Mic className="w-6 h-6 text-green-600 mr-2" />
                    <div className="text-2xl font-bold text-green-600">67</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Active Hosts</div>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Globe className="w-6 h-6 text-amber-600 mr-2" />
                    <div className="text-2xl font-bold text-amber-600">15</div>
                  </div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <PodcastStreamPreviewCards />
            
            {/* Occupancy Tracker Section */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <RealTimeOccupancyTracker />
            </div>

            {/* Featured Categories */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-6 text-center">
                Explore by Category
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.slice(1).map((category) => (
                  <Card 
                    key={category}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-amber-200 dark:border-gray-700"
                    data-testid={`category-${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-3">
                        {category === 'Cultural Stories' && '📚'}
                        {category === 'Music & Arts' && '🎵'}
                        {category === 'History' && '🏛️'}
                        {category === 'Nature' && '🌿'}
                        {category === 'News' && '📰'}
                        {category === 'Technology' && '💻'}
                      </div>
                      <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                        {category}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {Math.floor(Math.random() * 8) + 2} live streams
                      </p>
                      <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700">
                        <Play className="w-3 h-3 mr-1" />
                        Listen
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}