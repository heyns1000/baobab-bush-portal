import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import { streamCodeGeneration, getSession, getAllSessions } from './services/liveCodingService';

interface Client {
  ws: WebSocket;
  sessionId?: string;
}

const clients = new Map<WebSocket, Client>();

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: '/ws/live-coding' });

  wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    clients.set(ws, { ws });

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        await handleMessage(ws, message);
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });

    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connected',
      message: 'Connected to BushPortal Live Coding',
      timestamp: new Date().toISOString(),
    }));
  });

  return wss;
}

async function handleMessage(ws: WebSocket, message: any) {
  const client = clients.get(ws);
  if (!client) return;

  switch (message.type) {
    case 'start_coding':
      await handleStartCoding(ws, client, message);
      break;

    case 'get_session':
      handleGetSession(ws, message.sessionId);
      break;

    case 'list_sessions':
      handleListSessions(ws);
      break;

    case 'subscribe':
      client.sessionId = message.sessionId;
      break;

    case 'ping':
      ws.send(JSON.stringify({ type: 'pong', timestamp: Date.now() }));
      break;

    default:
      ws.send(JSON.stringify({ type: 'error', message: `Unknown message type: ${message.type}` }));
  }
}

async function handleStartCoding(ws: WebSocket, client: Client, message: any) {
  const { prompt } = message;
  if (!prompt) {
    ws.send(JSON.stringify({ type: 'error', message: 'Prompt is required' }));
    return;
  }

  const sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  client.sessionId = sessionId;

  ws.send(JSON.stringify({
    type: 'session_started',
    sessionId,
    prompt,
    timestamp: new Date().toISOString(),
  }));

  // Broadcast to all subscribed clients
  broadcastToSession(sessionId, {
    type: 'coding_started',
    sessionId,
    prompt,
  });

  try {
    for await (const event of streamCodeGeneration(sessionId, prompt)) {
      const payload = {
        type: `stream_${event.type}`,
        sessionId,
        ...event,
        timestamp: new Date().toISOString(),
      };

      // Send to requesting client
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(payload));
      }

      // Broadcast to subscribers
      broadcastToSession(sessionId, payload, ws);
    }
  } catch (error) {
    ws.send(JSON.stringify({
      type: 'error',
      sessionId,
      message: error instanceof Error ? error.message : 'Coding session failed',
    }));
  }
}

function handleGetSession(ws: WebSocket, sessionId: string) {
  const session = getSession(sessionId);
  if (session) {
    ws.send(JSON.stringify({ type: 'session_data', session }));
  } else {
    ws.send(JSON.stringify({ type: 'error', message: 'Session not found' }));
  }
}

function handleListSessions(ws: WebSocket) {
  const sessions = getAllSessions().map(s => ({
    id: s.id,
    prompt: s.prompt,
    status: s.status,
    fileCount: s.files.length,
    startedAt: s.startedAt,
    completedAt: s.completedAt,
  }));
  ws.send(JSON.stringify({ type: 'sessions_list', sessions }));
}

function broadcastToSession(sessionId: string, message: any, exclude?: WebSocket) {
  clients.forEach((client, ws) => {
    if (client.sessionId === sessionId && ws !== exclude && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}

export function broadcastToAll(message: any) {
  clients.forEach((_, ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  });
}
