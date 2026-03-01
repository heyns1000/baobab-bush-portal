import { db } from "../db";
import {
  tradeBrands,
  tradeSubnodes,
  vendors,
  supportedCurrencies,
  currencyRates,
} from "@shared/schema";
import { currencyService } from "../services/currencyService";

// ============================================================================
// TRADE BRANDS DATA (from FAA.ZONE export)
// ============================================================================
const tradeBrandsData = [
  {
    id: "695acb8dbded3df96f395086",
    name: "MarketGrid",
    sector: "trade",
    description: "Market infrastructure for commodity trading and price discovery",
    tags: ["infrastructure", "commodities", "pricing"],
    metadata: {
      id: "MAR-TRA-6294",
      vault: "VAULT-HNVH",
      layer: "Layer Alpha v2.7",
      deploymentZone: "Zone E 4",
      securityRating: "FAA-SEC A",
      activeNodes: 4699,
    },
    isSystemBrand: true,
    subnodes: ["LinkValue", "MeshCommodity", "SyncSupply"],
  },
  {
    id: "695acb8dbded3df96f39508c",
    name: "GlobalTrade",
    sector: "trade",
    description: "International trade facilitation and cross-border commerce",
    tags: ["international", "cross-border", "commerce"],
    metadata: {
      id: "GLO-TRA-2560",
      vault: "VAULT-4O8Z",
      layer: "Layer Alpha v2.8",
      deploymentZone: "Zone E 4",
      securityRating: "FAA-SEC A+",
      activeNodes: 472,
    },
    isSystemBrand: true,
    subnodes: ["MarketFlow", "ExchangeTrace", "ValueNode"],
  },
  {
    id: "695acb8dbded3df96f395085",
    name: "TradeFlow",
    sector: "trade",
    description: "Trade logistics and supply chain management",
    tags: ["logistics", "supply-chain", "flow"],
    metadata: {
      id: "TRA-TRA-5785",
      vault: "VAULT-HIO3",
      layer: "Layer Alpha v3.0",
      deploymentZone: "Zone A 5",
      securityRating: "FAA-SEC A+",
      activeNodes: 3773,
    },
    isSystemBrand: true,
    subnodes: ["FlowTrade", "GridMarket", "NodeExchange"],
  },
  {
    id: "695acb8dbded3df96f39508b",
    name: "DemandTrace",
    sector: "trade",
    description: "Demand forecasting and market analytics",
    tags: ["analytics", "forecasting", "demand"],
    metadata: {
      id: "DEM-TRA-4486",
      vault: "VAULT-YSYD",
      layer: "Layer Beta v1.9",
      deploymentZone: "Zone E 7",
      securityRating: "FAA-SEC B+",
      activeNodes: 458,
    },
    isSystemBrand: true,
    subnodes: ["FairGrid", "AssetSync", "TradePulse"],
  },
  {
    id: "695acb8dbded3df96f395088",
    name: "ValueLink",
    sector: "trade",
    description: "Value chain integration and asset tracking",
    tags: ["value-chain", "assets", "tracking"],
    metadata: {
      id: "VAL-TRA-9468",
      vault: "VAULT-BJ9V",
      layer: "Layer Alpha v2.5",
      deploymentZone: "Zone B 8",
      securityRating: "FAA-SEC A+",
      activeNodes: 1784,
    },
    isSystemBrand: true,
    subnodes: ["FlowAsset", "TradeID", "MarketScan"],
  },
  {
    id: "695acb8dbded3df96f39508e",
    name: "AssetFlow",
    sector: "trade",
    description: "Asset management and portfolio tracking",
    tags: ["assets", "portfolio", "management"],
    metadata: {
      id: "ASS-TRA-6391",
      vault: "VAULT-VLWU",
      layer: "Layer Beta v2.8",
      deploymentZone: "Zone C 2",
      securityRating: "FAA-SEC A+",
      activeNodes: 524,
    },
    isSystemBrand: true,
    subnodes: ["GlobalSync", "FairTrace", "AssetNode"],
  },
  {
    id: "695acb8dbded3df96f395089",
    name: "CommodityMesh",
    sector: "trade",
    description: "Commodity exchange and trading network",
    tags: ["commodities", "exchange", "network"],
    metadata: {
      id: "COM-TRA-8124",
      vault: "VAULT-6WJ7",
      layer: "Layer Alpha v1.4",
      deploymentZone: "Zone D 4",
      securityRating: "FAA-SEC A+",
      activeNodes: 4884,
    },
    isSystemBrand: true,
    subnodes: ["ExchangeMesh", "NodeValue", "CommodityFlow"],
  },
  {
    id: "695acb8dbded3df96f39508a",
    name: "SupplySync",
    sector: "trade",
    description: "Supply chain synchronization and optimization",
    tags: ["supply", "sync", "optimization"],
    metadata: {
      id: "SUP-TRA-3470",
      vault: "VAULT-1N6R",
      layer: "Layer Alpha v1.1",
      deploymentZone: "Zone B 1",
      securityRating: "FAA-SEC B+",
      activeNodes: 4314,
    },
    isSystemBrand: true,
    subnodes: ["SupplyTrace", "DemandLink", "GlobalNode"],
  },
  {
    id: "695acb8dbded3df96f395087",
    name: "ExchangeNode",
    sector: "trade",
    description: "Multi-currency exchange and settlement",
    tags: ["exchange", "currency", "settlement"],
    metadata: {
      id: "EXC-TRA-7503",
      vault: "VAULT-69CF",
      layer: "Layer Beta v3.0",
      deploymentZone: "Zone E 4",
      securityRating: "FAA-SEC B+",
      activeNodes: 3959,
    },
    isSystemBrand: true,
    subnodes: ["TraceDemand", "TradeGlobal", "ExchangeFair"],
  },
  {
    id: "695acb8dbded3df96f39508d",
    name: "FairExchange",
    sector: "trade",
    description: "Fair trade certification and ethical commerce",
    tags: ["fair-trade", "ethical", "certification"],
    metadata: {
      id: "FAI-TRA-2595",
      vault: "VAULT-F2R8",
      layer: "Layer Alpha v2.6",
      deploymentZone: "Zone E 9",
      securityRating: "FAA-SEC A",
      activeNodes: 4136,
    },
    isSystemBrand: true,
    subnodes: ["CommodityLink", "SupplyMesh", "DemandFlow"],
  },
];

