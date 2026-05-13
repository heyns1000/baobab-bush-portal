import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { SystemStatus } from "@shared/schema";

export default function StatusBar() {
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

  const statusItems = [
    {
      label: "SOVEREIGN STATUS",
      value: systemStatus?.sovereignStatus || "LOADING",
      className: "text-terminal-success",
      glow: true,
    },
    {
      label: "FEED DRIFT",
      value: `${systemStatus?.feedDrift || "0.0"}%`,
      className: "text-white crt-flicker",
      special: "crt",
    },
    {
      label: "LAST DROP",
      value: systemStatus?.lastDrop 
        ? new Date(systemStatus.lastDrop).toLocaleTimeString('en-US', { hour12: false }) 
        : currentTime.toLocaleTimeString('en-US', { hour12: false }),
      className: "text-white",
      special: "clock",
    },
    {
      label: "VAULT PULSE",
      value: systemStatus?.vaultPulse || "●●●○○",
      className: "text-terminal-bright",
      special: "vaultpulse",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4" id="status-panel">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className={`bg-terminal-panel border border-terminal-gold/30 rounded p-4 ${
            item.glow ? 'terminal-glow' : ''
          }`}
        >
          <div className="text-terminal-gold text-xs font-medium">{item.label}</div>
          <div 
            className={`text-lg font-semibold mt-1 ${
              item.special === 'vaultpulse' ? 'vault-pulse-enhanced' : 
              item.special === 'clock' ? 'clock-tick' :
              item.className
            }`}
            data-testid={`status-${item.label.toLowerCase().replace(' ', '-')}`}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}
