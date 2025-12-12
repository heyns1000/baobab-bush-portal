import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Eye, 
  Zap, 
  Activity,
  Brain,
  Smile,
  Frown,
  AlertCircle,
  TrendingUp,
  Users,
  Camera,
  Mic,
  Settings,
  Lock,
  Shield
} from 'lucide-react';

interface BiometricData {
  heartRate: number;
  emotionalState: string;
  attentionLevel: number;
  engagement: number;
  stressLevel: number;
  culturalResonance: number;
  timestamp: number;
}

interface EmotionalMetrics {
  joy: number;
  surprise: number;
  contemplation: number;
  connection: number;
  wonder: number;
}

export default function BiometricEngagement() {
  const [isActive, setIsActive] = useState(false);
  const [biometricData, setBiometricData] = useState<BiometricData | null>(null);
  const [emotions, setEmotions] = useState<EmotionalMetrics>({
    joy: 0,
    surprise: 0,
    contemplation: 0,
    connection: 0,
    wonder: 0
  });
  const [hasPermissions, setHasPermissions] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate biometric data
        const newData: BiometricData = {
          heartRate: 70 + Math.random() * 20,
          emotionalState: getRandomEmotion(),
          attentionLevel: 80 + Math.random() * 20,
          engagement: 85 + Math.random() * 15,
          stressLevel: 10 + Math.random() * 20,
          culturalResonance: 88 + Math.random() * 12,
          timestamp: Date.now()
        };
        setBiometricData(newData);

        // Update emotional metrics
        setEmotions(prev => ({
          joy: Math.max(0, Math.min(100, prev.joy + (Math.random() - 0.5) * 10)),
          surprise: Math.max(0, Math.min(100, prev.surprise + (Math.random() - 0.5) * 15)),
          contemplation: Math.max(0, Math.min(100, prev.contemplation + (Math.random() - 0.5) * 8)),
          connection: Math.max(0, Math.min(100, prev.connection + (Math.random() - 0.5) * 12)),
          wonder: Math.max(0, Math.min(100, prev.wonder + (Math.random() - 0.5) * 10))
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const getRandomEmotion = (): string => {
    const emotions = ['Engaged', 'Curious', 'Contemplative', 'Moved', 'Inspired', 'Peaceful'];
    return emotions[Math.floor(Math.random() * emotions.length)];
  };

  const requestPermissions = async () => {
    try {
      // In a real implementation, this would request camera and microphone permissions
      // for emotion detection and heart rate monitoring
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      stream.getTracks().forEach(track => track.stop()); // Stop immediately, just checking permissions
      setHasPermissions(true);
    } catch (error) {
      console.log('Permissions denied or not available');
      setHasPermissions(false);
    }
  };

  const startBiometricTracking = () => {
    setIsActive(true);
    // Initialize biometric sensors
    console.log('Starting biometric engagement tracking...');
  };

  const stopBiometricTracking = () => {
    setIsActive(false);
    setBiometricData(null);
  };

  const getEngagementColor = (level: number) => {
    if (level >= 90) return 'text-green-600';
    if (level >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEngagementText = (level: number) => {
    if (level >= 90) return 'Deeply Engaged';
    if (level >= 70) return 'Moderately Engaged';
    return 'Low Engagement';
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'engaged': case 'inspired': return <Zap className="w-4 h-4 text-blue-600" />;
      case 'curious': case 'wonder': return <Eye className="w-4 h-4 text-purple-600" />;
      case 'contemplative': case 'peaceful': return <Brain className="w-4 h-4 text-green-600" />;
      case 'moved': case 'connection': return <Heart className="w-4 h-4 text-red-500" />;
      default: return <Smile className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-6 h-6 text-red-500" />
          Biometric Engagement Tracking
          <Badge className="bg-red-600 text-white">
            <Heart className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {!hasPermissions ? (
          <div className="text-center space-y-4">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Privacy-First Biometric Analysis
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-200 mb-4">
                Experience personalized content recommendations based on your emotional response to stories. 
                All biometric data is processed locally and never stored or shared.
              </p>
              <div className="space-y-2 text-xs text-blue-600 dark:text-blue-300">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>Camera for emotion detection (facial expression analysis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  <span>Microphone for voice stress analysis (optional)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>End-to-end encryption • No data storage • Full user control</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={requestPermissions}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              Enable Biometric Analysis
            </Button>
          </div>
        ) : !isActive ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900 dark:text-green-100">
                  Permissions Granted
                </span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-200">
                Ready to track your emotional journey through cultural stories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <Heart className="w-8 h-8 text-red-500 mb-2" />
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                  Emotional Response
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-200">
                  Track your emotional journey through cultural narratives and receive personalized content.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                <Brain className="w-8 h-8 text-purple-600 mb-2" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Cultural Resonance
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-200">
                  Measure how deeply stories resonate with your cultural background and interests.
                </p>
              </div>
            </div>
            
            <Button 
              onClick={startBiometricTracking}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Activity className="w-5 h-5 mr-2" />
              Start Tracking
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Real-time Metrics */}
            {biometricData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-red-600">
                    {biometricData.heartRate.toFixed(0)}
                  </div>
                  <div className="text-xs text-muted-foreground">BPM</div>
                </div>
                
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <Eye className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-blue-600">
                    {biometricData.attentionLevel.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Attention</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-1" />
                  <div className={`text-lg font-bold ${getEngagementColor(biometricData.engagement)}`}>
                    {biometricData.engagement.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Engagement</div>
                </div>
                
                <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                  <Brain className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-purple-600">
                    {biometricData.culturalResonance.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Cultural Resonance</div>
                </div>
              </div>
            )}

            {/* Emotional State */}
            {biometricData && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getEmotionIcon(biometricData.emotionalState)}
                    <span className="font-semibold text-amber-900 dark:text-amber-100">
                      Current State: {biometricData.emotionalState}
                    </span>
                  </div>
                  <Badge variant="outline" className={getEngagementColor(biometricData.engagement)}>
                    {getEngagementText(biometricData.engagement)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Stress Level</div>
                    <Progress value={biometricData.stressLevel} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {biometricData.stressLevel.toFixed(1)}% - {biometricData.stressLevel < 30 ? 'Relaxed' : biometricData.stressLevel < 60 ? 'Moderate' : 'High'}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Attention Focus</div>
                    <Progress value={biometricData.attentionLevel} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {biometricData.attentionLevel.toFixed(1)}% - Deep Focus
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Cultural Connection</div>
                    <Progress value={biometricData.culturalResonance} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {biometricData.culturalResonance.toFixed(1)}% - Strong Resonance
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Emotional Journey Map */}
            <div className="space-y-3">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Emotional Journey
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {Object.entries(emotions).map(([emotion, value]) => (
                  <div key={emotion} className="p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2 capitalize">
                      {emotion}
                    </div>
                    <Progress value={value} className="h-2 mb-1" />
                    <div className="text-xs text-muted-foreground">
                      {value.toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Controls */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  All data processed locally • No external storage
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPrivacyMode(!privacyMode)}
                >
                  <Settings className="w-4 h-4 mr-1" />
                  {privacyMode ? 'Private' : 'Shared'}
                </Button>
                <Button
                  onClick={stopBiometricTracking}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Activity className="w-4 h-4 mr-1" />
                  Stop Tracking
                </Button>
              </div>
            </div>

            {/* Insights */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  AI Insights
                </span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                Your biometric data suggests strong emotional connection to traditional storytelling. 
                We recommend exploring more content from similar cultural backgrounds and narrative styles.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}