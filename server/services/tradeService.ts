import { db } from "../db";
import {
  tradeBrands,
  tradeSubnodes,
  vendors,
  vendorItems,
  type TradeBrand,
  type InsertTradeBrand,
  type TradeSubnode,
  type InsertTradeSubnode,
  type Vendor,
  type InsertVendor,
  type VendorItem,
  type InsertVendorItem,
  type BrandWithSubnodes,
  type VendorWithItems,
  type ItemWithLocalPrice,
} from "@shared/schema";
import { eq, and, desc, like, ilike } from "drizzle-orm";
import { currencyService } from "./currencyService";

class TradeService {
  // ============================================================================
  // BRAND OPERATIONS
  // ============================================================================

  async getAllBrands(): Promise<TradeBrand[]> {
    return await db.select().from(tradeBrands).orderBy(tradeBrands.name);
  }

  async getBrandById(id: string): Promise<TradeBrand | null> {
    const results = await db
      .select()
      .from(tradeBrands)
      .where(eq(tradeBrands.id, id))
      .limit(1);

    return results[0] || null;
  }

  async getBrandWithSubnodes(id: string): Promise<BrandWithSubnodes | null> {
    const brand = await this.getBrandById(id);

    if (!brand) return null;

    const subnodes = await db
      .select()
      .from(tradeSubnodes)
      .where(eq(tradeSubnodes.brandId, id));

    return {
      ...brand,
      subnodes,
    };
  }

  async getAllBrandsWithSubnodes(): Promise<BrandWithSubnodes[]> {
    const brands = await this.getAllBrands();
    const allSubnodes = await db.select().from(tradeSubnodes);

    const subnodesByBrand: Record<string, TradeSubnode[]> = {};
    for (const subnode of allSubnodes) {
      if (!subnodesByBrand[subnode.brandId]) {
        subnodesByBrand[subnode.brandId] = [];
      }
      subnodesByBrand[subnode.brandId].push(subnode);
    }

    return brands.map(brand => ({
      ...brand,
      subnodes: subnodesByBrand[brand.id] || [],
    }));
  }

  async createBrand(data: InsertTradeBrand): Promise<TradeBrand> {
    const result = await db.insert(tradeBrands).values(data).returning();
    return result[0];
  }

  // ============================================================================
  // SUBNODE OPERATIONS
  // ============================================================================

  async getAllSubnodes(): Promise<TradeSubnode[]> {
    return await db.select().from(tradeSubnodes).orderBy(tradeSubnodes.name);
  }

  async getSubnodesByBrand(brandId: string): Promise<TradeSubnode[]> {
    return await db
      .select()
      .from(tradeSubnodes)
      .where(eq(tradeSubnodes.brandId, brandId))
      .orderBy(tradeSubnodes.name);
  }

  async createSubnode(data: InsertTradeSubnode): Promise<TradeSubnode> {
    const result = await db.insert(tradeSubnodes).values(data).returning();
    return result[0];
  }

  // ============================================================================
  // VENDOR OPERATIONS
  // ============================================================================

