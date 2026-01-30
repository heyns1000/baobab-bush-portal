import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { liveCodingService } from "./services/liveCodingService";

interface Client {
  ws: WebSocket;
  sessionId: string | null;
}

const clients = new Map<WebSocket, Client>();
const sessions = new Map<string, Set<WebSocket>>();

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws: WebSocket) => {
    clients.set(ws, { ws, sessionId: null });
    console.log("[WebSocket] Client connected");

    ws.on("message", async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        await handleMessage(ws, message);
      } catch (error) {
        sendError(ws, "Invalid message format");
      }
    });

    ws.on("close", () => {
      const client = clients.get(ws);
      if (client?.sessionId) {
        const sessionClients = sessions.get(client.sessionId);
        sessionClients?.delete(ws);
        if (sessionClients?.size === 0) {
          sessions.delete(client.sessionId);
        }
      }
      clients.delete(ws);
      console.log("[WebSocket] Client disconnected");
    });

    ws.on("error", (error) => {
      console.error("[WebSocket] Error:", error);
    });

    // Send welcome message
    send(ws, { type: "connected", data: { timestamp: Date.now() } });
  });

  console.log("[WebSocket] Server initialized on /ws");
  return wss;
}

async function handleMessage(ws: WebSocket, message: any) {
  const { type, payload } = message;

  switch (type) {
    case "join_session":
      joinSession(ws, payload.sessionId);
      break;

    case "leave_session":
      leaveSession(ws);
      break;

    case "start_coding":
      await startCodingSession(ws, payload);
      break;

    case "ping":
      send(ws, { type: "pong", data: { timestamp: Date.now() } });
      break;

    default:
      sendError(ws, `Unknown message type: ${type}`);
  }
}

function joinSession(ws: WebSocket, sessionId: string) {
  const client = clients.get(ws);
  if (!client) return;

  // Leave current session if any
  if (client.sessionId) {
    leaveSession(ws);
  }

  // Join new session
  client.sessionId = sessionId;
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, new Set());
  }
  sessions.get(sessionId)!.add(ws);

  send(ws, {
    type: "session_joined",
    data: { sessionId, viewers: sessions.get(sessionId)!.size },
  });

  // Notify other viewers
  broadcastToSession(sessionId, {
    type: "viewer_joined",
    data: { viewers: sessions.get(sessionId)!.size },
  }, ws);
}

function leaveSession(ws: WebSocket) {
  const client = clients.get(ws);
  if (!client?.sessionId) return;

  const sessionId = client.sessionId;
  const sessionClients = sessions.get(sessionId);

  if (sessionClients) {
    sessionClients.delete(ws);
    broadcastToSession(sessionId, {
      type: "viewer_left",
      data: { viewers: sessionClients.size },
    });

    if (sessionClients.size === 0) {
      sessions.delete(sessionId);
    }
  }

  client.sessionId = null;
  send(ws, { type: "session_left", data: { sessionId } });
}

async function startCodingSession(ws: WebSocket, payload: { prompt: string; sessionId: string }) {
  const { prompt, sessionId } = payload;

  if (!liveCodingService.isConfigured()) {
    sendError(ws, "AI coding service not configured");
    return;
  }

  // Join this session
  joinSession(ws, sessionId);

  try {
    // Broadcast session start
    broadcastToSession(sessionId, {
      type: "coding_started",
      data: { sessionId, prompt, timestamp: Date.now() },
    });

    // Stream code generation
    for await (const event of liveCodingService.generateCodeStream(prompt, sessionId)) {
      broadcastToSession(sessionId, {
        type: `coding_${event.type}`,
        data: event.data,
      });
    }

    broadcastToSession(sessionId, {
      type: "coding_finished",
      data: { sessionId, timestamp: Date.now() },
    });
  } catch (error) {
    broadcastToSession(sessionId, {
      type: "coding_error",
      data: { error: (error as Error).message },
    });
  }
}

function broadcastToSession(sessionId: string, message: any, exclude?: WebSocket) {
  const sessionClients = sessions.get(sessionId);
  if (!sessionClients) return;

  for (const client of sessionClients) {
    if (client !== exclude && client.readyState === WebSocket.OPEN) {
      send(client, message);
    }
  }
}

function send(ws: WebSocket, message: any) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  }
}

function sendError(ws: WebSocket, error: string) {
  send(ws, { type: "error", data: { message: error } });
}

export function getSessionViewers(sessionId: string): number {
  return sessions.get(sessionId)?.size || 0;
}

export function broadcastToAll(message: any) {
  for (const [ws] of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      send(ws, message);
    }
  }
}
