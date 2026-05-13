import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { dataService } from "./services/dataService";
import { streamCodeGeneration, getSession, getAllSessions } from "./services/liveCodingService";
import { sendWelcomeEmail, createLicense } from "./services/emailService";
import { ObjectStorageService } from "./objectStorage";
import {
  insertEnvironmentalDataSchema,
  insertAlertSchema,
  insertCustomAlertSchema,
  insertReportSchema,
  insertEpisodeSchema,
  insertTreatyLogSchema,
} from "@shared/schema";
import { z } from "zod";

function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  const objectStorageService = new ObjectStorageService();

  // ==========================================
  // Auth Routes
  // ==========================================

  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    res.json(req.user);
  });

  app.patch('/api/user/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const preferencesSchema = z.object({
        theme: z.enum(['light', 'dark']).optional(),
        notifications: z.boolean().optional(),
        autoRefresh: z.boolean().optional(),
        region: z.string().optional(),
      });
      const preferences = preferencesSchema.parse(req.body);
      const user = await storage.updateUserPreferences(userId, preferences);
      res.json(user);
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  // ==========================================
  // Object Storage Routes
  // ==========================================

  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/objects/upload", async (req, res) => {
    try {
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Failed to get upload URL" });
    }
  });

  // ==========================================
  // Episode Routes
  // ==========================================

  app.get("/api/episodes", async (req, res) => {
    try {
      const episodes = await storage.getEpisodes();
      res.json(episodes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  app.get("/api/episodes/:id", async (req, res) => {
    try {
      const episode = await storage.getEpisode(req.params.id);
      if (!episode) {
        return res.status(404).json({ error: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch episode" });
    }
  });

  app.post("/api/episodes", async (req, res) => {
    try {
      const validatedData = insertEpisodeSchema.parse(req.body);

      if (validatedData.objectPath) {
        validatedData.objectPath = objectStorageService.normalizeObjectEntityPath(validatedData.objectPath);
      }

      const episode = await storage.createEpisode(validatedData);

      await storage.createTreatyLog({
        event: "DROP",
        description: `Episode "${episode.title}" uploaded successfully | Size: ${(episode.fileSize / 1024 / 1024).toFixed(1)}MB | Status: ${episode.status}`,
        vaultPulse: "●●●●○",
        episodeId: episode.id,
      });

      res.status(201).json(episode);
    } catch (error) {
      console.error("Error creating episode:", error);
      res.status(400).json({ error: "Invalid episode data" });
    }
  });

  app.put("/api/episodes/:id", async (req, res) => {
    try {
      const validatedData = insertEpisodeSchema.partial().parse(req.body);
      const episode = await storage.updateEpisode(req.params.id, validatedData);

      if (!episode) {
        return res.status(404).json({ error: "Episode not found" });
      }

      await storage.createTreatyLog({
        event: "SYNC",
        description: `Episode "${episode.title}" updated | Status: ${episode.status}`,
        vaultPulse: "●●●○○",
        episodeId: episode.id,
      });

      res.json(episode);
    } catch (error) {
      res.status(400).json({ error: "Invalid episode data" });
    }
  });

  app.delete("/api/episodes/:id", async (req, res) => {
    try {
      const episode = await storage.getEpisode(req.params.id);
      const deleted = await storage.deleteEpisode(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "Episode not found" });
      }

      await storage.createTreatyLog({
        event: "LOCK",
        description: `Episode "${episode?.title || 'Unknown'}" archived and locked`,
        vaultPulse: "●●○○○",
        episodeId: req.params.id,
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete episode" });
    }
  });

  // ==========================================
  // Episode Stats Routes
  // ==========================================

  app.get("/api/episodes/:id/stats", async (req, res) => {
    try {
      const stats = await storage.getEpisodeStats(req.params.id);
      if (!stats) {
        return res.status(404).json({ error: "Stats not found" });
      }
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/episode-stats", async (req, res) => {
    try {
      const stats = await storage.getAllEpisodeStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch episode stats" });
    }
  });

  app.put("/api/episodes/:id/stats", async (req, res) => {
    try {
      const stats = await storage.updateEpisodeStats(req.params.id, req.body);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to update stats" });
    }
  });

  // ==========================================
  // Treaty Log Routes
  // ==========================================

  app.get("/api/treaty-logs", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const logs = await storage.getTreatyLogs(limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch treaty logs" });
    }
  });

  app.post("/api/treaty-logs", async (req, res) => {
    try {
      const log = await storage.createTreatyLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ error: "Invalid log data" });
    }
  });

  app.delete("/api/treaty-logs", async (req, res) => {
    try {
      await storage.clearTreatyLogs();
      await storage.createTreatyLog({
        event: "LOCK",
        description: "Treaty memory cleared by administrator | All previous entries archived",
        vaultPulse: "●●●●●",
        episodeId: null as string | null,
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to clear logs" });
    }
  });

  // ==========================================
  // System Status Routes
  // ==========================================

  app.get('/api/system-status', async (req, res) => {
    try {
      const status = await storage.getSystemStatus();
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch system status" });
    }
  });

  app.put('/api/system-status', async (req, res) => {
    try {
      const status = await storage.updateSystemStatus(req.body);
      res.json(status);
    } catch (error) {
      res.status(500).json({ error: "Failed to update system status" });
    }
  });

  // ==========================================
  // Command Execution Route
  // ==========================================

  app.post("/api/commands", async (req, res) => {
    try {
      const { command } = req.body;
      const args = command.split(" ");
      const cmd = args[0];

      let response = "";
      let vaultPulse = "●●●○○";

      switch (cmd) {
        case "push_episode":
          response = `Episode pushed successfully. Signal: ${(Math.random() * 200 + 800).toFixed(1)}kHz`;
          vaultPulse = "●●●●○";
          break;
        case "sync_stream":
          response = `Stream synchronized across ${Math.floor(Math.random() * 10 + 8)} channels`;
          vaultPulse = "●●●○○";
          break;
        case "lock_feed":
          response = "Feed locked to prevent unauthorized access | Security level: HIGH";
          vaultPulse = "●●●●●";
          break;
        case "status": {
          const systemStatus = await storage.getSystemStatus();
          response = `System: ${systemStatus.sovereignStatus} | Episodes: ${(await storage.getEpisodes()).length} | Listeners: ${systemStatus.listeners}`;
          vaultPulse = "●●●●○";
          break;
        }
        case "help":
          response = "Available commands: push_episode, sync_stream, lock_feed, status, help";
          vaultPulse = "●●○○○";
          break;
        default:
          response = `Unknown command: ${cmd}. Type 'help' for available commands.`;
          vaultPulse = "●○○○○";
      }

      await storage.createTreatyLog({
        event: "SYNC",
        description: `Command executed: ${command} | ${response}`,
        vaultPulse,
        episodeId: null as string | null,
      });

      res.json({ response, vaultPulse });
    } catch (error) {
      res.status(400).json({ error: "Invalid command" });
    }
  });

  // ==========================================
  // Environmental Data Routes
  // ==========================================

  app.get('/api/environmental-data', isAuthenticated, async (req: any, res) => {
    try {
      const { dataType, region, startDate, endDate, limit = 100 } = req.query;
      const data = await storage.getEnvironmentalData({
        dataType: dataType as string,
        region: region as string,
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        limit: parseInt(limit as string),
      });
      res.json(data);
    } catch (error) {
      console.error("Error fetching environmental data:", error);
      res.status(500).json({ message: "Failed to fetch environmental data" });
    }
  });

  app.post('/api/environmental-data/sync', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      await dataService.syncAllData(userId);
      res.json({ message: "Data synchronization started" });
    } catch (error) {
      console.error("Error syncing data:", error);
      res.status(500).json({ message: "Failed to sync data" });
    }
  });

  // ==========================================
  // Alert Routes
  // ==========================================

  app.get('/api/alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const { unreadOnly = false } = req.query;
      const alerts = await storage.getUserAlerts(userId, unreadOnly === 'true');
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
      res.status(500).json({ message: "Failed to fetch alerts" });
    }
  });

  app.patch('/api/alerts/:id/read', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const alertId = parseInt(req.params.id);
      await storage.markAlertAsRead(alertId, userId);
      res.json({ message: "Alert marked as read" });
    } catch (error) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  // ==========================================
  // Custom Alert Routes
  // ==========================================

  app.get('/api/custom-alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const customAlerts = await storage.getUserCustomAlerts(userId);
      res.json(customAlerts);
    } catch (error) {
      console.error("Error fetching custom alerts:", error);
      res.status(500).json({ message: "Failed to fetch custom alerts" });
    }
  });

  app.post('/api/custom-alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const alertData = insertCustomAlertSchema.parse({ ...req.body, userId });
      const customAlert = await storage.createCustomAlert(alertData);
      res.json(customAlert);
    } catch (error) {
      console.error("Error creating custom alert:", error);
      res.status(500).json({ message: "Failed to create custom alert" });
    }
  });

  app.delete('/api/custom-alerts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const alertId = parseInt(req.params.id);
      await storage.deleteCustomAlert(alertId, userId);
      res.json({ message: "Custom alert deleted" });
    } catch (error) {
      console.error("Error deleting custom alert:", error);
      res.status(500).json({ message: "Failed to delete custom alert" });
    }
  });

  // ==========================================
  // Report Routes
  // ==========================================

  app.get('/api/reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const reports = await storage.getUserReports(userId);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.post('/api/reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const reportData = insertReportSchema.parse({ ...req.body, userId });
      const report = await storage.createReport(reportData);
      dataService.generateReport(report.id, reportData).catch(error => {
        console.error("Error generating report:", error);
      });
      res.json(report);
    } catch (error) {
      console.error("Error creating report:", error);
      res.status(500).json({ message: "Failed to create report" });
    }
  });

  app.get('/api/reports/:id/download', isAuthenticated, async (req: any, res) => {
    try {
      const userId = (req.user as any).id;
      const reportId = parseInt(req.params.id);
      const report = await storage.getReport(reportId, userId);
      if (!report || !report.filePath) {
        return res.status(404).json({ message: "Report not found or not ready" });
      }
      res.json({ downloadUrl: `/downloads/${report.filePath}` });
    } catch (error) {
      console.error("Error downloading report:", error);
      res.status(500).json({ message: "Failed to download report" });
    }
  });

  // ==========================================
  // Data Source Status
  // ==========================================

  app.get('/api/data-sources/status', async (req, res) => {
    try {
      const statuses = await storage.getDataSourceStatuses();
      res.json(statuses);
    } catch (error) {
      console.error("Error fetching data source statuses:", error);
      res.status(500).json({ message: "Failed to fetch data source statuses" });
    }
  });

  app.get('/api/real-time/latest', isAuthenticated, async (req: any, res) => {
    try {
      const { dataTypes, region } = req.query;
      const types = dataTypes ? (dataTypes as string).split(',') : undefined;
      const data = await storage.getLatestEnvironmentalData({
        dataTypes: types,
        region: region as string,
      });
      res.json(data);
    } catch (error) {
      console.error("Error fetching latest data:", error);
      res.status(500).json({ message: "Failed to fetch latest data" });
    }
  });

  // ==========================================
  // Live AI Coding Routes
  // ==========================================

  app.get('/api/live-coding/sessions', async (req, res) => {
    try {
      const sessions = getAllSessions().map(s => ({
        id: s.id,
        prompt: s.prompt,
        status: s.status,
        fileCount: s.files.length,
        startedAt: s.startedAt,
        completedAt: s.completedAt,
      }));
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Failed to fetch sessions" });
    }
  });

  app.get('/api/live-coding/sessions/:id', async (req, res) => {
    try {
      const session = getSession(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Error fetching session:", error);
      res.status(500).json({ message: "Failed to fetch session" });
    }
  });

  app.post('/api/live-coding/generate', async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }
      const sessionId = `api-${Date.now()}`;
      const files: any[] = [];
      for await (const event of streamCodeGeneration(sessionId, prompt)) {
        if (event.type === 'file') {
          files.push(JSON.parse(event.content));
        }
      }
      res.json({ sessionId, files, fileCount: files.length });
    } catch (error) {
      console.error("Error generating code:", error);
      res.status(500).json({ message: "Failed to generate code" });
    }
  });

  // ==========================================
  // License and Email Routes
  // ==========================================

  app.post('/api/auth/register-with-license', async (req, res) => {
    try {
      const { email, name, tier = 'free' } = req.body;
      if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
      }
      const userId = `user-${Date.now()}`;
      const license = createLicense(userId, email, tier as 'free' | 'pro' | 'enterprise');
      const emailResult = await sendWelcomeEmail(email, name, license);
      res.json({
        success: true,
        userId,
        license: {
          key: license.key,
          tier: license.tier,
          features: license.features,
          expiresAt: license.expiresAt,
        },
        emailSent: emailResult.success,
      });
    } catch (error) {
      console.error("Error registering with license:", error);
      res.status(500).json({ message: "Failed to register" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
