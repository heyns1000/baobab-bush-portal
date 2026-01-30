/**
 * BushPortal Baobab Terminal Activation Layer
 * ============================================
 * Activates all interactive elements in baobab_terminal.html
 *
 * Features:
 * - Terminal commands (help, status, sectors, code, etc.)
 * - Sector navigation (8 terminals)
 * - Dashboard buttons
 * - Live AI Coding integration
 * - Smooth scrolling
 * - Visual animations
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    baseUrl: window.location.origin,
    liveCodingPath: '/live-coding',
    sectors: {
      'vaultmaster': 'https://vault.faa.zone/vaultmaster',
      'cube-lattice': 'https://vault.faa.zone/cube-lattice',
      'omni-chain': 'https://vault.faa.zone/omni-chain',
      'neural-mesh': 'https://vault.faa.zone/neural-mesh',
      'quantum-grid': 'https://vault.faa.zone/quantum-grid',
      'crystal-matrix': 'https://vault.faa.zone/crystal-matrix',
      'flux-core': 'https://vault.faa.zone/flux-core',
      'prime-nexus': 'https://vault.faa.zone/prime-nexus',
    },
    commands: {
      help: showHelp,
      status: showStatus,
      sectors: showSectors,
      clear: clearTerminal,
      code: startLiveCoding,
      vaultmesh: showVaultMesh,
      brands: showBrands,
      matrix: showMatrix,
      about: showAbout,
    },
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('🌳 BushPortal Activation Layer Initializing...');

    activateTerminal();
    activateSectorButtons();
    activateNavigation();
    activateDashboardButtons();
    activateSmoothScroll();
    showNotification('All Interactive Elements Activated!', 'success');

    console.log('✅ BushPortal Activation Complete');
  }

  // Terminal Activation
  function activateTerminal() {
    const terminalInput = document.querySelector('.terminal-input, #terminal-input, [data-terminal-input]');
    const terminalOutput = document.querySelector('.terminal-output, #terminal-output, [data-terminal-output]');

    if (!terminalInput) {
      console.log('Terminal input not found, creating virtual terminal');
      createVirtualTerminal();
      return;
    }

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = e.target.value.trim().toLowerCase();
        processCommand(command, terminalOutput);
        e.target.value = '';
      }
    });
  }

  function createVirtualTerminal() {
    // Create a floating terminal that can be activated
    const terminal = document.createElement('div');
    terminal.id = 'baobab-terminal-overlay';
    terminal.innerHTML = `
      <div class="terminal-container" style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 400px;
        max-height: 300px;
        background: #1a1a2e;
        border: 2px solid #f59e0b;
        border-radius: 12px;
        font-family: monospace;
        z-index: 10000;
        display: none;
        flex-direction: column;
        box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      ">
        <div style="
          padding: 12px;
          background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
          border-radius: 10px 10px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <span style="color: white; font-weight: bold;">🌳 Baobab Terminal</span>
          <button id="close-terminal" style="
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
          ">×</button>
        </div>
        <div id="terminal-output" style="
          padding: 12px;
          flex: 1;
          overflow-y: auto;
          color: #22c55e;
          max-height: 180px;
        ">
          <div>user@baobab:~$ <span style="color: #a3a3a3;">Type 'help' for commands</span></div>
        </div>
        <div style="padding: 12px; border-top: 1px solid #333;">
          <input id="terminal-input" type="text" placeholder="Enter command..." style="
            width: 100%;
            background: transparent;
            border: none;
            color: #22c55e;
            font-family: monospace;
            outline: none;
          ">
        </div>
      </div>
    `;
    document.body.appendChild(terminal);

    // Terminal toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'terminal-toggle';
    toggleBtn.innerHTML = '🌳';
    toggleBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
      border: none;
      font-size: 28px;
      cursor: pointer;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
      transition: transform 0.2s;
    `;
    toggleBtn.onmouseover = () => toggleBtn.style.transform = 'scale(1.1)';
    toggleBtn.onmouseout = () => toggleBtn.style.transform = 'scale(1)';
    document.body.appendChild(toggleBtn);

    // Event listeners
    const container = terminal.querySelector('.terminal-container');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    const closeBtn = document.getElementById('close-terminal');

    toggleBtn.onclick = () => {
      container.style.display = container.style.display === 'none' ? 'flex' : 'none';
      toggleBtn.style.display = container.style.display === 'flex' ? 'none' : 'block';
      if (container.style.display === 'flex') input.focus();
    };

    closeBtn.onclick = () => {
      container.style.display = 'none';
      toggleBtn.style.display = 'block';
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = e.target.value.trim();
        if (command) {
          output.innerHTML += `<div>user@baobab:~$ ${command}</div>`;
          processCommand(command.toLowerCase(), output);
          e.target.value = '';
          output.scrollTop = output.scrollHeight;
        }
      }
    });
  }

  function processCommand(command, output) {
    const args = command.split(' ');
    const cmd = args[0];
    const cmdArgs = args.slice(1).join(' ');

    if (cmd === 'code' && cmdArgs) {
      startLiveCoding(cmdArgs, output);
    } else if (CONFIG.commands[cmd]) {
      CONFIG.commands[cmd](output, cmdArgs);
    } else {
      appendOutput(output, `Command not found: ${cmd}. Type 'help' for available commands.`, '#ef4444');
    }
  }

  // Command implementations
  function showHelp(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">Available Commands:</span>
  help      - Show this help message
  status    - Show system status
  sectors   - List all sector terminals
  clear     - Clear terminal
  code      - Start Live AI Coding (e.g., code build a todo app)
  vaultmesh - Show VaultMesh connections
  brands    - Show active brands
  matrix    - Display connection matrix
  about     - About BushPortal
    `);
  }

  function showStatus(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">System Status:</span>
  VaultPulse:     <span style="color: #22c55e;">●●●●● ACTIVE</span>
  Sectors:        <span style="color: #22c55e;">8/8 Online</span>
  Live Coding:    <span style="color: #22c55e;">Ready</span>
  Tree Houses:    <span style="color: #22c55e;">42 Active</span>
  Signal:         <span style="color: #22c55e;">Maximum</span>
  Location:       From here to Timbuktu
    `);
  }

  function showSectors(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">Sector Terminals:</span>
  1. VaultMaster    - Primary vault control
  2. Cube Lattice   - Spatial data matrix
  3. Omni Chain     - Blockchain bridge
  4. Neural Mesh    - AI processing core
  5. Quantum Grid   - Quantum computing
  6. Crystal Matrix - Data visualization
  7. Flux Core      - Energy management
  8. Prime Nexus    - Central hub
    `);

    // Highlight sector buttons
    document.querySelectorAll('[data-sector], .sector-btn, .terminal-btn').forEach(btn => {
      btn.style.animation = 'pulse 1s ease-in-out 3';
    });
  }

  function startLiveCoding(prompt, output) {
    if (!prompt) {
      appendOutput(output, 'Usage: code <your prompt>', '#ef4444');
      appendOutput(output, 'Example: code build a React todo app');
      return;
    }

    appendOutput(output, `
<span style="color: #f59e0b;">🤖 LIVE AI CODING TERMINAL ACTIVATED</span>
<span style="color: #22c55e;">🚀 Initializing AI coding session...</span>
<span style="color: #a3a3a3;">Prompt: ${prompt}</span>
<span style="color: #3b82f6;">Redirecting to Live Coding Interface...</span>
    `);

    setTimeout(() => {
      window.location.href = `${CONFIG.baseUrl}${CONFIG.liveCodingPath}?prompt=${encodeURIComponent(prompt)}`;
    }, 1500);
  }

  function showVaultMesh(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">VaultMesh Connections:</span>
  ├─ vault.faa.zone     <span style="color: #22c55e;">●</span>
  ├─ portal.faa.zone    <span style="color: #22c55e;">●</span>
  ├─ fruitful.faa.zone  <span style="color: #22c55e;">●</span>
  ├─ bushportal.faa.zone <span style="color: #22c55e;">●</span>
  └─ codenest.faa.zone  <span style="color: #22c55e;">●</span>

  Total: 5 nodes | Latency: <12ms
    `);
  }

  function showBrands(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">Active Brands:</span>
  🌳 BushPortal™    - Podcast Network
  🦊 Foxed Has Mobiles - Mobile Solutions
  💼 Fruitful Holdings - Parent Company
  🔒 VaultMaster    - Security Network
  🧪 CodeNest       - Development Hub
  🎵 Seedwave       - Music Integration
    `);
  }

  function showMatrix(output) {
    appendOutput(output, `
<span style="color: #f59e0b;">Connection Matrix:</span>
  ╔════════════════════════════════╗
  ║  ▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░    ║
  ║  ░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓    ║
  ║  ▓▓░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░▓▓    ║
  ║  ▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░▓▓▓▓░░    ║
  ╚════════════════════════════════╝
  <span style="color: #22c55e;">All nodes synchronized</span>
    `);
  }

  function showAbout(output) {
    appendOutput(output, `
<span style="color: #f59e0b; font-weight: bold;">🌳 BushPortal™</span>
  Version:    vs111.111
  License:    Apache 2.0
  Author:     Heyns Schoeman
  Company:    Fruitful Holdings (Pty) Ltd
  Location:   Pretoria, South Africa 🇿🇦

  "Deep roots. Wide canopy. Eternal connection."
  From here to Timbuktu - forever transmitting.
    `);
  }

  function clearTerminal(output) {
    output.innerHTML = '<div>user@baobab:~$ <span style="color: #a3a3a3;">Terminal cleared</span></div>';
  }

  function appendOutput(output, text, color = '#22c55e') {
    const div = document.createElement('div');
    div.innerHTML = text;
    div.style.color = color;
    div.style.whiteSpace = 'pre-wrap';
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  // Sector Button Activation
  function activateSectorButtons() {
    const sectorSelectors = [
      '[data-sector]',
      '.sector-btn',
      '.terminal-btn',
      '[class*="sector"]',
      '[class*="terminal"]',
      'button[class*="vault"]',
    ];

    sectorSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(btn => {
        const sectorName = btn.dataset?.sector ||
                          btn.textContent?.toLowerCase().replace(/[^a-z]/g, '-') ||
                          'vaultmaster';

        btn.style.cursor = 'pointer';
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const url = CONFIG.sectors[sectorName] || CONFIG.sectors.vaultmaster;
          showNotification(`Opening ${sectorName}...`, 'info');
          setTimeout(() => window.open(url, '_blank'), 500);
        });

        // Add hover animation
        btn.addEventListener('mouseenter', () => {
          btn.style.transform = 'scale(1.05)';
          btn.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.6)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'scale(1)';
          btn.style.boxShadow = '';
        });
      });
    });
  }

  // Navigation Activation
  function activateNavigation() {
    const navLinks = {
      '/tree-houses': ['tree-houses', 'treehouses', 'tree houses'],
      '/live-podcasts': ['live', 'podcasts', 'listen'],
      '/live-coding': ['code', 'coding', 'ai coding'],
      '/discovery': ['discover', 'explore'],
      '/analytics': ['analytics', 'stats'],
      '/community': ['community', 'forum'],
      '/login': ['login', 'sign in', 'signin'],
      '/register': ['register', 'sign up', 'signup'],
    };

    document.querySelectorAll('a, button').forEach(el => {
      const text = el.textContent?.toLowerCase() || '';
      const href = el.getAttribute('href') || '';

      Object.entries(navLinks).forEach(([path, keywords]) => {
        if (keywords.some(k => text.includes(k) || href.includes(k))) {
          el.addEventListener('click', (e) => {
            if (!href.startsWith('http')) {
              e.preventDefault();
              window.location.href = CONFIG.baseUrl + path;
            }
          });
        }
      });
    });
  }

  // Dashboard Button Activation
  function activateDashboardButtons() {
    document.querySelectorAll('[class*="dashboard"], [class*="metric"], [class*="stat"]').forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        showNotification('Dashboard feature - Coming soon!', 'info');
      });
    });
  }

  // Smooth Scroll
  function activateSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Notification System
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      font-weight: 500;
      z-index: 10001;
      animation: slideIn 0.3s ease-out;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    notification.textContent = `🌳 ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
      50% { box-shadow: 0 0 20px 10px rgba(245, 158, 11, 0.2); }
    }
  `;
  document.head.appendChild(style);

  // Expose global API
  window.BaobabTerminal = {
    processCommand,
    showNotification,
    CONFIG,
  };

})();
