import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Languages,
  Sparkles,
  Zap,
  Settings,
  Download,
  Share2,
  Activity,
  Brain,
  Globe,
  Users
} from 'lucide-react';

interface VoiceProfile {
  id: string;
  name: string;
  culture: string;
  language: string;
  gender: string;
  age: string;
  accent: string;
  speciality: string;
  emotionalRange: number;
  culturalAuthenticity: number;
  sample: string;
}

interface SynthesisSettings {
  pitch: number;
  speed: number;
  emotion: string;
  culturalTone: number;
  breathingPattern: string;
  emphasis: number;
}

export default function AIVoiceSynthesis() {
  const [selectedVoice, setSelectedVoice] = useState<VoiceProfile | null>(null);
  const [inputText, setInputText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [settings, setSettings] = useState<SynthesisSettings>({
    pitch: 50,
    speed: 50,
    emotion: 'warm',
    culturalTone: 80,
    breathingPattern: 'natural',
    emphasis: 50
  });

  const voiceProfiles: VoiceProfile[] = [
    {
      id: 'voice-001',
      name: 'Amara',
      culture: 'Maasai',
      language: 'Swahili/English',
      gender: 'Female',
      age: 'Elder (60+)',
      accent: 'East African',
      speciality: 'Traditional Stories',
      emotionalRange: 95,
      culturalAuthenticity: 98,
      sample: 'Welcome to the wisdom of our ancestors...'
    },
    {
      id: 'voice-002',
      name: 'Kwame',
      culture: 'Akan',
      language: 'Twi/English',
      gender: 'Male',
      age: 'Adult (40s)',
      accent: 'Ghanaian',
      speciality: 'Proverbs & Philosophy',
      emotionalRange: 88,
      culturalAuthenticity: 96,
      sample: 'The spider weaves wisdom into every thread...'
    },
    {
      id: 'voice-003',
      name: 'Fatima',
      culture: 'Tuareg',
      language: 'Tamasheq/French',
      gender: 'Female',
      age: 'Young Adult (20s)',
      accent: 'Saharan',
      speciality: 'Desert Tales',
      emotionalRange: 92,
      culturalAuthenticity: 94,
      sample: 'The desert holds secrets in every grain of sand...'
    },
    {
      id: 'voice-004',
      name: 'Mandla',
      culture: 'Zulu',
      language: 'Zulu/English',
      gender: 'Male',
      age: 'Elder (70+)',
      accent: 'South African',
      speciality: 'Praise Poetry',
      emotionalRange: 97,
      culturalAuthenticity: 99,
      sample: 'Hear the rhythm of our ancestral drums...'
    },
    {
      id: 'voice-005',
      name: 'Aishah',
      culture: 'Wolof',
      language: 'Wolof/French',
      gender: 'Female',
      age: 'Middle-aged (50s)',
      accent: 'Senegalese',
      speciality: 'Griotic Traditions',
      emotionalRange: 90,
      culturalAuthenticity: 97,
      sample: 'The griot\'s voice carries the history of generations...'
    }
  ];

  const emotions = ['warm', 'mystical', 'urgent', 'peaceful', 'celebratory', 'contemplative'];
  const breathingPatterns = ['natural', 'deep', 'rhythmic', 'subtle', 'dramatic'];

  const sampleTexts = [
    "Long ago, when the world was young and the baobab trees could walk, there lived a wise elephant who knew the secrets of the rainmaker.",
    "The ancestors whisper through the wind, carrying stories from the time before time, when humans and animals spoke the same language.",
    "In the heart of the savanna, where the acacia trees dance with the setting sun, an ancient prophecy awaits its fulfillment.",
    "Listen carefully, children of the earth, for the spirits of the land have tales to tell of courage, wisdom, and the unbreakable bonds of community."
  ];

  useEffect(() => {
    if (selectedVoice && !inputText) {
      setInputText(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
    }
  }, [selectedVoice]);

  const playSample = (voice: VoiceProfile) => {
    console.log(`Playing sample for ${voice.name}: "${voice.sample}"`);
    // In a real implementation, this would use Web Speech API or external TTS service
  };

  const synthesizeVoice = () => {
    if (!selectedVoice || !inputText) return;
    
    setIsSynthesizing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsSynthesizing(false);
      setIsPlaying(true);
      // Here would be the actual voice synthesis
      console.log('Synthesizing voice with settings:', settings);
    }, 2000);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  return (
    <Card className="w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-600" />
          AI Voice Synthesis
          <Badge className="bg-purple-600 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            Neural TTS
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div>
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Cultural Voice Profiles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voiceProfiles.map((voice) => (
              <div
                key={voice.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  selectedVoice?.id === voice.id
                    ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-200 hover:bg-purple-25'
                }`}
                onClick={() => setSelectedVoice(voice)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-amber-900 dark:text-amber-100">
                    {voice.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSample(voice);
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>{voice.culture} • {voice.language}</span>
                    <span>{voice.gender} • {voice.age}</span>
                  </div>
                  <div className="text-purple-600 dark:text-purple-400">
                    {voice.speciality}
                  </div>
                  <div className="flex justify-between">
                    <span>Emotional Range: {voice.emotionalRange}%</span>
                    <span>Authenticity: {voice.culturalAuthenticity}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div>
          <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Story Text
          </h3>
          <div className="space-y-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your story or cultural narrative here..."
              className="w-full h-24 p-3 border border-amber-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm resize-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <div className="flex gap-2">
              {sampleTexts.map((text, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(text)}
                  className="text-xs border-purple-200 hover:bg-purple-50"
                >
                  Sample {idx + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Settings */}
        {selectedVoice && (
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Voice Synthesis Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Pitch: {settings.pitch}%
                  </label>
                  <Slider
                    value={[settings.pitch]}
                    onValueChange={(value) => setSettings({...settings, pitch: value[0]})}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Speed: {settings.speed}%
                  </label>
                  <Slider
                    value={[settings.speed]}
                    onValueChange={(value) => setSettings({...settings, speed: value[0]})}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Cultural Tone: {settings.culturalTone}%
                  </label>
                  <Slider
                    value={[settings.culturalTone]}
                    onValueChange={(value) => setSettings({...settings, culturalTone: value[0]})}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Emotional Tone
                  </label>
                  <select
                    value={settings.emotion}
                    onChange={(e) => setSettings({...settings, emotion: e.target.value})}
                    className="w-full p-2 border border-purple-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                  >
                    {emotions.map(emotion => (
                      <option key={emotion} value={emotion}>
                        {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Breathing Pattern
                  </label>
                  <select
                    value={settings.breathingPattern}
                    onChange={(e) => setSettings({...settings, breathingPattern: e.target.value})}
                    className="w-full p-2 border border-purple-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-sm"
                  >
                    {breathingPatterns.map(pattern => (
                      <option key={pattern} value={pattern}>
                        {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Emphasis: {settings.emphasis}%
                  </label>
                  <Slider
                    value={[settings.emphasis]}
                    onValueChange={(value) => setSettings({...settings, emphasis: value[0]})}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Synthesis Controls */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-4">
            {isSynthesizing ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
                <div className="text-purple-700 dark:text-purple-300">
                  <div className="font-medium">AI Processing...</div>
                  <div className="text-xs">Applying cultural nuances</div>
                </div>
              </div>
            ) : isPlaying ? (
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-green-600 animate-pulse" />
                <div className="text-green-700 dark:text-green-300">
                  <div className="font-medium">Playing Synthesis</div>
                  <div className="text-xs">{selectedVoice?.name} voice</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-purple-600" />
                <div className="text-purple-700 dark:text-purple-300">
                  <div className="font-medium">Ready to Synthesize</div>
                  <div className="text-xs">Neural AI voice generation</div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {!isSynthesizing && !isPlaying && (
              <Button
                onClick={synthesizeVoice}
                disabled={!selectedVoice || !inputText}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Brain className="w-4 h-4 mr-2" />
                Generate Voice
              </Button>
            )}
            
            {isPlaying && (
              <>
                <Button
                  onClick={stopPlayback}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Cultural Authenticity Notice */}
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-900 dark:text-amber-100">
              Cultural Authenticity Commitment
            </span>
          </div>
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Our AI voices are trained with respect for cultural heritage and in collaboration with 
            community elders to ensure authentic representation of traditional storytelling styles.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}