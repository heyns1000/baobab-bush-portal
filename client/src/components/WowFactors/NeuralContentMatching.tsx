import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Network,
  Target,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Heart,
  Eye,
  Lightbulb,
  ArrowRight,
  Star,
  Play,
  Bookmark
} from 'lucide-react';

interface ContentMatch {
  id: string;
  title: string;
  culture: string;
  narrator: string;
  matchScore: number;
  matchReasons: string[];
  culturalBridge: string;
  emotionalResonance: number;
  narrativeStyle: string;
  universalThemes: string[];
  uniqueElements: string[];
  listenTime: string;
  listeners: number;
  rating: number;
}

interface NeuralPattern {
  culturalArchetype: string;
  narrativePreference: string;
  emotionalProfile: string;
  temporalPreference: string;
  thematicInterests: string[];
  crossCulturalCuriosity: number;
}

export default function NeuralContentMatching() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userPattern, setUserPattern] = useState<NeuralPattern | null>(null);
  const [contentMatches, setContentMatches] = useState<ContentMatch[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [processingStage, setProcessingStage] = useState('');

  const sampleMatches: ContentMatch[] = [
    {
      id: 'match-001',
      title: 'The Wise Tortoise and the Impatient Hare',
      culture: 'Yoruba (Nigeria)',
      narrator: 'Iya Agba Folake',
      matchScore: 97.4,
      matchReasons: [
        'Similar moral complexity to your preferred Aesop adaptations',
        'Matches your interest in animal wisdom narratives',
        'Cultural storytelling style aligns with your listening patterns'
      ],
      culturalBridge: 'Like Aesop\'s fables, Yoruba tales use animals to teach life lessons, but with distinct African cultural values about community and patience.',
      emotionalResonance: 94,
      narrativeStyle: 'Parable with humor',
      universalThemes: ['Patience', 'Wisdom', 'Pride'],
      uniqueElements: ['Call-and-response', 'Drumbeat rhythm', 'Yoruba proverbs'],
      listenTime: '12 min',
      listeners: 8900,
      rating: 4.8
    },
    {
      id: 'match-002',
      title: 'The Star Navigator\'s Daughter',
      culture: 'Polynesian (Samoa)',
      narrator: 'Master Navigator Tui',
      matchScore: 93.2,
      matchReasons: [
        'Ocean themes match your preference for nature-based narratives',
        'Strong female protagonist aligns with your character preferences',
        'Navigation metaphors similar to your enjoyed journey stories'
      ],
      culturalBridge: 'Like Odyssey-style epics, but focuses on Polynesian wayfinding traditions and the sacred relationship with the ocean.',
      emotionalResonance: 91,
      narrativeStyle: 'Epic adventure',
      universalThemes: ['Coming of age', 'Family legacy', 'Courage'],
      uniqueElements: ['Star navigation', 'Ocean spirits', 'Traditional chants'],
      listenTime: '28 min',
      listeners: 12400,
      rating: 4.9
    },
    {
      id: 'match-003',
      title: 'The Whispering Cedars of Lebanon',
      culture: 'Lebanese-Arabic',
      narrator: 'Hakawati Mahmoud',
      matchScore: 89.7,
      matchReasons: [
        'Mystical elements match your spiritual story preferences',
        'Tree symbolism aligns with your nature-focused interests',
        'Philosophical depth similar to your preferred contemplative content'
      ],
      culturalBridge: 'Like Celtic tree lore, but infused with Middle Eastern mysticism and the ancient Hakawati storytelling tradition.',
      emotionalResonance: 88,
      narrativeStyle: 'Mystical philosophy',
      universalThemes: ['Wisdom', 'Memory', 'Connection to nature'],
      uniqueElements: ['Cedar tree spirits', 'Arabic poetry', 'Sufi philosophy'],
      listenTime: '18 min',
      listeners: 6700,
      rating: 4.7
    }
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const stages = [
        'Analyzing listening history patterns...',
        'Mapping cultural preference neural networks...',
        'Processing emotional response data...',
        'Cross-referencing global narrative databases...',
        'Calculating cultural bridge connections...',
        'Optimizing personalized recommendations...'
      ];

      let currentStage = 0;
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setProcessingStage(stages[currentStage]);
          currentStage++;
        } else {
          clearInterval(interval);
          setUserPattern({
            culturalArchetype: 'Cross-Cultural Explorer',
            narrativePreference: 'Moral complexity with universal themes',
            emotionalProfile: 'Contemplative and empathetic',
            temporalPreference: 'Medium-length narratives (10-30 min)',
            thematicInterests: ['Nature wisdom', 'Character growth', 'Cultural values'],
            crossCulturalCuriosity: 94
          });
          setContentMatches(sampleMatches);
          setAnalysisComplete(true);
          setIsAnalyzing(false);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setProcessingStage('Initializing neural pattern analysis...');
  };

  const getMatchColor = (score: number) => {
    if (score >= 95) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 90) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 85) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getMatchLabel = (score: number) => {
    if (score >= 95) return 'Perfect Match';
    if (score >= 90) return 'Excellent Match';
    if (score >= 85) return 'Good Match';
    return 'Potential Match';
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          Neural Content Matching
          <Badge className="bg-purple-600 text-white">
            <Network className="w-3 h-3 mr-1" />
            AI Neural Network
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {!analysisComplete && !isAnalyzing ? (
          <div className="text-center space-y-6">
            <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <Network className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Discover Your Cultural DNA
              </h3>
              <p className="text-purple-700 dark:text-purple-200 mb-4">
                Our advanced neural network analyzes your listening patterns, emotional responses, 
                and cultural preferences to find perfect story matches across 120+ cultures.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-blue-900 dark:text-blue-100">Pattern Analysis</div>
                  <div className="text-blue-700 dark:text-blue-200 text-xs">
                    Deep learning from listening behavior
                  </div>
                </div>
                
                <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <Target className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-900 dark:text-green-100">Cultural Bridges</div>
                  <div className="text-green-700 dark:text-green-200 text-xs">
                    Connecting familiar with new cultures
                  </div>
                </div>
                
                <div className="p-3 bg-white/60 dark:bg-gray-800/60 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <div className="font-medium text-red-900 dark:text-red-100">Emotional Resonance</div>
                  <div className="text-red-700 dark:text-red-200 text-xs">
                    Stories that truly move you
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={startAnalysis}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              Analyze My Cultural Preferences
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>
        ) : isAnalyzing ? (
          <div className="text-center space-y-6">
            <div className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-purple-600 rounded-full animate-spin"></div>
                <Brain className="w-8 h-8 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                Neural Analysis in Progress
              </h3>
              
              <div className="text-purple-700 dark:text-purple-200 mb-4">
                {processingStage}
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-purple-600 dark:text-purple-300">
                <Network className="w-4 h-4 animate-pulse" />
                <span>Processing across 847 neural pathways</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Pattern Analysis */}
            {userPattern && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900 dark:text-green-100">
                    Your Cultural DNA Profile
                  </span>
                  <Badge className="bg-green-600 text-white">
                    {userPattern.crossCulturalCuriosity}% Cultural Curiosity
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-green-900 dark:text-green-100">Cultural Archetype</div>
                      <div className="text-green-700 dark:text-green-200">{userPattern.culturalArchetype}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-900 dark:text-green-100">Narrative Style</div>
                      <div className="text-green-700 dark:text-green-200">{userPattern.narrativePreference}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-900 dark:text-green-100">Emotional Profile</div>
                      <div className="text-green-700 dark:text-green-200">{userPattern.emotionalProfile}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">Thematic Interests</div>
                    <div className="flex flex-wrap gap-1">
                      {userPattern.thematicInterests.map((interest, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-green-700 border-green-300">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Matches */}
            <div className="space-y-4">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Personalized Story Recommendations
              </h3>
              
              {contentMatches.map((match, idx) => (
                <div key={match.id} className="p-6 border border-amber-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-800/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                          {match.title}
                        </h4>
                        <Badge className={`${getMatchColor(match.matchScore)} border`}>
                          <Star className="w-3 h-3 mr-1" />
                          {match.matchScore.toFixed(1)}% - {getMatchLabel(match.matchScore)}
                        </Badge>
                      </div>
                      <div className="text-sm text-amber-600 dark:text-amber-200 mb-2">
                        {match.culture} • Narrated by {match.narrator}
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        {match.listenTime} • {match.listeners.toLocaleString()} listeners • ⭐ {match.rating}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        <Play className="w-4 h-4 mr-1" />
                        Listen
                      </Button>
                      <Button size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Cultural Bridge */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Cultural Bridge</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-200">{match.culturalBridge}</p>
                  </div>

                  {/* Match Reasons */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">
                      Why this matches your preferences:
                    </div>
                    <div className="space-y-1">
                      {match.matchReasons.map((reason, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Zap className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Theme Analysis */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">Universal Themes</div>
                      <div className="flex flex-wrap gap-1">
                        {match.universalThemes.map((theme, tIdx) => (
                          <Badge key={tIdx} variant="secondary" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">Unique Cultural Elements</div>
                      <div className="flex flex-wrap gap-1">
                        {match.uniqueElements.map((element, eIdx) => (
                          <Badge key={eIdx} variant="outline" className="text-xs text-purple-600 border-purple-200">
                            {element}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Emotional Resonance */}
                  <div className="mt-4 pt-4 border-t border-amber-200 dark:border-gray-600">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Predicted Emotional Resonance:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${match.emotionalResonance}%` }}
                          />
                        </div>
                        <span className="font-medium text-purple-600">{match.emotionalResonance}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Analysis Stats */}
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-900 dark:text-purple-100">
                    Analysis processed 14,387 stories across 89 cultures
                  </span>
                </div>
                <div className="text-purple-600">
                  Neural confidence: 96.7%
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}