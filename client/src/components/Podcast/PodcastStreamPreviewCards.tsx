import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Headphones, 
  Radio,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  Mic
} from 'lucide-react';

interface PodcastStream {
  id: string;
  title: string;
  host: string;
  tree_house: string;
  country: string;
  listeners: number;
  duration: string;
  elapsed: string;
  category: string;
  isLive: boolean;
  thumbnail?: string;
  description: string;
}

const mockPodcastStreams: PodcastStream[] = [
  {
    id: "stream-001",
    title: "Morning Stories from Kilimanjaro",
    host: "Amara Kikwete",
    tree_house: "Tanzania Tree House",
    country: "Tanzania",
    listeners: 847,
    duration: "60 min",
    elapsed: "23 min",
    category: "Cultural Stories",
    isLive: true,
    description: "Traditional Maasai stories shared at dawn, connecting ancient wisdom with modern hearts."
  },
  {
    id: "stream-002",
    title: "Lagos Beat Sessions",
    host: "Kemi Adebayo",
    tree_house: "Nigeria Hub",
    country: "Nigeria",
    listeners: 1203,
    duration: "45 min",
    elapsed: "12 min",
    category: "Music & Arts",
    isLive: true,
    description: "Exploring the vibrant music scene of Lagos with live performances and artist interviews."
  },
  {
    id: "stream-003",
    title: "Desert Wisdom Chronicles",
    host: "Ahmed Ould",
    tree_house: "Mauritania Oasis",
    country: "Mauritania",
    listeners: 456,
    duration: "40 min",
    elapsed: "35 min",
    category: "History",
    isLive: true,
    description: "Ancient stories from the Saharan trade routes and nomadic traditions."
  },
  {
    id: "stream-004",
    title: "Madagascar Wildlife Tales",
    host: "Hery Rasolofo",
    tree_house: "Madagascar Baobab",
    country: "Madagascar",
    listeners: 672,
    duration: "50 min",
    elapsed: "18 min",
    category: "Nature",
    isLive: true,
    description: "Conservation stories and unique biodiversity of the island of Madagascar."
  }
];

export default function PodcastStreamPreviewCards() {
  const [playingStream, setPlayingStream] = useState<string | null>(null);
  const [mutedStreams, setMutedStreams] = useState<Set<string>>(new Set());
  const [favoriteStreams, setFavoriteStreams] = useState<Set<string>>(new Set());

  const handlePlayPause = (streamId: string) => {
    if (playingStream === streamId) {
      setPlayingStream(null);
    } else {
      setPlayingStream(streamId);
    }
  };

  const handleMuteToggle = (streamId: string) => {
    const newMuted = new Set(mutedStreams);
    if (newMuted.has(streamId)) {
      newMuted.delete(streamId);
    } else {
      newMuted.add(streamId);
    }
    setMutedStreams(newMuted);
  };

  const handleFavoriteToggle = (streamId: string) => {
    const newFavorites = new Set(favoriteStreams);
    if (newFavorites.has(streamId)) {
      newFavorites.delete(streamId);
    } else {
      newFavorites.add(streamId);
    }
    setFavoriteStreams(newFavorites);
  };

  const getElapsedPercentage = (elapsed: string, duration: string) => {
    const elapsedMin = parseInt(elapsed.split(' ')[0]);
    const totalMin = parseInt(duration.split(' ')[0]);
    return (elapsedMin / totalMin) * 100;
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl mr-3">📻</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100">
            Live Podcast Streams
          </h2>
        </div>
        <p className="text-lg text-amber-600 dark:text-amber-200 max-w-2xl mx-auto">
          Tune into live conversations happening right now across our global tree house network.
        </p>
      </div>

      {/* Live Stream Counter */}
      <div className="text-center">
        <Badge variant="default" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2">
          <Radio className="w-4 h-4 mr-2 animate-pulse" />
          {mockPodcastStreams.length} Live Streams Active
        </Badge>
      </div>

      {/* Podcast Stream Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockPodcastStreams.map((stream) => (
          <Card 
            key={stream.id} 
            className="hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700 overflow-hidden"
            data-testid={`podcast-stream-${stream.id}`}
          >
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-700 dark:to-red-900/20 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <Avatar className="w-12 h-12 border-2 border-red-200">
                    <AvatarImage src={`/api/placeholder/${stream.host.toLowerCase().replace(' ', '-')}`} />
                    <AvatarFallback className="bg-red-100 text-red-800 font-bold">
                      {getInitials(stream.host)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-amber-900 dark:text-amber-100 truncate">
                      {stream.title}
                    </CardTitle>
                    <CardDescription className="text-amber-700 dark:text-amber-300">
                      {stream.host}
                    </CardDescription>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {stream.country}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="default" className="bg-red-600 text-white">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    LIVE
                  </Badge>
                  <Badge variant="outline">{stream.category}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {stream.description}
                </p>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {stream.elapsed} elapsed
                    </span>
                    <span>{stream.duration} total</span>
                  </div>
                  <Progress 
                    value={getElapsedPercentage(stream.elapsed, stream.duration)} 
                    className="h-2"
                  />
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Headphones className="w-4 h-4" />
                      {stream.listeners.toLocaleString()} listening
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mic className="w-4 h-4" />
                      {stream.tree_house}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant={playingStream === stream.id ? "default" : "outline"}
                      onClick={() => handlePlayPause(stream.id)}
                      className={playingStream === stream.id ? "bg-red-600 hover:bg-red-700" : ""}
                      data-testid="button-play-pause"
                    >
                      {playingStream === stream.id ? 
                        <Pause className="w-4 h-4" /> : 
                        <Play className="w-4 h-4" />
                      }
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMuteToggle(stream.id)}
                      data-testid="button-mute"
                    >
                      {mutedStreams.has(stream.id) ? 
                        <VolumeX className="w-4 h-4" /> : 
                        <Volume2 className="w-4 h-4" />
                      }
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleFavoriteToggle(stream.id)}
                      className={favoriteStreams.has(stream.id) ? "text-red-600 border-red-200" : ""}
                      data-testid="button-favorite"
                    >
                      <Heart className={`w-4 h-4 ${favoriteStreams.has(stream.id) ? 'fill-current' : ''}`} />
                    </Button>
                    
                    <Button size="sm" variant="outline" data-testid="button-share">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {playingStream === stream.id && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Now playing from {stream.tree_house}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Streams Button */}
      <div className="text-center pt-6">
        <Button 
          size="lg" 
          className="bg-red-600 hover:bg-red-700 text-white px-8"
          data-testid="button-view-all-streams"
        >
          <Radio className="w-5 h-5 mr-2" />
          Browse All Live Streams
        </Button>
      </div>
    </div>
  );
}