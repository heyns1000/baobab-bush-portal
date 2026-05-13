import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CommandHistory {
  timestamp: string;
  command: string;
  response: string;
  success: boolean;
}

export default function CommandTerminal() {
  const [command, setCommand] = useState("");
  const [showCommandDropdown, setShowCommandDropdown] = useState(false);
  const [pushActive, setPushActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([
    {
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      command: 'status --verbose',
      response: 'System: ACTIVE | Episodes: 47 | Total Plays: 15,432',
      success: true,
    }
  ]);
  
  const quickCommands = [
    'push_episode --latest',
    'sync_stream --force',
    'lock_feed --secure',
    'status --verbose',
    'help'
  ];

  const queryClient = useQueryClient();

  const executeCommandMutation = useMutation({
    mutationFn: async (cmd: string) => {
      const response = await apiRequest("POST", "/api/commands", { command: cmd });
      return response.json();
    },
    onSuccess: (data, cmd) => {
      const newEntry: CommandHistory = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        command: cmd,
        response: data.response,
        success: true,
      };
      setCommandHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 commands
      setCommand("");
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/system-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/treaty-logs"] });
    },
    onError: (error, cmd) => {
      const newEntry: CommandHistory = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        command: cmd,
        response: `Error: ${error.message}`,
        success: false,
      };
      setCommandHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    },
  });

  const handleExecute = () => {
    if (command.trim()) {
      setPushActive(true);
      setTimeout(() => setPushActive(false), 200);
      executeCommandMutation.mutate(command.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleExecute();
      setShowCommandDropdown(false);
    } else if (e.key === 'ArrowUp' && (e.metaKey || e.ctrlKey)) {
      setShowCommandDropdown(!showCommandDropdown);
    } else if (e.key === 'Escape') {
      setShowCommandDropdown(false);
    }
  };
  
  const selectQuickCommand = (cmd: string) => {
    setCommand(cmd);
    setShowCommandDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="bg-terminal-panel border border-terminal-gold/30 rounded p-6 terminal-glow" id="glyph-console">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-terminal-bright text-lg font-semibold">⧫ GLYPH-TAP CONSOLE</h2>
        <div className="text-terminal-muted text-sm">Type commands to execute</div>
      </div>
      
      {/* Command History */}
      <div className="bg-terminal-bg/70 rounded p-4 mb-4 h-32 overflow-y-auto border border-terminal-gold/20">
        <div className="space-y-1 text-sm font-mono">
          {commandHistory.map((entry, index) => (
            <div key={index} className="space-y-1">
              <div className="text-terminal-muted">
                [{entry.timestamp}] &gt; {entry.command}
              </div>
              <div className={entry.success ? "text-terminal-success" : "text-red-400"}>
                [{entry.timestamp}] {entry.response}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Command Input */}
      <div className="flex items-center space-x-3">
        <span className="text-terminal-gold font-semibold">root@baobab:~$</span>
        <div className="flex-1 relative">
          <Input
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter command..."
            className="w-full bg-transparent border-none outline-none text-white font-mono focus:ring-0 focus:border-none glyph-input terminal-cursor"
            disabled={executeCommandMutation.isPending}
            data-testid="command-input"
          />
          {showCommandDropdown && (
            <div className="absolute bottom-full left-0 mb-2 w-full bg-terminal-panel border border-terminal-gold/50 rounded p-2 shadow-lg z-10">
              <div className="text-xs text-terminal-gold mb-2">Quick Commands (⌘+↑):</div>
              {quickCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => selectQuickCommand(cmd)}
                  className="block w-full text-left px-2 py-1 text-sm font-mono text-terminal-muted hover:text-terminal-bright hover:bg-terminal-gold/10 rounded"
                >
                  {cmd}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button 
          onClick={handleExecute}
          disabled={executeCommandMutation.isPending || !command.trim()}
          className={`px-4 py-2 bg-terminal-gold/20 hover:bg-terminal-gold/30 border border-terminal-gold text-sm neon-button ${pushActive ? 'push-active' : ''}`}
          data-testid="execute-command"
        >
          {executeCommandMutation.isPending ? "EXECUTING..." : "EXECUTE"}
        </Button>
      </div>
      
      {/* Command Reference */}
      <div className="mt-4 text-xs text-terminal-muted">
        <div className="mb-2 flex justify-between items-center">
          <span>
            Available commands: <span className="text-terminal-gold">push_episode</span>, <span className="text-terminal-gold">sync_stream</span>, <span className="text-terminal-gold">lock_feed</span>, <span className="text-terminal-gold">status</span>, <span className="text-terminal-gold">help</span>
          </span>
          <button
            onClick={() => setShowCommandDropdown(!showCommandDropdown)}
            className="text-terminal-gold hover:text-terminal-bright px-2 py-1 border border-terminal-gold/30 rounded text-xs"
          >
            ⌘+↑ Quick
          </button>
        </div>
      </div>
    </div>
  );
}
