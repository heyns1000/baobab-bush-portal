import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  preferences: jsonb("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Environmental data table
export const environmentalData = pgTable("environmental_data", {
  id: serial("id").primaryKey(),
  dataType: varchar("data_type").notNull(),
  region: varchar("region").notNull(),
  value: decimal("value", { precision: 12, scale: 4 }).notNull(),
  unit: varchar("unit"),
  timestamp: timestamp("timestamp").defaultNow(),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// Alerts table
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  severity: varchar("severity", { enum: ["info", "warning", "critical"] }).default("info"),
  isRead: boolean("is_read").default(false),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// Custom alerts table
export const customAlerts = pgTable("custom_alerts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  dataType: varchar("data_type").notNull(),
  condition: varchar("condition").notNull(),
  threshold: decimal("threshold", { precision: 12, scale: 4 }).notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Reports table
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  type: varchar("type").notNull(),
  parameters: jsonb("parameters").default({}),
  status: varchar("status", { enum: ["pending", "completed", "failed"] }).default("pending"),
  filePath: text("file_path"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Data source status table
export const dataSourceStatus = pgTable("data_source_status", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull().unique(),
  status: varchar("status", { enum: ["online", "offline", "degraded"] }).default("online"),
  lastSync: timestamp("last_sync"),
  recordCount: integer("record_count").default(0),
  errorMessage: text("error_message"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const episodes = pgTable("episodes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  duration: integer("duration"), // in seconds
  status: varchar("status", { enum: ["live", "archived", "draft"] }).default("draft"),
  objectPath: text("object_path"), // path to file in object storage
  frequency: decimal("frequency", { precision: 6, scale: 1 }), // kHz
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const episodeStats = pgTable("episode_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  episodeId: varchar("episode_id").references(() => episodes.id).notNull(),
  plays: integer("plays").default(0),
  downloads: integer("downloads").default(0),
  signalStrength: decimal("signal_strength", { precision: 5, scale: 2 }).default("0"), // percentage
  lastPlayed: timestamp("last_played"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const treatyLogs = pgTable("treaty_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  event: varchar("event", { enum: ["DROP", "SYNC", "LOCK", "UPLOAD"] }).notNull(),
  description: text("description").notNull(),
  vaultPulse: varchar("vault_pulse").notNull(), // ●●●○○ format
  episodeId: varchar("episode_id").references(() => episodes.id),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const systemStatus = pgTable("system_status", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sovereignStatus: varchar("sovereign_status").default("ACTIVE"),
  feedDrift: decimal("feed_drift", { precision: 4, scale: 1 }).default("0.0"), // percentage
  lastDrop: timestamp("last_drop"),
  vaultPulse: varchar("vault_pulse").default("●●●○○"),
  activePlays: integer("active_plays").default(0),
  downloadsPerHour: integer("downloads_per_hour").default(0),
  signalStrength: decimal("signal_strength", { precision: 5, scale: 2 }).default("94.7"),
  listeners: integer("listeners").default(0),
  uptime: text("uptime").default("0d 0h 0m"),
  connections: integer("connections").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const episodesRelations = relations(episodes, ({ many }) => ({
  stats: many(episodeStats),
  treatyLogs: many(treatyLogs),
}));

export const episodeStatsRelations = relations(episodeStats, ({ one }) => ({
  episode: one(episodes, {
    fields: [episodeStats.episodeId],
    references: [episodes.id],
  }),
}));

export const treatyLogsRelations = relations(treatyLogs, ({ one }) => ({
  episode: one(episodes, {
    fields: [treatyLogs.episodeId],
    references: [episodes.id],
  }),
}));

export const insertEpisodeSchema = createInsertSchema(episodes).pick({
  title: true,
  description: true,
  fileName: true,
  fileSize: true,
  duration: true,
  status: true,
  objectPath: true,
});

export const insertTreatyLogSchema = createInsertSchema(treatyLogs).pick({
  event: true,
  description: true,
  vaultPulse: true,
  episodeId: true,
});

// Insert schemas for new tables
export const insertEnvironmentalDataSchema = createInsertSchema(environmentalData).pick({
  dataType: true,
  region: true,
  value: true,
  unit: true,
  metadata: true,
});

export const insertAlertSchema = createInsertSchema(alerts).pick({
  userId: true,
  type: true,
  title: true,
  message: true,
  severity: true,
  metadata: true,
});

export const insertCustomAlertSchema = createInsertSchema(customAlerts).pick({
  userId: true,
  name: true,
  dataType: true,
  condition: true,
  threshold: true,
  isActive: true,
});

export const insertReportSchema = createInsertSchema(reports).pick({
  userId: true,
  title: true,
  type: true,
  parameters: true,
});

export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type InsertTreatyLogSchema = z.infer<typeof insertTreatyLogSchema>;
export type Episode = typeof episodes.$inferSelect;
export type EpisodeStats = typeof episodeStats.$inferSelect;
export type TreatyLog = typeof treatyLogs.$inferSelect;
export type SystemStatus = typeof systemStatus.$inferSelect;

// New table types
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type EnvironmentalData = typeof environmentalData.$inferSelect;
export type InsertEnvironmentalData = typeof environmentalData.$inferInsert;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;
export type CustomAlert = typeof customAlerts.$inferSelect;
export type InsertCustomAlert = typeof customAlerts.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
export type DataSourceStatus = typeof dataSourceStatus.$inferSelect;
