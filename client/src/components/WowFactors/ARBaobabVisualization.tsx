import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Scan, 
  Sparkles, 
  TreePine, 
  Globe,
  Play,
  Pause,
  Volume2,
  Eye,
  Hand,
  Zap,
  BookOpen,
  Star
} from 'lucide-react';

interface ARStory {
  id: string;
  title: string;
  culture: string;
  narrator: string;
  duration: string;
  rating: number;
  preview: string;
  culturalSignificance: string;
}

export default function ARBaobabVisualization() {
  const [isARActive, setIsARActive] = useState(false);
  const [currentStory, setCurrentStory] = useState<ARStory | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [treeInteraction, setTreeInteraction] = useState<string | null>(null);
  const [hasWebXR, setHasWebXR] = useState(false);

  const baobabStories: ARStory[] = [
    {
      id: 'story-001',
      title: 'The Upside-Down Tree',
      culture: 'San People (Botswana)',
      narrator: 'Elder Khoisan',
      duration: '8 min',
      rating: 4.9,
      preview: 'Why the baobab grows upside down - a creation myth from the Kalahari.',
      culturalSignificance: 'Sacred creation story explaining the tree\'s unique appearance'
    },
    {
      id: 'story-002',
      title: 'The Tree of Life',
      culture: 'Maasai (Tanzania)',
      narrator: 'Mama Esther',
      duration: '12 min',
      rating: 4.8,
      preview: 'How the baobab became the gathering place for all African animals.',
      culturalSignificance: 'Symbolizes community, shelter, and the cycle of life'
    },
    {
      id: 'story-003',
      title: 'The Ancestor\'s Home',
      culture: 'Shona (Zimbabwe)',
      narrator: 'Chief Mutapa',
      duration: '15 min',
      rating: 4.9,
      preview: 'Ancient spirits dwelling within the mighty baobab\'s hollow trunk.',
      culturalSignificance: 'Spiritual connection between living and ancestral worlds'
    },
    {
      id: 'story-004',
      title: 'The Rain Keeper',
      culture: 'Fulani (West Africa)',
      narrator: 'Griot Amadou',
      duration: '10 min',
      rating: 4.7,
      preview: 'The baobab\'s role in calling the rains during drought seasons.',
      culturalSignificance: 'Connection between nature\'s cycles and human survival'
    }
  ];

  useEffect(() => {
    // Check for WebXR support
    if ('xr' in navigator) {
      // @ts-ignore
      navigator.xr.isSessionSupported('immersive-ar').then((supported: boolean) => {
        setHasWebXR(supported);
      });
    }
  }, []);

  const startARExperience = () => {
    setIsARActive(true);
    // In a real implementation, this would initialize WebXR
    console.log('Starting AR experience...');
  };

  const stopARExperience = () => {
    setIsARActive(false);
    setCurrentStory(null);
    setIsPlaying(false);
    setTreeInteraction(null);
  };

  const selectStory = (story: ARStory) => {
    setCurrentStory(story);
    setTreeInteraction('story-selected');
  };

  const playStory = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setTreeInteraction('story-playing');
    }
  };

  const interactWithTree = (interactionType: string) => {
    setTreeInteraction(interactionType);
    // Simulate haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <TreePine className="w-6 h-6 text-green-600" />
          AR Baobab Tree Experience
          <Badge className="bg-purple-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Immersive
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {!isARActive ? (
          <div className="text-center space-y-6">
            {/* AR Compatibility Check */}
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900 dark:text-purple-100">
                  Augmented Reality Status
                </span>
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-200">
                {hasWebXR ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    WebXR supported - Full AR experience available
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Fallback mode - 360° visualization available
                  </span>
                )}
              </div>
            </div>

            {/* Experience Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <Hand className="w-8 h-8 text-green-600 mb-2" />
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  Interactive Tree
                </h3>
                <p className="text-sm text-green-700 dark:text-green-200">
                  Touch different parts of the 3D baobab to discover hidden stories and cultural meanings.
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                <BookOpen className="w-8 h-8 text-blue-600 mb-2" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Cultural Stories
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Listen to authentic narratives from different African cultures about the sacred baobab.
                </p>
              </div>
            </div>

            {/* Story Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 text-center">
                Choose Your Cultural Journey:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {baobabStories.map((story) => (
                  <div 
                    key={story.id}
                    className="p-3 border border-amber-200 dark:border-gray-600 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => selectStory(story)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-amber-900 dark:text-amber-100">
                        {story.title}
                      </h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs">{story.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{story.preview}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-600 dark:text-amber-200">{story.culture}</span>
                      <span className="text-muted-foreground">{story.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button 
              onClick={startARExperience}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              <Camera className="w-5 h-5 mr-2" />
              {hasWebXR ? 'Start AR Experience' : 'Start 360° Experience'}
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* AR View Simulation */}
            <div className="relative aspect-video bg-gradient-to-b from-blue-200 to-green-200 dark:from-blue-800 dark:to-green-800 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <TreePine className="w-24 h-24 text-green-700 dark:text-green-300 mx-auto mb-4 animate-pulse" />
                  <div className="text-green-800 dark:text-green-200 font-semibold">
                    Majestic Baobab Tree
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-300">
                    Point your device to explore
                  </div>
                </div>
              </div>

              {/* Interactive Hotspots */}
              <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="animate-bounce bg-white/80 hover:bg-white"
                  onClick={() => interactWithTree('trunk')}
                >
                  <Scan className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="absolute top-1/5 right-1/4 transform translate-x-1/2 -translate-y-1/2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="animate-bounce bg-white/80 hover:bg-white"
                  onClick={() => interactWithTree('branches')}
                >
                  <Globe className="w-4 h-4" />
                </Button>
              </div>

              {/* AR Overlay UI */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-green-600 text-white">
                  AR Active
                </Badge>
                {treeInteraction && (
                  <Badge variant="outline" className="bg-white/90">
                    {treeInteraction}
                  </Badge>
                )}
              </div>
            </div>

            {/* Story Player */}
            {currentStory && (
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                      {currentStory.title}
                    </h3>
                    <p className="text-sm text-amber-600 dark:text-amber-200">
                      Narrated by {currentStory.narrator} • {currentStory.culture}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={playStory}
                      className="border-amber-200 hover:bg-amber-100"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-200 hover:bg-amber-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="text-sm text-amber-700 dark:text-amber-300 mb-2">
                  {currentStory.preview}
                </div>
                
                <div className="text-xs text-muted-foreground p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                  <strong>Cultural Significance:</strong> {currentStory.culturalSignificance}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-4 h-4 text-purple-600" />
                <span>AI-Enhanced Cultural Learning</span>
              </div>
              
              <Button 
                onClick={stopARExperience}
                variant="outline"
                className="border-amber-200 hover:bg-amber-50"
              >
                Exit AR
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}