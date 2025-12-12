import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Users, 
  Mic, 
  Radio, 
  Calendar,
  Globe,
  Headphones,
  Play,
  Pause,
  Volume2,
  Share2,
  Heart
} from 'lucide-react';

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

interface InteractiveTreeHouseModalProps {
  treeHouse: TreeHouse;
  children: React.ReactNode;
}

export default function InteractiveTreeHouseModal({ treeHouse, children }: InteractiveTreeHouseModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentOccupancy] = useState(Math.floor(Math.random() * treeHouse.podcast_capacity));
  const [liveStreams] = useState(Math.floor(Math.random() * 5) + 1);

  const occupancyPercentage = (currentOccupancy / treeHouse.podcast_capacity) * 100;

  const mockLivePodcasts = [
    {
      title: "Morning Stories from the Canopy",
      host: treeHouse.featured_podcasters[0] || "Local Storyteller",
      listeners: Math.floor(Math.random() * 1000) + 100,
      duration: "45 min",
      category: "Culture"
    },
    {
      title: "Traditional Music Hour",
      host: treeHouse.featured_podcasters[1] || "Music Keeper",
      listeners: Math.floor(Math.random() * 800) + 50,
      duration: "30 min", 
      category: "Music"
    }
  ];

  const handleJoinTreeHouse = () => {
    console.log('Joining tree house:', treeHouse.tree_house_id);
    // Add actual join functionality
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="text-3xl">🏠</div>
            {treeHouse.country} Tree House
            <Badge variant={treeHouse.status === 'Active' ? 'default' : 'secondary'} 
                   className={treeHouse.status === 'Active' ? 'bg-green-600' : ''}>
              {treeHouse.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-base">
            <MapPin className="w-4 h-4" />
            {treeHouse.location || `${treeHouse.country} Digital Canopy`}
            <span className="mx-2">•</span>
            <Globe className="w-4 h-4" />
            {treeHouse.coordinates[1].toFixed(4)}°, {treeHouse.coordinates[0].toFixed(4)}°
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Tree House Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-amber-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{treeHouse.baobab_count.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Baobab Trees</div>
              </div>
              <div className="text-center p-4 bg-amber-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{treeHouse.podcast_capacity}</div>
                <div className="text-sm text-muted-foreground">Studio Capacity</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{currentOccupancy}</div>
                <div className="text-sm text-muted-foreground">Currently Active</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{liveStreams}</div>
                <div className="text-sm text-muted-foreground">Live Streams</div>
              </div>
            </div>

            {/* Occupancy Tracker */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Current Occupancy
                </h3>
                <span className="text-sm text-muted-foreground">
                  {currentOccupancy}/{treeHouse.podcast_capacity} spaces occupied
                </span>
              </div>
              <Progress value={occupancyPercentage} className="h-3" />
              <div className="text-sm text-muted-foreground">
                {occupancyPercentage.toFixed(1)}% capacity • 
                {treeHouse.podcast_capacity - currentOccupancy} spaces available
              </div>
            </div>
          </TabsContent>

          <TabsContent value="live" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Radio className="w-5 h-5 text-red-500" />
                Live Podcasts
                <Badge variant="secondary">{mockLivePodcasts.length} Active</Badge>
              </h3>
              
              {mockLivePodcasts.map((podcast, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{podcast.title}</h4>
                      <p className="text-sm text-muted-foreground">Hosted by {podcast.host}</p>
                    </div>
                    <Badge variant="outline">{podcast.category}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Headphones className="w-4 h-4" />
                        {podcast.listeners} listening
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {podcast.duration}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Featured Podcasters</h3>
              <div className="grid gap-3">
                {treeHouse.featured_podcasters.map((podcaster, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">{podcaster}</p>
                        <p className="text-sm text-muted-foreground">Regular Host</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Heart className="w-4 h-4 mr-1" />
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="connect" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl">🌳</div>
              <h3 className="text-xl font-semibold">Join the {treeHouse.country} Community</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Connect with local storytellers and share your voice from this beautiful digital tree house.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700"
                  onClick={handleJoinTreeHouse}
                  disabled={treeHouse.status !== 'Active'}
                >
                  <Users className="w-5 h-5 mr-2" />
                  {treeHouse.status === 'Active' ? 'Join Tree House' : 'Coming Soon'}
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Location
                </Button>
              </div>
              
              {treeHouse.status === 'Active' && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  ✓ {treeHouse.podcast_capacity - currentOccupancy} spaces available now
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}