  async getAllVendors(filters?: {
    category?: string;
    brandId?: string;
    status?: string;
  }): Promise<Vendor[]> {
    let query = db.select().from(vendors);

    const conditions = [];

    if (filters?.category) {
      conditions.push(eq(vendors.category, filters.category));
    }
    if (filters?.brandId) {
      conditions.push(eq(vendors.brandId, filters.brandId));
    }
    if (filters?.status) {
      conditions.push(eq(vendors.status, filters.status as "active" | "pending" | "suspended"));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    return await query.orderBy(vendors.name);
  }

  async getVendorById(id: number): Promise<Vendor | null> {
    const results = await db
      .select()
      .from(vendors)
      .where(eq(vendors.id, id))
      .limit(1);

    return results[0] || null;
  }

  async getVendorBySlug(slug: string): Promise<Vendor | null> {
    const results = await db
      .select()
      .from(vendors)
      .where(eq(vendors.slug, slug))
      .limit(1);

    return results[0] || null;
  }

  async getVendorWithItems(id: number): Promise<VendorWithItems | null> {
    const vendor = await this.getVendorById(id);

    if (!vendor) return null;

    const items = await db
      .select()
      .from(vendorItems)
      .where(eq(vendorItems.vendorId, id));

    let brand: TradeBrand | undefined;
    if (vendor.brandId) {
      brand = (await this.getBrandById(vendor.brandId)) || undefined;
    }

    return {
      ...vendor,
      items,
      brand,
    };
  }

  async createVendor(data: InsertVendor): Promise<Vendor> {
    const result = await db.insert(vendors).values(data).returning();
    return result[0];
  }

  async updateVendor(id: number, data: Partial<InsertVendor>): Promise<Vendor | null> {
    const result = await db
      .update(vendors)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(vendors.id, id))
      .returning();

    return result[0] || null;
  }

  async deleteVendor(id: number): Promise<void> {
    await db.delete(vendors).where(eq(vendors.id, id));
  }

  // ============================================================================
  // VENDOR ITEM OPERATIONS
  // ============================================================================

  async getItemsByVendor(vendorId: number): Promise<VendorItem[]> {
    return await db
      .select()
      .from(vendorItems)
      .where(and(
        eq(vendorItems.vendorId, vendorId),
        eq(vendorItems.isActive, true)
      ))
      .orderBy(vendorItems.name);
  }

  async getItemById(id: number): Promise<VendorItem | null> {
    const results = await db
      .select()
      .from(vendorItems)
      .where(eq(vendorItems.id, id))
      .limit(1);

    return results[0] || null;
  }

  async getItemWithLocalPrice(itemId: number, currency: string): Promise<ItemWithLocalPrice | null> {
    const item = await this.getItemById(itemId);

    if (!item) return null;

    const priceUsd = parseFloat(item.priceUsd);
    const conversion = await currencyService.convert(priceUsd, "USD", currency);

    return {
      ...item,
      localPrice: conversion.convertedAmount,
      localCurrency: currency,
      exchangeRate: conversion.rate,
    };
  }

  async getItemsByVendorWithLocalPricing(
    vendorId: number,
    currency: string
  ): Promise<ItemWithLocalPrice[]> {
    const items = await this.getItemsByVendor(vendorId);
    const results: ItemWithLocalPrice[] = [];

    for (const item of items) {
      const priceUsd = parseFloat(item.priceUsd);
      const conversion = await currencyService.convert(priceUsd, "USD", currency);

      results.push({
        ...item,
        localPrice: conversion.convertedAmount,
        localCurrency: currency,
        exchangeRate: conversion.rate,
      });
    }

    return results;
  }

  async createItem(data: InsertVendorItem): Promise<VendorItem> {
    const result = await db.insert(vendorItems).values(data).returning();
    return result[0];
  }

  async updateItem(id: number, data: Partial<InsertVendorItem>): Promise<VendorItem | null> {
    const result = await db
      .update(vendorItems)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(vendorItems.id, id))
      .returning();

    return result[0] || null;
  }

  async deleteItem(id: number): Promise<void> {
    // Soft delete - set isActive to false
    await db
      .update(vendorItems)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(vendorItems.id, id));
  }

  // ============================================================================
  // SEARCH OPERATIONS
  // ============================================================================

  async searchVendors(query: string): Promise<Vendor[]> {
    return await db
      .select()
      .from(vendors)
      .where(ilike(vendors.name, `%${query}%`))
      .orderBy(vendors.name);
  }

  async searchItems(query: string): Promise<VendorItem[]> {
    return await db
      .select()
      .from(vendorItems)
      .where(and(
        ilike(vendorItems.name, `%${query}%`),
        eq(vendorItems.isActive, true)
      ))
      .orderBy(vendorItems.name);
  }
}

export const tradeService = new TradeService();
