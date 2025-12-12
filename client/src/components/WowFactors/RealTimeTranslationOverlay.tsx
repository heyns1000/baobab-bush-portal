import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  Volume2, 
  VolumeX, 
  Settings, 
  Zap,
  Globe,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';

interface TranslationOverlayProps {
  originalText: string;
  originalLanguage: string;
  isLive?: boolean;
}

export default function RealTimeTranslationOverlay({ 
  originalText, 
  originalLanguage, 
  isLive = false 
}: TranslationOverlayProps) {
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [translatedText, setTranslatedText] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [confidence, setConfidence] = useState(98);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const languages = [
    'English', 'Spanish', 'French', 'Arabic', 'Swahili', 'Mandarin', 
    'Portuguese', 'Hindi', 'Russian', 'Japanese', 'German', 'Korean'
  ];

  useEffect(() => {
    if (originalText && targetLanguage !== originalLanguage) {
      setIsTranslating(true);
      // Simulate real-time translation with OpenAI
      setTimeout(() => {
        setTranslatedText(getSimulatedTranslation(originalText, targetLanguage));
        setIsTranslating(false);
        setConfidence(95 + Math.random() * 5);
      }, 300);
    }
  }, [originalText, targetLanguage, originalLanguage]);

  const getSimulatedTranslation = (text: string, lang: string): string => {
    const translations: Record<string, string> = {
      'English': 'Welcome to the ancient wisdom of the baobab tree, where stories connect all of humanity across time and culture.',
      'Spanish': 'Bienvenidos a la sabiduría ancestral del árbol baobab, donde las historias conectan a toda la humanidad a través del tiempo y la cultura.',
      'French': 'Bienvenue dans la sagesse ancestrale de l\'arbre baobab, où les histoires connectent toute l\'humanité à travers le temps et la culture.',
      'Arabic': 'مرحباً بكم في الحكمة القديمة لشجرة الباوباب، حيث تربط القصص البشرية جمعاء عبر الزمن والثقافة.',
      'Swahili': 'Karibu kwenye hekima ya kale ya mti wa baobab, ambapo hadithi zinaunganisha wanadamu wote kupitia wakati na utamaduni.',
      'Mandarin': '欢迎来到猴面包树的古老智慧，故事在这里跨越时间和文化连接全人类。',
      'Portuguese': 'Bem-vindos à sabedoria ancestral da árvore baobá, onde as histórias conectam toda a humanidade através do tempo e da cultura.',
      'Hindi': 'बाओबाब वृक्ष की प्राचीन बुद्धि में आपका स्वागत है, जहाँ कहानियाँ समय और संस्कृति के पार सभी मानवता को जोड़ती हैं।'
    };
    return translations[lang] || text;
  };

  if (!isVisible) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(true)}
        className="fixed top-24 right-4 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-amber-200"
      >
        <Languages className="w-4 h-4 mr-2" />
        Show Translation
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 left-6 right-6 md:left-auto md:w-96 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-amber-200 dark:border-gray-700 shadow-xl">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-amber-600" />
            <span className="font-semibold text-amber-900 dark:text-amber-100">
              Live Translation
            </span>
            {isLive && (
              <Badge className="bg-red-600 text-white text-xs animate-pulse">
                🔴 LIVE
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              {confidence.toFixed(1)}% confident
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Translate to:</span>
          </div>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border border-amber-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Original Text */}
        <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">
            Original ({originalLanguage}):
          </div>
          <div className="text-sm">{originalText}</div>
        </div>

        {/* Translated Text */}
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs text-amber-800 dark:text-amber-200">
              Translated ({targetLanguage}):
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className="h-6 w-6 p-0"
              >
                {voiceEnabled ? (
                  <Volume2 className="w-3 h-3 text-amber-600" />
                ) : (
                  <VolumeX className="w-3 h-3 text-muted-foreground" />
                )}
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          {isTranslating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-amber-700 dark:text-amber-300">
                Translating...
              </span>
            </div>
          ) : (
            <div className="text-sm text-amber-900 dark:text-amber-100 leading-relaxed">
              {translatedText}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-200 dark:border-gray-600">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              AI-Powered
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              120+ Languages
            </span>
          </div>
          
          {isLive && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-800 border-green-200">
              Real-time Processing
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}