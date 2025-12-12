import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Headphones, 
  Mic, 
  MapPin, 
  Globe, 
  Play,
  Star,
  MessageCircle,
  Calendar
} from 'lucide-react';
import storytellersData from '@/data/storytellers.json';

interface Storyteller {
  id: string;
  name: string;
  title: string;
  tree_house: string;
  country: string;
  specialty: string;
  bio: string;
  podcast: string;
  listeners: number;
  episodes: number;
  languages: string[];
  signature_story: string;
  join_date: string;
}

export default function StorytellerCommunityHighlight() {
  const [selectedStoryteller, setSelectedStoryteller] = useState<Storyteller | null>(null);
  const { featured_storytellers, community_stats } = storytellersData;

  const handleListenNow = (storyteller: Storyteller) => {
    console.log('Playing podcast:', storyteller.podcast);
    // Add actual podcast playback functionality here
  };

  const handleViewProfile = (storyteller: Storyteller) => {
    setSelectedStoryteller(storyteller);
    console.log('Viewing profile:', storyteller.name);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="text-4xl mr-3">🗣️</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-amber-100">
            Storyteller Community
          </h2>
        </div>
        <p className="text-lg text-amber-600 dark:text-amber-200 max-w-2xl mx-auto">
          Meet the voices that bring our global baobab network to life. Each storyteller 
          shares unique cultural perspectives from their digital tree house.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-amber-600 mr-2" />
              <div className="text-2xl font-bold text-amber-600">
                {community_stats.total_storytellers}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Storytellers</div>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Headphones className="w-6 h-6 text-amber-600 mr-2" />
              <div className="text-2xl font-bold text-amber-600">
                {community_stats.total_listeners.toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Listeners</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Mic className="w-6 h-6 text-amber-600 mr-2" />
              <div className="text-2xl font-bold text-amber-600">
                {community_stats.total_episodes.toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Episodes</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Globe className="w-6 h-6 text-amber-600 mr-2" />
              <div className="text-2xl font-bold text-amber-600">
                {community_stats.languages_represented}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Storytellers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured_storytellers.map((storyteller) => (
          <Card 
            key={storyteller.id} 
            className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border-amber-200 dark:border-gray-700 overflow-hidden"
            data-testid={`storyteller-${storyteller.id}`}
          >
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-amber-900/20 pb-4">
              <div className="flex items-start space-x-4">
                <Avatar className="w-16 h-16 border-2 border-amber-200">
                  <AvatarImage src={`/api/placeholder/${storyteller.id}`} alt={storyteller.name} />
                  <AvatarFallback className="bg-amber-100 text-amber-800 font-bold text-lg">
                    {getInitials(storyteller.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-amber-900 dark:text-amber-100 truncate">
                    {storyteller.name}
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-300 font-medium">
                    {storyteller.title}
                  </CardDescription>
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {storyteller.country}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Specialty & Bio */}
                <div>
                  <Badge variant="outline" className="mb-2 bg-amber-50 dark:bg-gray-700 border-amber-200">
                    {storyteller.specialty}
                  </Badge>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {storyteller.bio}
                  </p>
                </div>

                {/* Podcast Info */}
                <div className="bg-amber-50 dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm text-amber-900 dark:text-amber-100 flex items-center">
                      <Mic className="w-4 h-4 mr-2" />
                      {storyteller.podcast}
                    </h4>
                    <Star className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Headphones className="w-3 h-3 mr-1" />
                      {storyteller.listeners.toLocaleString()} listeners
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {storyteller.episodes} episodes
                    </div>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {storyteller.languages.slice(0, 3).map((language, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  Joined {formatJoinDate(storyteller.join_date)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    onClick={() => handleListenNow(storyteller)}
                    data-testid="button-listen-now"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-amber-200 hover:bg-amber-50 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => handleViewProfile(storyteller)}
                    data-testid="button-view-profile"
                  >
                    Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Storytellers Button */}
      <div className="text-center pt-6">
        <Button 
          size="lg" 
          className="bg-amber-600 hover:bg-amber-700 text-white px-8"
          data-testid="button-view-all-storytellers"
        >
          <Users className="w-5 h-5 mr-2" />
          Explore All {community_stats.total_storytellers} Storytellers
        </Button>
      </div>
    </div>
  );
}