// ============================================================================
// SUPPORTED CURRENCIES
// ============================================================================
const supportedCurrenciesData = [
  { code: "USD", name: "US Dollar", symbol: "$", isActive: true },
  { code: "ZAR", name: "South African Rand", symbol: "R", isActive: true },
  { code: "EUR", name: "Euro", symbol: "€", isActive: true },
  { code: "GBP", name: "British Pound", symbol: "£", isActive: true },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", isActive: true },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", isActive: true },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", isActive: true },
  { code: "BWP", name: "Botswana Pula", symbol: "P", isActive: true },
  { code: "MZN", name: "Mozambican Metical", symbol: "MT", isActive: true },
  { code: "NAD", name: "Namibian Dollar", symbol: "N$", isActive: true },
];

// ============================================================================
// HATHAVEN VENDOR
// ============================================================================
const hathavenVendor = {
  name: "Fruitful Artisan Hat Co",
  slug: "hathaven",
  description: "Premium handcrafted artisan hats with African-inspired designs. Each piece celebrates traditional craftsmanship with contemporary style.",
  brandId: "695acb8dbded3df96f395085", // TradeFlow
  category: "fashion",
  location: {
    country: "South Africa",
    city: "Cape Town",
    region: "Western Cape",
  },
  contactInfo: {
    email: "hello@fruitfulhats.com",
    website: "https://fruitfulhats.com",
  },
  status: "active" as const,
  tier: "pro" as const,
  logoUrl: "/HatHaven/attached_assets/HAT_1_Fruitful_Atrisan_hat_co_1772285590373.png",
  externalProductsTable: "hathaven_products",
};

// ============================================================================
// SEED FUNCTION
// ============================================================================
export async function seedTradeData() {
  console.log("🌱 Seeding trade data...");

  try {
    // 1. Seed supported currencies
    console.log("   Seeding supported currencies...");
    for (const currency of supportedCurrenciesData) {
      await db
        .insert(supportedCurrencies)
        .values(currency)
        .onConflictDoUpdate({
          target: supportedCurrencies.code,
          set: { name: currency.name, symbol: currency.symbol, isActive: currency.isActive },
        });
    }
    console.log(`   ✓ ${supportedCurrenciesData.length} currencies seeded`);

    // 2. Seed trade brands
    console.log("   Seeding trade brands...");
    for (const brandData of tradeBrandsData) {
      const { subnodes, ...brand } = brandData;
      await db
        .insert(tradeBrands)
        .values(brand)
        .onConflictDoUpdate({
          target: tradeBrands.id,
          set: {
            name: brand.name,
            sector: brand.sector,
            description: brand.description,
            tags: brand.tags,
            metadata: brand.metadata,
            isSystemBrand: brand.isSystemBrand,
            updatedAt: new Date(),
          },
        });
    }
    console.log(`   ✓ ${tradeBrandsData.length} brands seeded`);

    // 3. Seed subnodes
    console.log("   Seeding trade subnodes...");
    let subnodeCount = 0;
    for (const brandData of tradeBrandsData) {
      for (const subnodeName of brandData.subnodes) {
        await db
          .insert(tradeSubnodes)
          .values({
            brandId: brandData.id,
            name: subnodeName,
            status: "active",
            metadata: {},
          })
          .onConflictDoNothing();
        subnodeCount++;
      }
    }
    console.log(`   ✓ ${subnodeCount} subnodes seeded`);

    // 4. Seed HatHaven vendor
    console.log("   Seeding HatHaven vendor...");
    await db
      .insert(vendors)
      .values(hathavenVendor)
      .onConflictDoUpdate({
        target: vendors.slug,
        set: {
          name: hathavenVendor.name,
          description: hathavenVendor.description,
          brandId: hathavenVendor.brandId,
          category: hathavenVendor.category,
          location: hathavenVendor.location,
          contactInfo: hathavenVendor.contactInfo,
          status: hathavenVendor.status,
          tier: hathavenVendor.tier,
          logoUrl: hathavenVendor.logoUrl,
          externalProductsTable: hathavenVendor.externalProductsTable,
          updatedAt: new Date(),
        },
      });
    console.log("   ✓ HatHaven vendor seeded");

    // 5. Fetch initial exchange rates
    console.log("   Fetching initial exchange rates...");
    try {
      await currencyService.refreshRates();
      console.log("   ✓ Exchange rates fetched");
    } catch (error) {
      console.log("   ⚠ Could not fetch exchange rates (will retry later)");
    }

    console.log("✅ Trade data seeding complete!");
    console.log(`   - ${supportedCurrenciesData.length} currencies`);
    console.log(`   - ${tradeBrandsData.length} brands`);
    console.log(`   - ${subnodeCount} subnodes`);
    console.log(`   - 1 vendor (HatHaven)`);

  } catch (error) {
    console.error("❌ Error seeding trade data:", error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  seedTradeData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
