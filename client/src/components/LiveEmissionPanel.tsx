import { useQuery } from "@tanstack/react-query";
import type { Episode, EpisodeStats, SystemStatus } from "@shared/schema";

export default function LiveEmissionPanel() {
  const { data: episodes = [] } = useQuery<Episode[]>({
    queryKey: ["/api/episodes"],
    refetchInterval: 5000,
  });

  const { data: allStats = [] } = useQuery<EpisodeStats[]>({
    queryKey: ["/api/episode-stats"],
    refetchInterval: 3000,
  });

  const { data: systemStatus } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    refetchInterval: 2000,
  });

  const liveEpisodes = episodes.filter(ep => ep.status === 'live').slice(0, 3);

  const getEpisodeStats = (episodeId: string) => {
    return allStats.find(stats => stats.episodeId === episodeId);
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return 'text-terminal-success';
    if (signal >= 60) return 'text-terminal-warning';
    return 'text-red-400';
  };

  const stats = [
    {
      label: "ACTIVE PLAYS",
      value: systemStatus?.activePlays || 0,
      className: "text-terminal-bright",
    },
    {
      label: "DOWNLOADS/Hr",
      value: systemStatus?.downloadsPerHour || 0,
      className: "text-terminal-success",
    },
    {
      label: "SIGNAL STRENGTH",
      value: `${systemStatus?.signalStrength || 0}%`,
      className: "text-terminal-warning",
    },
    {
      label: "LISTENERS",
      value: systemStatus?.listeners || 0,
      className: "text-white",
    },
  ];

  return (
    <div className="bg-terminal-panel border border-terminal-gold/30 rounded p-6" id="emission-panel">
      <h2 className="text-terminal-bright text-lg font-semibold mb-6">◈ LIVE EMISSION PANEL</h2>
      
      {/* Real-time Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-terminal-bg/50 rounded p-3 border border-terminal-gold/20">
            <div className="text-terminal-gold text-xs font-medium">{stat.label}</div>
            <div 
              className={`text-2xl font-bold ${stat.className}`}
              data-testid={`stat-${stat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
          </div>
        ))}
      </div>
      
      {/* Episode Performance */}
      <div className="space-y-3">
        <div className="text-terminal-gold text-sm font-medium">EPISODE SIGNALS</div>
        
        {liveEpisodes.length === 0 ? (
          <div className="text-terminal-muted text-sm text-center py-4">
            No live episodes currently broadcasting
          </div>
        ) : (
          liveEpisodes.map((episode) => {
            const stats = getEpisodeStats(episode.id);
            const signalStrength = stats ? parseFloat(stats.signalStrength || "0") : 0;
            
            return (
              <div
                key={episode.id}
                className="flex items-center justify-between p-3 bg-terminal-bg/30 rounded border border-terminal-gold/10"
                data-testid={`live-episode-${episode.id}`}
              >
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {episode.title.length > 25 
                      ? `${episode.title.substring(0, 25)}...` 
                      : episode.title
                    }
                  </div>
                  <div className="text-xs text-terminal-muted">
                    Freq: {episode.frequency}kHz | 
                    Plays: {stats?.plays || 0} | 
                    Downloads: {stats?.downloads || 0}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-terminal-bg rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        signalStrength >= 80 ? 'bg-terminal-success' : 
                        signalStrength >= 60 ? 'bg-terminal-warning' : 'bg-red-400'
                      }`}
                      style={{ width: `${Math.min(signalStrength, 100)}%` }}
                    />
                  </div>
                  <span 
                    className={`text-xs ${getSignalColor(signalStrength)}`}
                    data-testid={`signal-${episode.id}`}
                  >
                    {Math.round(signalStrength)}%
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
