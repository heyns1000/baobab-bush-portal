import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { SystemStatus } from "@shared/schema";

export default function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { data: systemStatus } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    refetchInterval: 5000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toISOString().replace('T', ' ').slice(0, -5) + ' UTC';
  };

  return (
    <header className="border-b border-terminal-gold/30 bg-terminal-panel/50 backdrop-blur-sm">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-terminal-bright text-xl font-semibold">
              🧠🧠🧠FAA Actuary Mastery™
            </div>
            <div className="text-terminal-muted">|</div>
            <div className="text-terminal-gold">Terminal Console</div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="text-terminal-muted">STATUS:</div>
            <div className="text-terminal-success animate-pulse" data-testid="status-indicator">
              ● {systemStatus?.sovereignStatus || 'LOADING'}
            </div>
            <div className="text-terminal-muted">|</div>
            <div className="text-terminal-gold" data-testid="current-time">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
