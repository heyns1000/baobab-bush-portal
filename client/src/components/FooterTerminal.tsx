import { useQuery } from "@tanstack/react-query";
import type { SystemStatus } from "@shared/schema";

export default function FooterTerminal() {
  const { data: systemStatus } = useQuery<SystemStatus>({
    queryKey: ["/api/system-status"],
    refetchInterval: 10000,
  });

  return (
    <footer className="bg-terminal-panel border-t border-terminal-gold/30 p-4">
      <div className="flex items-center justify-between text-xs text-terminal-muted">
        <div>🧠🧠🧠FAA Actuary Mastery™ Terminal | Powered by Baobab Security Network</div>
        <div className="flex items-center space-x-4">
          <div>Build: <span className="text-terminal-gold">20250121-1542</span></div>
          <div>
            Uptime: <span className="text-terminal-gold" data-testid="uptime">
              {systemStatus?.uptime || "0d 0h 0m"}
            </span>
          </div>
          <div>
            Connections: <span className="text-terminal-success" data-testid="connections">
              {systemStatus?.connections || 0}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
