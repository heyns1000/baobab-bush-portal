import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export type InsertEpisode = z.infer<typeof insertEpisodeSchema>;
export type InsertTreatyLogSchema = z.infer<typeof insertTreatyLogSchema>;
export type Episode = typeof episodes.$inferSelect;
export type EpisodeStats = typeof episodeStats.$inferSelect;
export type TreatyLog = typeof treatyLogs.$inferSelect;
export type SystemStatus = typeof systemStatus.$inferSelect;
