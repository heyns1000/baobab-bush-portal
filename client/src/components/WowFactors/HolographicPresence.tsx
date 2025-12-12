import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Sparkles, 
  Users, 
  Globe,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Settings,
  Hand,
  Heart,
  MessageCircle,
  Star,
  Zap,
  Eye,
  Volume2,
  VolumeX
} from 'lucide-react';

interface HolographicSession {
  id: string;
  title: string;
  host: string;
  culture: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  duration: string;
  description: string;
  culturalFocus: string;
  sessionType: 'storytelling' | 'cultural-exchange' | 'wisdom-sharing' | 'music-dance';
  languages: string[];
  hologramQuality: 'standard' | 'premium' | 'ultra';
}

interface Participant {
  id: string;
  name: string;
  culture: string;
  avatar: string;
  isHolographic: boolean;
  isHost: boolean;
  isSpeaking: boolean;
  reactions: string[];
}

export default function HolographicPresence() {
  const [isInSession, setIsInSession] = useState(false);
  const [selectedSession, setSelectedSession] = useState<HolographicSession | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isHologramMode, setIsHologramMode] = useState(false);
  const [hologramQuality, setHologramQuality] = useState<'standard' | 'premium' | 'ultra'>('premium');

  const liveSessions: HolographicSession[] = [
    {
      id: 'session-001',
      title: 'Ancient Wisdom Circle: Baobab Tree Stories',
      host: 'Elder Kofi Mensah',
      culture: 'Akan (Ghana)',
      participants: 12,
      maxParticipants: 20,
      startTime: '19:00 UTC',
      duration: '90 min',
      description: 'Join elders from across Africa as they share the sacred stories of the baobab tree, creating a virtual wisdom circle.',
      culturalFocus: 'Traditional African storytelling and tree mythology',
      sessionType: 'storytelling',
      languages: ['English', 'Twi', 'Swahili'],
      hologramQuality: 'ultra'
    },
    {
      id: 'session-002',
      title: 'Global Creation Myths Exchange',
      host: 'Dr. Maria Vasquez',
      culture: 'Pan-Cultural',
      participants: 8,
      maxParticipants: 15,
      startTime: '20:30 UTC',
      duration: '60 min',
      description: 'Storytellers from 5 continents share their culture\'s creation myths in an immersive holographic environment.',
      culturalFocus: 'Creation stories and cosmology',
      sessionType: 'cultural-exchange',
      languages: ['English', 'Spanish', 'Mandarin', 'Arabic'],
      hologramQuality: 'premium'
    },
    {
      id: 'session-003',
      title: 'Inuit Throat Singing & Stories',
      host: 'Aput Kanguq',
      culture: 'Inuit (Canada)',
      participants: 6,
      maxParticipants: 12,
      startTime: '21:00 UTC',
      duration: '45 min',
      description: 'Experience traditional Inuit throat singing and hear stories of the Arctic in a magical holographic ice cave.',
      culturalFocus: 'Arctic culture and musical traditions',
      sessionType: 'music-dance',
      languages: ['English', 'Inuktitut'],
      hologramQuality: 'ultra'
    }
  ];

  const sampleParticipants: Participant[] = [
    {
      id: 'part-001',
      name: 'Elder Kofi',
      culture: 'Ghana',
      avatar: '🧓🏿',
      isHolographic: true,
      isHost: true,
      isSpeaking: true,
      reactions: ['🌳', '✨']
    },
    {
      id: 'part-002',
      name: 'Amara',
      culture: 'Tanzania',
      avatar: '👩🏿',
      isHolographic: true,
      isHost: false,
      isSpeaking: false,
      reactions: ['❤️', '🙏']
    },
    {
      id: 'part-003',
      name: 'Sarah',
      culture: 'Canada',
      avatar: '👩🏻',
      isHolographic: false,
      isHost: false,
      isSpeaking: false,
      reactions: ['👏', '🌟']
    },
    {
      id: 'part-004',
      name: 'Ravi',
      culture: 'India',
      avatar: '👨🏽',
      isHolographic: true,
      isHost: false,
      isSpeaking: false,
      reactions: ['🔥', '✨']
    }
  ];

  useEffect(() => {
    if (isInSession) {
      setParticipants(sampleParticipants);
      // Simulate real-time reactions
      const interval = setInterval(() => {
        setParticipants(prev => prev.map(p => ({
          ...p,
          reactions: p.reactions.slice(-1).concat(['❤️', '👏', '🌟', '✨', '🔥'][Math.floor(Math.random() * 5)])
        })));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInSession]);

  const joinSession = (session: HolographicSession) => {
    setSelectedSession(session);
    setIsInSession(true);
  };

  const leaveSession = () => {
    setIsInSession(false);
    setSelectedSession(null);
    setParticipants([]);
  };

  const toggleHologram = () => {
    setIsHologramMode(!isHologramMode);
    // In a real implementation, this would toggle 3D holographic display
  };

  const sendReaction = (emoji: string) => {
    // Add reaction to local participant
    console.log(`Sending reaction: ${emoji}`);
  };

  const getQualityBadge = (quality: string) => {
    switch (quality) {
      case 'ultra': return 'bg-purple-600 text-white';
      case 'premium': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Video className="w-6 h-6 text-blue-600" />
          Holographic Cultural Exchange
          <Badge className="bg-blue-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Live 3D
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isInSession ? (
          <div className="space-y-6">
            {/* Live Sessions */}
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Live Holographic Sessions
              </h3>
              
              <div className="space-y-4">
                {liveSessions.map((session) => (
                  <div key={session.id} className="p-6 border border-amber-200 dark:border-gray-600 rounded-lg hover:shadow-lg transition-all bg-white/50 dark:bg-gray-800/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-amber-900 dark:text-amber-100">
                            {session.title}
                          </h4>
                          <Badge className={getQualityBadge(session.hologramQuality)}>
                            {session.hologramQuality.toUpperCase()} 3D
                          </Badge>
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            🔴 LIVE
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-amber-600 dark:text-amber-200 mb-2">
                          Hosted by {session.host} • {session.culture}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {session.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>🕐 {session.startTime}</span>
                          <span>⏱️ {session.duration}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.participants}/{session.maxParticipants}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button 
                          onClick={() => joinSession(session)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Join Hologram
                        </Button>
                        <div className="text-xs text-center text-muted-foreground">
                          {session.participants} people inside
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-amber-200 dark:border-gray-600">
                      <div>
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                          Cultural Focus
                        </div>
                        <div className="text-sm text-amber-600 dark:text-amber-200">
                          {session.culturalFocus}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-1">
                          Languages
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {session.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Info */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">
                  Holographic Technology
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-medium text-purple-900 dark:text-purple-100">3D Presence</div>
                  <div className="text-purple-700 dark:text-purple-200 text-xs">
                    Feel like you're in the same room
                  </div>
                </div>
                
                <div className="text-center">
                  <Hand className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-medium text-green-900 dark:text-green-100">Gesture Recognition</div>
                  <div className="text-green-700 dark:text-green-200 text-xs">
                    Natural hand movements translated
                  </div>
                </div>
                
                <div className="text-center">
                  <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-medium text-blue-900 dark:text-blue-100">Global Sync</div>
                  <div className="text-blue-700 dark:text-blue-200 text-xs">
                    Real-time worldwide connections
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Session Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  {selectedSession?.title}
                </h3>
                <div className="text-sm text-blue-700 dark:text-blue-200">
                  {selectedSession?.host} • {participants.length} participants
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className="bg-green-600 text-white animate-pulse">
                  🔴 LIVE
                </Badge>
                <Badge className={getQualityBadge(selectedSession?.hologramQuality || 'premium')}>
                  {selectedSession?.hologramQuality?.toUpperCase()} 3D
                </Badge>
              </div>
            </div>

            {/* 3D Holographic View */}
            <div className="relative aspect-video bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Holographic Environment */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🌳</div>
                  <div className="text-lg font-semibold mb-2">Sacred Baobab Circle</div>
                  <div className="text-sm opacity-80">Holographic Environment Active</div>
                </div>
              </div>

              {/* Participants in 3D Space */}
              <div className="absolute inset-0">
                {participants.map((participant, idx) => (
                  <div
                    key={participant.id}
                    className={`absolute transform transition-all duration-500 ${
                      idx === 0 ? 'bottom-1/3 left-1/2 -translate-x-1/2' :
                      idx === 1 ? 'bottom-1/4 left-1/4' :
                      idx === 2 ? 'bottom-1/4 right-1/4' :
                      'bottom-1/3 right-1/3'
                    }`}
                  >
                    <div className={`relative ${participant.isHolographic ? 'animate-pulse' : ''}`}>
                      <div className="text-4xl mb-1">{participant.avatar}</div>
                      <div className="text-xs text-white text-center bg-black/50 px-2 py-1 rounded">
                        {participant.name}
                      </div>
                      {participant.isSpeaking && (
                        <div className="absolute -top-2 -right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      )}
                      {participant.reactions.slice(-1).map((reaction, rIdx) => (
                        <div
                          key={rIdx}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl animate-bounce"
                        >
                          {reaction}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hologram Toggle */}
              <div className="absolute top-4 right-4">
                <Button
                  onClick={toggleHologram}
                  size="sm"
                  variant={isHologramMode ? 'default' : 'outline'}
                  className={isHologramMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-white/80 hover:bg-white'}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  {isHologramMode ? '3D ON' : '2D Mode'}
                </Button>
              </div>
            </div>

            {/* Session Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsMicEnabled(!isMicEnabled)}
                  size="sm"
                  variant={isMicEnabled ? 'default' : 'outline'}
                  className={isMicEnabled ? 'bg-green-600 hover:bg-green-700 text-white' : ''}
                >
                  {isMicEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
                
                <Button
                  onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                  size="sm"
                  variant={isCameraEnabled ? 'default' : 'outline'}
                  className={isCameraEnabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
                >
                  {isCameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                </Button>

                <Button size="sm" variant="outline">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Reactions */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground mr-2">React:</span>
                {['❤️', '👏', '🌟', '✨', '🔥'].map((emoji) => (
                  <Button
                    key={emoji}
                    onClick={() => sendReaction(emoji)}
                    size="sm"
                    variant="ghost"
                    className="text-lg hover:scale-110 transition-transform"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>

              <Button
                onClick={leaveSession}
                size="sm"
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Leave Session
              </Button>
            </div>

            {/* Live Chat/Reactions */}
            <div className="max-h-32 overflow-y-auto space-y-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Live Reactions & Messages</div>
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-amber-900 dark:text-amber-100">
                    {participant.name}
                  </span>
                  <span>reacted with {participant.reactions.slice(-1)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}