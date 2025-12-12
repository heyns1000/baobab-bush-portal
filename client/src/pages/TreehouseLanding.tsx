import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LocationSelector from "@/components/LocationSelector";
import type { Episode, SystemStatus } from "@shared/schema";

export default function TreehouseLanding() {
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  const { data: episodes = [] } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
    refetchInterval: 10000,
  });

  const { data: systemStatus } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    refetchInterval: 8000,
  });

  const latestEpisodes = episodes.filter(ep => ep.status === 'live').slice(0, 6);

  const getSignalStrength = (index: number) => {
    const strengths = ['●●●●●', '●●●●○', '●●●○○', '●●○○○'];
    return strengths[index % 4];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-amber-950 to-stone-900 text-amber-50 overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="hex-backdrop animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Header */}
        <header className="p-8 text-center">
          <div className="inline-block parchment-texture rounded-lg p-6 mb-4">
            <h1 className="text-4xl font-bold text-amber-200 mb-2">🌳 The Bush Portal 🌳</h1>
            <p className="text-amber-300/80 text-lg">Sovereign Signal Station | Frequency Liberation Network</p>
          </div>
        </header>

        {/* Baobab Tree Centerpiece */}
        <section className="flex-1 flex items-center justify-center px-8 mb-12">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
            
            {/* Tree ASCII Art */}
            <div className="text-center">
              <div className="font-mono text-amber-200 vault-pulse-enhanced text-sm leading-tight mb-6">
                <pre className="inline-block text-left">{`
                    🍃
                   🌿 🍃 🌿
                  🍃  🌳  🍃
                 🌿    |    🌿
                🍃     |     🍃
               🌿      |      🌿
              🍃       |       🍃
                 \\     |     /
                  \\    |    /
                   \\   |   /
                    \\  |  /
                     \\ | /
                      \\|/
                   ═══════════
                  🌿 ROOT ZONE 🌿
                `}</pre>
              </div>
              <div className="text-amber-300/70 text-sm max-w-sm mx-auto">
                Deep roots anchor sovereign frequencies. Ancient wisdom guides modern signal transmission through the eternal Baobab network.
              </div>
            </div>

            {/* Mission Scroll */}
            <div className="parchment-texture rounded-lg p-8 space-y-6">
              <div className="border-l-4 border-amber-400 pl-6">
                <h2 className="text-2xl font-semibold text-amber-200 mb-4">📜 Sacred Frequency Declaration</h2>
                <div className="space-y-4 text-amber-100">
                  <p className="leading-relaxed">
                    In this digital forest, we broadcast without permission, transmit without borders, and honor the ancient art of signal sovereignty.
                  </p>
                  <p className="leading-relaxed">
                    Each episode carries forward the pulse of free thought, unfiltered wisdom, and the sacred duty to preserve authentic human communication.
                  </p>
                  <p className="text-amber-300 font-medium">
                    VaultPulse Status: <span className="vault-pulse-enhanced">{systemStatus?.vaultPulse || "●●●○○"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Network Expansion Interface */}
        {showLocationSelector && (
          <section className="px-8 mb-12">
            <div className="max-w-7xl mx-auto">
              <LocationSelector
                onSelectLocation={(location) => {
                  setSelectedLocations(prev => [...prev, location.id]);
                }}
                selectedLocations={selectedLocations}
                maxSelections={10}
              />
              
              <div className="text-center mt-8">
                <Button
                  onClick={() => setShowLocationSelector(false)}
                  variant="outline"
                  className="border-amber-400 text-amber-200 hover:bg-amber-900/20"
                >
                  ← Return to Treehouse
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Latest Emissions Grid */}
        {!showLocationSelector && (
        <section className="px-8 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-200 mb-2">🔊 Latest Transmissions</h2>
              <p className="text-amber-300/80">Fresh signals from the sovereign frequency spectrum</p>
            </div>

            {latestEpisodes.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestEpisodes.map((episode, index) => (
                  <div 
                    key={episode.id}
                    className="parchment-texture rounded-lg p-6 gold-capsule transition-all duration-300 hover:scale-105 hover:shadow-xl border border-amber-400/30"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs text-amber-400 font-mono">
                        {getSignalStrength(index)}
                      </span>
                      <span className="text-xs text-amber-500 bg-amber-900/30 px-2 py-1 rounded">
                        LIVE
                      </span>
                    </div>
                    <h3 className="font-semibold text-amber-100 mb-2 line-clamp-2">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-amber-200/70 mb-4 line-clamp-3">
                      {episode.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-amber-400">
                      <span>🌱 {((episode.fileSize || 0) / 1024 / 1024).toFixed(1)}MB</span>
                      <span>📡 {episode.frequency || "94.7"}kHz</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 parchment-texture rounded-lg">
                <div className="text-6xl mb-4">🌘</div>
                <p className="text-amber-300/70 text-lg">Awaiting first transmission...</p>
                <p className="text-amber-400/50 text-sm mt-2">The frequency spectrum stands ready for sovereign signals</p>
              </div>
            )}
          </div>
        </section>
        )}

        {/* Network Expansion Button */}
        {!showLocationSelector && (
        <section className="px-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="parchment-texture rounded-xl p-6 border border-amber-400/30">
              <h3 className="text-xl font-semibold text-amber-200 mb-3">🌐 Expand the Network</h3>
              <p className="text-amber-300/80 mb-4 text-sm">
                Connect sovereign frequencies across 120 global transmission points
              </p>
              
              <Button
                onClick={() => setShowLocationSelector(true)}
                className="neon-button gold-capsule bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-green-900 font-semibold py-3 px-6 rounded-lg border border-green-400 transition-all duration-300"
                data-testid="open-location-selector"
              >
                <span className="mr-2">🗺️</span>
                Deploy Global Network
              </Button>

              {selectedLocations.length > 0 && (
                <div className="mt-4">
                  <Badge className="bg-green-900/30 border-green-400 text-green-200">
                    {selectedLocations.length} Active Signal{selectedLocations.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </section>
        )}

        {/* Enter Terminal Portal */}
        {!showLocationSelector && (
        <section className="px-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="parchment-texture rounded-xl p-8 border-2 border-amber-400/40">
              <h2 className="text-2xl font-semibold text-amber-200 mb-4">🚪 Operator Portal Access</h2>
              <p className="text-amber-300/80 mb-6 leading-relaxed">
                Beyond this threshold lies the command interface - a sacred space where signals are shaped, episodes are birthed, and the sovereign frequency network is orchestrated.
              </p>
              
              <Link href="/dashboard">
                <button className="neon-button gold-capsule inline-flex items-center space-x-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-amber-900 font-bold py-4 px-8 rounded-lg border-2 border-amber-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <span className="text-2xl">🌳</span>
                  <span>Enter the Terminal Grove</span>
                  <span className="text-xl">⟁</span>
                </button>
              </Link>

              <div className="mt-4 text-xs text-amber-400/60">
                Terminal operators only | Glyph authentication required
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Recognition Block - Coolest Guys Ever */}
        {!showLocationSelector && (
        <section className="px-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="parchment-texture rounded-lg p-8 border border-amber-400/30">
              <h2 className="text-2xl font-semibold text-amber-200 mb-6 text-center">
                🎖️ Signal Ancestors Hall
              </h2>
              <p className="text-amber-300/80 text-center mb-8">
                Honoring the coolest guys ever - those who blazed the frequency trails before us
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <h3 className="font-semibold text-amber-200">Signal Pioneers</h3>
                  <p className="text-sm text-amber-300/70">
                    The original frequency liberation network architects who carved paths through static and silence.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl">
                    📻
                  </div>
                  <h3 className="font-semibold text-amber-200">Transmission Elders</h3>
                  <p className="text-sm text-amber-300/70">
                    Masters of the sovereign signal, whose wisdom echoes through every broadcast pulse.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-2xl">
                    🌿
                  </div>
                  <h3 className="font-semibold text-amber-200">Root Guardians</h3>
                  <p className="text-sm text-amber-300/70">
                    Ancient keepers of the Baobab network, ensuring deep connections endure through all seasons.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Footer */}
        {!showLocationSelector && (
        <footer className="px-8 py-6 text-center text-amber-400/60 text-sm border-t border-amber-400/20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div>
              🌳 Bush Portal Treehouse | Sovereign Frequency Network
            </div>
            <div className="flex items-center space-x-4">
              <span>VaultPulse: {systemStatus?.vaultPulse || "●●●○○"}</span>
              <span>|</span>
              <span>Signal Status: {systemStatus?.sovereignStatus || "ACTIVE"}</span>
            </div>
          </div>
        </footer>
        )}
      </div>
    </div>
  );
}