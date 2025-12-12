import { useState } from 'react';
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RealTimeTranslationOverlay from '@/components/WowFactors/RealTimeTranslationOverlay';
import GlobalListeningHeatmap from '@/components/WowFactors/GlobalListeningHeatmap';
import ARBaobabVisualization from '@/components/WowFactors/ARBaobabVisualization';
import AIVoiceSynthesis from '@/components/WowFactors/AIVoiceSynthesis';
import BiometricEngagement from '@/components/WowFactors/BiometricEngagement';
import NeuralContentMatching from '@/components/WowFactors/NeuralContentMatching';
import HolographicPresence from '@/components/WowFactors/HolographicPresence';
import AdaptivePlayer from '@/components/Streaming/AdaptivePlayer';

export default function WowFactors() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample podcast data for adaptive player
  const samplePodcast = {
    id: 'podcast-001',
    title: 'Ancient Baobab Wisdom',
    host: 'Elder Amara Kikwete',
    duration: 1800, // 30 minutes
    thumbnail: '🌳',
    streamUrl: '/api/stream/podcast-001',
    qualityOptions: [
      { quality: 'low', bitrate: '64kbps', url: '/api/stream/podcast-001/low' },
      { quality: 'medium', bitrate: '128kbps', url: '/api/stream/podcast-001/medium' },
      { quality: 'high', bitrate: '320kbps', url: '/api/stream/podcast-001/high' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950">
      <Header onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          dataSourceStatuses={[]}
        />
        
        <main className="flex-1 ml-64 transition-all duration-300">
          <div className="container mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="text-5xl mr-4">🚀</div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    Global Amazement Factors
                  </h1>
                  <p className="text-xl text-amber-600 dark:text-amber-200">
                    Next-Generation Technologies for Cultural Connection
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="translation" className="w-full">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 mb-8">
                <TabsTrigger value="translation">Translation</TabsTrigger>
                <TabsTrigger value="heatmap">Global Map</TabsTrigger>
                <TabsTrigger value="ar">AR Vision</TabsTrigger>
                <TabsTrigger value="voice">AI Voice</TabsTrigger>
                <TabsTrigger value="biometric">Biometric</TabsTrigger>
                <TabsTrigger value="neural">Neural AI</TabsTrigger>
                <TabsTrigger value="holographic">Holographic</TabsTrigger>
                <TabsTrigger value="streaming">Adaptive Stream</TabsTrigger>
                <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
                <TabsTrigger value="quantum">Quantum</TabsTrigger>
              </TabsList>

              <TabsContent value="translation" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🌍 Real-Time Translation Overlay
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Instant AI-powered translation with cultural context preservation
                  </p>
                </div>
                <RealTimeTranslationOverlay 
                  originalText="Hakuna matata ni maneno ya Kiswahili ambayo yanamaanisha 'hakuna matatizo'. Hii ni falsafa ya maisha kutoka Afrika Mashariki."
                  originalLanguage="Swahili"
                  isLive={true}
                />
              </TabsContent>

              <TabsContent value="heatmap" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🗺️ Global Listening Heatmap
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Real-time visualization of global cultural engagement
                  </p>
                </div>
                <GlobalListeningHeatmap />
              </TabsContent>

              <TabsContent value="ar" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🥽 Augmented Reality Baobab
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Immersive AR storytelling with interactive cultural elements
                  </p>
                </div>
                <ARBaobabVisualization />
              </TabsContent>

              <TabsContent value="voice" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🎙️ AI Voice Synthesis
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Culturally authentic AI-generated voices for global storytelling
                  </p>
                </div>
                <AIVoiceSynthesis />
              </TabsContent>

              <TabsContent value="biometric" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    💓 Biometric Engagement
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Real-time emotional response tracking for personalized content
                  </p>
                </div>
                <BiometricEngagement />
              </TabsContent>

              <TabsContent value="neural" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    🧠 Neural Content Matching
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Advanced AI that understands your cultural DNA for perfect recommendations
                  </p>
                </div>
                <NeuralContentMatching />
              </TabsContent>

              <TabsContent value="holographic" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    👻 Holographic Presence
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    3D holographic cultural exchanges with global storytellers
                  </p>
                </div>
                <HolographicPresence />
              </TabsContent>

              <TabsContent value="streaming" className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    📡 Adaptive Streaming
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200">
                    Intelligent audio streaming with automatic quality optimization
                  </p>
                </div>
                <AdaptivePlayer podcastData={samplePodcast} />
              </TabsContent>

              <TabsContent value="blockchain" className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">⛓️</div>
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Blockchain Creator Tokens
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200 mb-6">
                    Decentralized creator economy with cultural NFTs and tokenized storytelling rights
                  </p>
                  <div className="max-w-2xl mx-auto p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                    <p className="text-purple-700 dark:text-purple-200">
                      🚧 Coming Soon: Blockchain-powered creator tokens, cultural heritage NFTs, 
                      and decentralized storytelling rights management system.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="quantum" className="space-y-6">
                <div className="text-center">
                  <div className="text-5xl mb-4">⚛️</div>
                  <h2 className="text-2xl font-semibold text-amber-900 dark:text-amber-100 mb-4">
                    Quantum Recommendation Engine
                  </h2>
                  <p className="text-amber-600 dark:text-amber-200 mb-6">
                    Quantum-inspired algorithms for impossible precision in cultural content matching
                  </p>
                  <div className="max-w-2xl mx-auto p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <p className="text-indigo-700 dark:text-indigo-200">
                      🔬 Research Phase: Quantum computing applications for cultural pattern recognition 
                      and multi-dimensional preference mapping across infinite cultural variables.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}