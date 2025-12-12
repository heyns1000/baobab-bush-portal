import {
  users,
  environmentalData,
  alerts,
  customAlerts,
  reports,
  dataSourceStatus,
  type User,
  type UpsertUser,
  type EnvironmentalData,
  type InsertEnvironmentalData,
  type Alert,
  type InsertAlert,
  type CustomAlert,
  type InsertCustomAlert,
  type Report,
  type InsertReport,
  type DataSourceStatus,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, inArray } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User>;

  // Environmental data operations
  getEnvironmentalData(params: {
    dataType?: string;
    region?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<EnvironmentalData[]>;
  createEnvironmentalData(data: InsertEnvironmentalData): Promise<EnvironmentalData>;
  getLatestEnvironmentalData(params: {
    dataTypes?: string[];
    region?: string;
  }): Promise<EnvironmentalData[]>;

  // Alert operations
  getUserAlerts(userId: string, unreadOnly?: boolean): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(alertId: number, userId: string): Promise<void>;

  // Custom alert operations
  getUserCustomAlerts(userId: string): Promise<CustomAlert[]>;
  createCustomAlert(alert: InsertCustomAlert): Promise<CustomAlert>;
  deleteCustomAlert(alertId: number, userId: string): Promise<void>;

  // Report operations
  getUserReports(userId: string): Promise<Report[]>;
  createReport(report: InsertReport): Promise<Report>;
  getReport(reportId: number, userId: string): Promise<Report | undefined>;
  updateReportStatus(reportId: number, status: string, filePath?: string, completedAt?: Date): Promise<void>;

  // Data source status operations
  getDataSourceStatuses(): Promise<DataSourceStatus[]>;
  getDataSourceStatus(name: string): Promise<DataSourceStatus | undefined>;
  updateDataSourceStatus(name: string, status: string, errorMessage?: string | null): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserPreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User> {
    const existingUser = await this.getUser(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const updatedPreferences = {
      theme: existingUser.preferences?.theme || 'light',
      notifications: existingUser.preferences?.notifications ?? true,
      autoRefresh: existingUser.preferences?.autoRefresh ?? true,
      region: existingUser.preferences?.region || 'global',
      ...preferences,
    } as const;

    const [user] = await db
      .update(users)
      .set({
        preferences: updatedPreferences,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return user;
  }

  // Environmental data operations
  async getEnvironmentalData(params: {
    dataType?: string;
    region?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<EnvironmentalData[]> {
    let query = db.select().from(environmentalData);

    const conditions = [];
    if (params.dataType) {
      conditions.push(eq(environmentalData.dataType, params.dataType));
    }
    if (params.region) {
      conditions.push(eq(environmentalData.region, params.region));
    }
    if (params.startDate) {
      conditions.push(gte(environmentalData.timestamp, params.startDate));
    }
    if (params.endDate) {
      conditions.push(lte(environmentalData.timestamp, params.endDate));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const orderedQuery = query.orderBy(desc(environmentalData.timestamp));

    if (params.limit) {
      return await orderedQuery.limit(params.limit);
    }

    return await orderedQuery;
  }

  async createEnvironmentalData(data: InsertEnvironmentalData): Promise<EnvironmentalData> {
    const [result] = await db
      .insert(environmentalData)
      .values(data)
      .returning();
    return result;
  }

  async getLatestEnvironmentalData(params: {
    dataTypes?: string[];
    region?: string;
  }): Promise<EnvironmentalData[]> {
    let query = db.select().from(environmentalData);

    const conditions = [];
    if (params.dataTypes && params.dataTypes.length > 0) {
      conditions.push(inArray(environmentalData.dataType, params.dataTypes));
    }
    if (params.region) {
      conditions.push(eq(environmentalData.region, params.region));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const orderedQuery = query.orderBy(desc(environmentalData.timestamp));
    return await orderedQuery.limit(100);
  }

  // Alert operations
  async getUserAlerts(userId: string, unreadOnly: boolean = false): Promise<Alert[]> {
    const baseQuery = db.select().from(alerts);

    if (unreadOnly) {
      const filteredQuery = baseQuery.where(and(eq(alerts.userId, userId), eq(alerts.isRead, false)));
      return await filteredQuery.orderBy(desc(alerts.createdAt));
    }

    const allQuery = baseQuery.where(eq(alerts.userId, userId));
    return await allQuery.orderBy(desc(alerts.createdAt));
  }

  async createAlert(alert: InsertAlert): Promise<Alert> {
    const [result] = await db
      .insert(alerts)
      .values(alert)
      .returning();
    return result;
  }

  async markAlertAsRead(alertId: number, userId: string): Promise<void> {
    await db
      .update(alerts)
      .set({ isRead: true })
      .where(and(eq(alerts.id, alertId), eq(alerts.userId, userId)));
  }

  // Custom alert operations
  async getUserCustomAlerts(userId: string): Promise<CustomAlert[]> {
    return await db
      .select()
      .from(customAlerts)
      .where(eq(customAlerts.userId, userId))
      .orderBy(desc(customAlerts.createdAt));
  }

  async createCustomAlert(alert: InsertCustomAlert): Promise<CustomAlert> {
    const [result] = await db
      .insert(customAlerts)
      .values({
        ...alert,
        threshold: alert.threshold.toString(), // Convert to string for decimal field
      })
      .returning();
    return result;
  }

  async deleteCustomAlert(alertId: number, userId: string): Promise<void> {
    await db
      .delete(customAlerts)
      .where(and(eq(customAlerts.id, alertId), eq(customAlerts.userId, userId)));
  }

  // Report operations
  async getUserReports(userId: string): Promise<Report[]> {
    return await db
      .select()
      .from(reports)
      .where(eq(reports.userId, userId))
      .orderBy(desc(reports.createdAt));
  }

  async createReport(report: InsertReport): Promise<Report> {
    const [result] = await db
      .insert(reports)
      .values(report)
      .returning();
    return result;
  }

  async getReport(reportId: number, userId: string): Promise<Report | undefined> {
    const [report] = await db
      .select()
      .from(reports)
      .where(and(eq(reports.id, reportId), eq(reports.userId, userId)));
    return report;
  }

  async updateReportStatus(reportId: number, status: string, filePath?: string, completedAt?: Date): Promise<void> {
    const updateData: any = { status };
    if (filePath) updateData.filePath = filePath;
    if (completedAt) updateData.completedAt = completedAt;

    await db
      .update(reports)
      .set(updateData)
      .where(eq(reports.id, reportId));
  }

  // Data source status operations
  async getDataSourceStatuses(): Promise<DataSourceStatus[]> {
    return await db
      .select()
      .from(dataSourceStatus)
      .orderBy(dataSourceStatus.name);
  }

  async getDataSourceStatus(name: string): Promise<DataSourceStatus | undefined> {
    const [status] = await db
      .select()
      .from(dataSourceStatus)
      .where(eq(dataSourceStatus.name, name));
    return status;
  }

  async updateDataSourceStatus(name: string, status: string, errorMessage?: string | null): Promise<void> {
    await db
      .insert(dataSourceStatus)
      .values({
        name,
        status,
        lastUpdated: new Date(),
        errorMessage,
      })
      .onConflictDoUpdate({
        target: dataSourceStatus.name,
        set: {
          status,
          lastUpdated: new Date(),
          errorMessage,
        },
      });
  }
}

export const storage = new DatabaseStorage();
