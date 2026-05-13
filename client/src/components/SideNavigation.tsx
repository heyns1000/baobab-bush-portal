import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
}

const navigationItems: NavigationItem[] = [
  { id: "episode-console", label: "Episode Management Console", icon: "▶" },
  { id: "emission-panel", label: "Live Emission Panel", icon: "◈" },
  { id: "treaty-memory", label: "Treaty Memory Section", icon: "◆" },
  { id: "glyph-console", label: "Glyph-Tap Console", icon: "⧫" },
  { id: "status-panel", label: "Status Panel", icon: "◉" },
];

export default function SideNavigation() {
  const [activeNav, setActiveNav] = useState("episode-console");

  const quickActions = [
    { action: "upload", label: "Upload Episode", icon: "↑" },
    { action: "sync", label: "Sync Stream", icon: "⟲" },
    { action: "lock", label: "Lock Feed", icon: "⟐" },
  ];

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    // Scroll to section or handle navigation
    const element = document.getElementById(navId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions
  };

  return (
    <aside className="w-80 bg-terminal-panel border-r border-terminal-gold/30 flex-shrink-0">
      <div className="p-6">
        <div className="space-y-1 mb-8">
          <div className="text-terminal-bright text-lg font-semibold">🌳 Baobab Portal</div>
          <div className="text-terminal-muted text-xs">v2.4.7 | Build 20250121</div>
        </div>
        
        <nav className="space-y-2">
          <div className="text-terminal-gold text-sm font-medium mb-4 border-b border-terminal-gold/20 pb-2">
            NAVIGATION TREE
          </div>
          
          {navigationItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`baobab-branch block w-full text-left px-3 py-2 rounded border transition-colors text-sm ${
                activeNav === item.id
                  ? 'border-terminal-bright bg-terminal-gold/20 gold-capsule'
                  : 'border-terminal-gold/30 hover:bg-terminal-gold/10 gold-capsule'
              }`}
              data-testid={`nav-${item.id}`}
            >
              <span className="text-terminal-gold">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 p-4 bg-terminal-bg/50 rounded border border-terminal-gold/20">
          <div className="text-terminal-gold text-sm font-medium mb-3">QUICK ACTIONS</div>
          <div className="space-y-2 text-xs">
            {quickActions.map((action) => (
              <Button
                key={action.action}
                onClick={() => handleQuickAction(action.action)}
                variant="ghost"
                className="w-full justify-start p-2 h-auto hover:bg-terminal-gold/10 text-white border-0 neon-button gold-capsule"
                data-testid={`action-${action.action}`}
              >
                <span className="text-terminal-bright mr-2">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
