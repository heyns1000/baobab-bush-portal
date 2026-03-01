import { pgTable, varchar, text, serial, integer, decimal, boolean, jsonb, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// ============================================================================
// TRADE BRANDS - 10 system brands (MarketGrid, GlobalTrade, etc.)
// ============================================================================
export const tradeBrands = pgTable("trade_brands", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  sector: varchar("sector", { length: 50 }).notNull(),
  description: text("description"),
  tags: jsonb("tags").default([]),
  metadata: jsonb("metadata").default({}), // vault, layer, deploymentZone, securityRating, activeNodes
  isSystemBrand: boolean("is_system_brand").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// TRADE SUBNODES - 30 subnodes (LinkValue, MeshCommodity, etc.)
// ============================================================================
export const tradeSubnodes = pgTable("trade_subnodes", {
  id: serial("id").primaryKey(),
  brandId: varchar("brand_id", { length: 50 }).references(() => tradeBrands.id).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  status: varchar("status", { enum: ["active", "inactive", "maintenance"] }).default("active"),
  metadata: jsonb("metadata").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// ============================================================================
// VENDORS - Local artisan businesses (HatHaven, Lekker Locals, etc.)
// ============================================================================
export const vendors = pgTable("vendors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  brandId: varchar("brand_id", { length: 50 }).references(() => tradeBrands.id),
  subnodeId: integer("subnode_id").references(() => tradeSubnodes.id),
  category: varchar("category", { length: 100 }), // fashion, crafts, food, etc.
  location: jsonb("location").default({}), // { country, city, coordinates }
  contactInfo: jsonb("contact_info").default({}), // { email, phone, website }
  status: varchar("status", { enum: ["active", "pending", "suspended"] }).default("pending"),
  tier: varchar("tier", { enum: ["starter", "pro", "enterprise"] }).default("starter"),
  logoUrl: text("logo_url"),
  externalProductsTable: varchar("external_products_table", { length: 100 }), // e.g., "hathaven_products"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// VENDOR ITEMS - Products with USD pricing (for vendors without their own table)
// ============================================================================
export const vendorItems = pgTable("vendor_items", {
  id: serial("id").primaryKey(),
  vendorId: integer("vendor_id").references(() => vendors.id).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  itemCode: varchar("item_code", { length: 50 }).unique(),
  category: varchar("category", { length: 100 }),
  priceUsd: decimal("price_usd", { precision: 12, scale: 2 }).notNull(), // Base price in USD
  artisanCostUsd: decimal("artisan_cost_usd", { precision: 12, scale: 2 }),
  shippingCostUsd: decimal("shipping_cost_usd", { precision: 12, scale: 2 }),
  stock: integer("stock").default(0),
  imageUrl: text("image_url"),
  metadata: jsonb("metadata").default({}), // material, dimensions, weight, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================================================
// CURRENCY RATES - Cached exchange rates from ExchangeRateAPI
// ============================================================================
export const currencyRates = pgTable("currency_rates", {
  id: serial("id").primaryKey(),
  baseCurrency: varchar("base_currency", { length: 3 }).notNull().default("USD"),
  targetCurrency: varchar("target_currency", { length: 3 }).notNull(),
  rate: decimal("rate", { precision: 18, scale: 8 }).notNull(),
  source: varchar("source", { length: 50 }).default("exchangerateapi"),
  fetchedAt: timestamp("fetched_at").defaultNow(),
}, (table) => ({
  currencyPairIdx: uniqueIndex("currency_pair_idx").on(table.baseCurrency, table.targetCurrency),
}));

// ============================================================================
// SUPPORTED CURRENCIES - List of currencies we support
// ============================================================================
export const supportedCurrencies = pgTable("supported_currencies", {
  code: varchar("code", { length: 3 }).primaryKey(), // USD, ZAR, EUR, GBP, etc.
  name: varchar("name", { length: 100 }).notNull(),
  symbol: varchar("symbol", { length: 10 }).notNull(),
  isActive: boolean("is_active").default(true),
});

// ============================================================================
// RELATIONS
// ============================================================================
export const tradeBrandsRelations = relations(tradeBrands, ({ many }) => ({
  subnodes: many(tradeSubnodes),
  vendors: many(vendors),
}));

export const tradeSubnodesRelations = relations(tradeSubnodes, ({ one, many }) => ({
  brand: one(tradeBrands, {
    fields: [tradeSubnodes.brandId],
    references: [tradeBrands.id],
  }),
  vendors: many(vendors),
}));

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  brand: one(tradeBrands, {
    fields: [vendors.brandId],
    references: [tradeBrands.id],
  }),
  subnode: one(tradeSubnodes, {
    fields: [vendors.subnodeId],
    references: [tradeSubnodes.id],
  }),
  items: many(vendorItems),
}));

export const vendorItemsRelations = relations(vendorItems, ({ one }) => ({
  vendor: one(vendors, {
    fields: [vendorItems.vendorId],
    references: [vendors.id],
  }),
}));

// ============================================================================
// INSERT SCHEMAS (Zod validation)
// ============================================================================
export const insertTradeBrandSchema = createInsertSchema(tradeBrands).pick({
  id: true,
  name: true,
  sector: true,
  description: true,
  tags: true,
  metadata: true,
  isSystemBrand: true,
});

export const insertTradeSubnodeSchema = createInsertSchema(tradeSubnodes).pick({
  brandId: true,
  name: true,
  status: true,
  metadata: true,
});

export const insertVendorSchema = createInsertSchema(vendors).pick({
  name: true,
  slug: true,
  description: true,
  brandId: true,
  subnodeId: true,
  category: true,
  location: true,
  contactInfo: true,
  status: true,
  tier: true,
  logoUrl: true,
  externalProductsTable: true,
});

export const insertVendorItemSchema = createInsertSchema(vendorItems).pick({
  vendorId: true,
  name: true,
  description: true,
  itemCode: true,
  category: true,
  priceUsd: true,
  artisanCostUsd: true,
  shippingCostUsd: true,
  stock: true,
  imageUrl: true,
  metadata: true,
  isActive: true,
});

// ============================================================================
// TYPES
// ============================================================================
export type TradeBrand = typeof tradeBrands.$inferSelect;
export type InsertTradeBrand = typeof tradeBrands.$inferInsert;
export type TradeSubnode = typeof tradeSubnodes.$inferSelect;
export type InsertTradeSubnode = typeof tradeSubnodes.$inferInsert;
export type Vendor = typeof vendors.$inferSelect;
export type InsertVendor = typeof vendors.$inferInsert;
export type VendorItem = typeof vendorItems.$inferSelect;
export type InsertVendorItem = typeof vendorItems.$inferInsert;
export type CurrencyRate = typeof currencyRates.$inferSelect;
export type SupportedCurrency = typeof supportedCurrencies.$inferSelect;

// Extended types
export type BrandWithSubnodes = TradeBrand & {
  subnodes: TradeSubnode[];
};

export type VendorWithItems = Vendor & {
  items: VendorItem[];
  brand?: TradeBrand;
};

export type ItemWithLocalPrice = VendorItem & {
  localPrice: number;
  localCurrency: string;
  exchangeRate: number;
};
