import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { dataService } from "./services/dataService";
import { streamCodeGeneration, getSession, getAllSessions } from "./services/liveCodingService";
import { sendWelcomeEmail, createLicense } from "./services/emailService";
import {
  insertEnvironmentalDataSchema,
  insertAlertSchema,
  insertCustomAlertSchema,
  insertReportSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user preferences
  app.patch('/api/user/preferences', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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

  // Environmental data endpoints
  app.get('/api/environmental-data', isAuthenticated, async (req: any, res) => {
    try {
      const { dataType, region, startDate, endDate, limit = 100 } = req.query;
      
      const data = await storage.getEnvironmentalData({
        dataType: dataType as string,
        region: region as string,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
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
      const userId = req.user.claims.sub;
      await dataService.syncAllData(userId);
      res.json({ message: "Data synchronization started" });
    } catch (error) {
      console.error("Error syncing data:", error);
      res.status(500).json({ message: "Failed to sync data" });
    }
  });

  // Alerts endpoints
  app.get('/api/alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
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
      const userId = req.user.claims.sub;
      const alertId = parseInt(req.params.id);
      
      await storage.markAlertAsRead(alertId, userId);
      res.json({ message: "Alert marked as read" });
    } catch (error) {
      console.error("Error marking alert as read:", error);
      res.status(500).json({ message: "Failed to mark alert as read" });
    }
  });

  // Custom alerts endpoints
  app.get('/api/custom-alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const customAlerts = await storage.getUserCustomAlerts(userId);
      res.json(customAlerts);
    } catch (error) {
      console.error("Error fetching custom alerts:", error);
      res.status(500).json({ message: "Failed to fetch custom alerts" });
    }
  });

  app.post('/api/custom-alerts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const alertData = insertCustomAlertSchema.parse({...req.body, userId});
      
      const customAlert = await storage.createCustomAlert(alertData);
      res.json(customAlert);
    } catch (error) {
      console.error("Error creating custom alert:", error);
      res.status(500).json({ message: "Failed to create custom alert" });
    }
  });

  app.delete('/api/custom-alerts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const alertId = parseInt(req.params.id);
      
      await storage.deleteCustomAlert(alertId, userId);
      res.json({ message: "Custom alert deleted" });
    } catch (error) {
      console.error("Error deleting custom alert:", error);
      res.status(500).json({ message: "Failed to delete custom alert" });
    }
  });

  // Reports endpoints
  app.get('/api/reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reports = await storage.getUserReports(userId);
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ message: "Failed to fetch reports" });
    }
  });

  app.post('/api/reports', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const reportData = insertReportSchema.parse({...req.body, userId});
      
      const report = await storage.createReport(reportData);
      
      // Start report generation in background
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
      const userId = req.user.claims.sub;
      const reportId = parseInt(req.params.id);
      
      const report = await storage.getReport(reportId, userId);
      if (!report || !report.filePath) {
        return res.status(404).json({ message: "Report not found or not ready" });
      }
      
      // In a real implementation, this would serve the file from storage
      res.json({ downloadUrl: `/downloads/${report.filePath}` });
    } catch (error) {
      console.error("Error downloading report:", error);
      res.status(500).json({ message: "Failed to download report" });
    }
  });

  // Data source status
  app.get('/api/data-sources/status', async (req, res) => {
    try {
      const statuses = await storage.getDataSourceStatuses();
      res.json(statuses);
    } catch (error) {
      console.error("Error fetching data source statuses:", error);
      res.status(500).json({ message: "Failed to fetch data source statuses" });
    }
  });

  // Real-time data endpoint (for polling)
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

  // Get all coding sessions
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

  // Get specific session
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

  // Start coding session (non-streaming, for REST API)
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

  // Register with license
  app.post('/api/auth/register-with-license', async (req, res) => {
    try {
      const { email, name, tier = 'free' } = req.body;

      if (!email || !name) {
        return res.status(400).json({ message: "Email and name are required" });
      }

      const userId = `user-${Date.now()}`;
      const license = createLicense(userId, email, tier as 'free' | 'pro' | 'enterprise');

      // Send welcome email with license
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

  // System status
  app.get('/api/system-status', async (req, res) => {
    res.json({
      status: 'active',
      vaultPulse: 'MAXIMUM',
      nodes: 42,
      signal: 'continental',
      version: 'vs111.111',
      liveCoding: 'ready',
      email: process.env.SMTP_HOST ? 'configured' : 'not_configured',
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
