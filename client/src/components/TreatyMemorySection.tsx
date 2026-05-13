import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { TreatyLog } from "@shared/schema";

export default function TreatyMemorySection() {
  const queryClient = useQueryClient();
  const [seedPulse, setSeedPulse] = useState(false);
  
  const { data: logs = [], isLoading } = useQuery<TreatyLog[]>({
    queryKey: ["/api/treaty-logs"],
    refetchInterval: 2000,
  });

  const clearLogsMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/treaty-logs");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/treaty-logs"] });
    },
  });

  const exportLogs = () => {
    const logData = logs.map(log => ({
      timestamp: log.timestamp,
      event: log.event,
      description: log.description,
      vaultPulse: log.vaultPulse,
    }));
    
    const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treaty-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatTimestamp = (timestamp: string | Date) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });
  };

  const getEventColor = (event: string) => {
    switch (event) {
      case 'DROP': return 'text-terminal-bright';
      case 'SYNC': return 'text-terminal-success';
      case 'LOCK': return 'text-terminal-warning';
      case 'UPLOAD': return 'text-terminal-gold';
      default: return 'text-terminal-muted';
    }
  };

  return (
    <div className="bg-terminal-panel border border-terminal-gold/30 rounded p-6 parchment-texture" id="treaty-memory">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-terminal-bright text-lg font-semibold">◆ TREATY MEMORY SECTION</h2>
        <div className="flex items-center space-x-2 text-terminal-gold text-sm">
          <span className="text-terminal-muted">Treaty Echo Count:</span>
          <span className="animate-pulse">🌱</span>
          <span className="font-semibold">{logs.length}</span>
        </div>
      </div>
      <div className="text-terminal-muted text-sm mb-4">Auto-logged VaultPulse entries per drop event</div>
      
      {/* Memory Log with enhanced styling */}
      <div className="bg-terminal-bg/70 rounded p-4 h-64 overflow-y-auto border border-terminal-gold/20 parchment-texture">
        {isLoading ? (
          <div className="text-terminal-muted text-sm empty-flicker">⧗ Loading treaty logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-terminal-muted text-sm empty-flicker text-center py-12">
            <div className="text-2xl mb-2">🌘</div>
            <div>No treaty logs available</div>
            <div className="text-xs mt-2 opacity-60">Awaiting VaultPulse synchronization...</div>
          </div>
        ) : (
          <div className="space-y-2 text-sm font-mono">
            {logs.map((log, index) => (
              <div 
                key={log.id}
                className="flex items-start space-x-4 p-2 hover:bg-terminal-gold/5 rounded transition-all duration-200"
                data-testid={`log-${log.id}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="text-terminal-gold flex-shrink-0">
                  [{formatTimestamp(log.timestamp!)}]
                </span>
                <span className={`flex-shrink-0 ${getEventColor(log.event)} font-bold`}>
                  {log.event}
                </span>
                <span className="text-white">
                  {log.description} | VaultPulse: <span className="vault-pulse-enhanced">{log.vaultPulse}</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Memory Actions */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-terminal-muted text-xs flex items-center space-x-4">
          <span>
            Total entries: <span className="text-terminal-gold" data-testid="total-entries">{logs.length}</span>
          </span>
          <span>|
            Memory usage: <span className="text-terminal-gold" data-testid="memory-usage">
              {(logs.length * 0.5).toFixed(1)}MB
            </span>
          </span>
          <span className="flex items-center space-x-1">
            🌰 <span className="text-terminal-gold">{Math.floor(logs.length / 10)}</span> seeds archived
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={exportLogs}
            disabled={logs.length === 0}
            variant="outline"
            size="sm"
            className="px-3 py-1 bg-terminal-bg/50 hover:bg-terminal-gold/10 border-terminal-gold/30 text-xs h-auto neon-button"
            data-testid="export-logs"
          >
            EXPORT
          </Button>
          <Button
            onClick={() => clearLogsMutation.mutate()}
            disabled={clearLogsMutation.isPending || logs.length === 0}
            variant="outline"
            size="sm"
            className="px-3 py-1 bg-terminal-bg/50 hover:bg-terminal-gold/10 border-terminal-gold/30 text-xs h-auto neon-button"
            data-testid="clear-logs"
          >
            {clearLogsMutation.isPending ? "CLEARING..." : "CLEAR"}
          </Button>
        </div>
      </div>
    </div>
  );
}
