import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import StorytellerCommunityHighlight from "@/components/Community/StorytellerCommunityHighlight";
import InteractiveTreeHouseModal from "@/components/TreeHouse/InteractiveTreeHouseModal";
import PodcastStreamPreviewCards from "@/components/Podcast/PodcastStreamPreviewCards";
import AnimatedLocationMarkers from "@/components/Map/AnimatedLocationMarkers";
import RealTimeOccupancyTracker from "@/components/TreeHouse/RealTimeOccupancyTracker";
import { MapPin, Users, Mic, Radio, Search } from 'lucide-react';
import baobabLocations from '@/data/baobab-locations.json';

interface TreeHouse {
  country: string;
  location: string;
  baobab_count: number;
  status: string;
  tree_house_id: string;
  podcast_capacity: number;
  featured_podcasters: string[];
  coordinates: [number, number];
}

export default function TreeHouses() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [treeHouses, setTreeHouses] = useState<TreeHouse[]>([]);

  useEffect(() => {
    // Transform GeoJSON data to TreeHouse format
    const transformed = baobabLocations.features.map(feature => ({
      country: feature.properties.country,
      location: feature.properties.location,
      baobab_count: feature.properties.baobab_count,
      status: feature.properties.status,
      tree_house_id: feature.properties.tree_house_id,
      podcast_capacity: feature.properties.podcast_capacity,
      featured_podcasters: feature.properties.featured_podcasters,
      coordinates: feature.geometry.coordinates as [number, number]
    }));
    setTreeHouses(transformed);
  }, []);

  const filteredTreeHouses = treeHouses.filter(house => {
    const matchesSearch = house.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         house.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || house.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleJoinTreeHouse = (house: TreeHouse) => {
    // Add join functionality here
    console.log('Joining tree house:', house.tree_house_id);
  };

  const handleViewLocation = (house: TreeHouse) => {
    // Add map view functionality here
    console.log('Viewing location:', house.coordinates);
  };

  return (
    <div className="flex h-screen bg-amber-50 dark:bg-gray-900">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        dataSourceStatuses={[]}
        activeSection="tree-houses"
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 overflow-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-amber-900">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl mr-4">🌳</div>
                <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100">
                  Digital Tree Houses
                </h1>
              </div>
              <p className="text-lg text-amber-600 dark:text-amber-200 max-w-3xl mx-auto leading-relaxed">
                Explore our global network of podcast studios nestled in the digital canopy of baobab trees. 
                Each tree house hosts a unique community of storytellers from around the world, 
                connecting voices from here to Timbuktu.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-8 h-8 text-amber-600 mr-2" />
                    <div className="text-3xl font-bold text-amber-600">{treeHouses.length}</div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Tree Houses</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Mic className="w-8 h-8 text-amber-600 mr-2" />
                    <div className="text-3xl font-bold text-amber-600">
                      {treeHouses.reduce((sum, house) => sum + house.podcast_capacity, 0)}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Total Capacity</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <Radio className="w-8 h-8 text-green-600 mr-2" />
                    <div className="text-3xl font-bold text-green-600">
                      {treeHouses.filter(house => house.status === 'Active').length}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Active Studios</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-2xl mr-2">🌳</div>
                    <div className="text-3xl font-bold text-amber-600">
                      {treeHouses.reduce((sum, house) => sum + house.baobab_count, 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">Baobab Trees</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by country or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-400 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-2">
                {['All', 'Active', 'Reserved'].map(status => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700'}
                    data-testid={`filter-${status.toLowerCase()}`}
                  >
                    {status}
                    {status !== 'All' && (
                      <Badge variant="secondary" className="ml-2 bg-white/20">
                        {status === 'Active' ? treeHouses.filter(h => h.status === 'Active').length : 
                         treeHouses.filter(h => h.status === 'Reserved').length}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tree House Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreeHouses.map((house, index) => (
                <Card 
                  key={house.tree_house_id} 
                  className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700 overflow-hidden"
                  data-testid={`tree-house-${house.country.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-amber-900/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          <div className="text-2xl">🏠</div>
                          <span className="text-amber-900 dark:text-amber-100">{house.country}</span>
                          <Badge 
                            variant={house.status === 'Active' ? 'default' : 'secondary'}
                            className={house.status === 'Active' ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            {house.status}
                          </Badge>
                        </CardTitle>
                        {house.location && (
                          <CardDescription className="mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {house.location}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-gray-700 rounded-lg">
                          <Mic className="w-5 h-5 text-amber-600 mb-1" />
                          <span className="font-bold text-lg text-amber-600">{house.podcast_capacity}</span>
                          <span className="text-muted-foreground text-xs">Capacity</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-amber-50 dark:bg-gray-700 rounded-lg">
                          <div className="text-xl mb-1">🌳</div>
                          <span className="font-bold text-lg text-amber-600">{house.baobab_count.toLocaleString()}</span>
                          <span className="text-muted-foreground text-xs">Trees</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                          <Radio className="w-4 h-4 text-amber-600" />
                          Featured Podcasters
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {house.featured_podcasters.map((podcaster, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-amber-50 dark:bg-gray-700 border-amber-200 dark:border-gray-600">
                              🎙️ {podcaster}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors"
                          disabled={house.status !== 'Active'}
                          onClick={() => handleJoinTreeHouse(house)}
                          data-testid="button-join-tree-house"
                        >
                          {house.status === 'Active' ? 'Join Tree House' : 'Coming Soon'}
                        </Button>
                        <InteractiveTreeHouseModal treeHouse={house}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="px-3 border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                            data-testid="button-view-details"
                            title="View details"
                          >
                            <Users className="w-4 h-4" />
                          </Button>
                        </InteractiveTreeHouseModal>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="px-3 border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                          onClick={() => handleViewLocation(house)}
                          data-testid="button-view-location"
                          title="View on map"
                        >
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTreeHouses.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg border border-amber-200 dark:border-gray-700">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">No tree houses found</h3>
                <p className="text-muted-foreground text-lg mb-6">Try adjusting your search or filter criteria.</p>
                <Button 
                  onClick={() => {setSearchTerm(''); setStatusFilter('All');}}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Podcast Stream Preview Cards Section */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <PodcastStreamPreviewCards />
            </div>

            {/* Animated Location Markers Section */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <AnimatedLocationMarkers />
            </div>

            {/* Real-Time Occupancy Tracker Section */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <RealTimeOccupancyTracker />
            </div>

            {/* Storyteller Community Highlight Section */}
            <div className="mt-16 pt-16 border-t border-amber-200 dark:border-gray-700">
              <StorytellerCommunityHighlight />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}