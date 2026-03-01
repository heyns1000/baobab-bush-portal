import { db } from "../db";
import { currencyRates, supportedCurrencies } from "@shared/schema";
import { eq, and } from "drizzle-orm";

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  conversion_rates: Record<string, number>;
  time_last_update_utc: string;
}

interface ConversionResult {
  amount: number;
  from: string;
  to: string;
  rate: number;
  convertedAmount: number;
}

interface PriceMap {
  [currency: string]: {
    amount: number;
    symbol: string;
    formatted: string;
  };
}

class CurrencyService {
  private apiKey = process.env.EXCHANGE_RATE_API_KEY || "4252ad4e92b373e8d32108c4";
  private baseUrl = "https://v6.exchangerate-api.com/v6";
  private baseCurrency = "USD";

  /**
   * Fetch latest exchange rates from ExchangeRateAPI
   */
  async fetchRates(): Promise<ExchangeRateResponse> {
    const url = `${this.baseUrl}/${this.apiKey}/latest/${this.baseCurrency}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`ExchangeRateAPI error: ${response.status}`);
    }

    const data = await response.json() as ExchangeRateResponse;

    if (data.result !== "success") {
      throw new Error("Failed to fetch exchange rates");
    }

    return data;
  }

  /**
   * Refresh and cache all exchange rates
   */
  async refreshRates(): Promise<void> {
    try {
      const ratesData = await this.fetchRates();
      const currencies = await db.select().from(supportedCurrencies).where(eq(supportedCurrencies.isActive, true));

      const supportedCodes = new Set(currencies.map(c => c.code));

      for (const [currency, rate] of Object.entries(ratesData.conversion_rates)) {
        if (supportedCodes.has(currency)) {
          // Upsert the rate
          await db
            .insert(currencyRates)
            .values({
              baseCurrency: this.baseCurrency,
              targetCurrency: currency,
              rate: rate.toString(),
              source: "exchangerateapi",
              fetchedAt: new Date(),
            })
            .onConflictDoUpdate({
              target: [currencyRates.baseCurrency, currencyRates.targetCurrency],
              set: {
                rate: rate.toString(),
                fetchedAt: new Date(),
              },
            });
        }
      }

      console.log(`Currency rates refreshed: ${Object.keys(ratesData.conversion_rates).length} rates updated`);
    } catch (error) {
      console.error("Error refreshing currency rates:", error);
      throw error;
    }
  }

  /**
   * Get all cached exchange rates
   */
  async getCachedRates(): Promise<typeof currencyRates.$inferSelect[]> {
    return await db.select().from(currencyRates);
  }

  /**
   * Get exchange rate for a specific currency pair
   */
  async getRate(from: string, to: string): Promise<number> {
    // If same currency, rate is 1
    if (from === to) return 1;

    // If from USD, get direct rate
    if (from === "USD") {
      const rate = await db
        .select()
        .from(currencyRates)
        .where(
          and(
            eq(currencyRates.baseCurrency, "USD"),
            eq(currencyRates.targetCurrency, to)
          )
        )
        .limit(1);

      if (rate.length === 0) {
        throw new Error(`Exchange rate not found: USD to ${to}`);
      }

      return parseFloat(rate[0].rate);
    }

    // If to USD, get inverse of direct rate
    if (to === "USD") {
      const rate = await db
        .select()
        .from(currencyRates)
        .where(
          and(
            eq(currencyRates.baseCurrency, "USD"),
            eq(currencyRates.targetCurrency, from)
          )
        )
        .limit(1);

      if (rate.length === 0) {
        throw new Error(`Exchange rate not found: ${from} to USD`);
      }

      return 1 / parseFloat(rate[0].rate);
    }

    // For other pairs, convert via USD
    const fromToUsd = await this.getRate(from, "USD");
    const usdToTarget = await this.getRate("USD", to);

    return fromToUsd * usdToTarget;
  }

  /**
   * Convert amount between currencies
   */
  async convert(amount: number, from: string, to: string): Promise<ConversionResult> {
    const rate = await this.getRate(from, to);
    const convertedAmount = amount * rate;

    return {
      amount,
      from,
      to,
      rate,
      convertedAmount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimal places
    };
  }

  /**
   * Get price in multiple currencies
   */
  async getPriceInCurrencies(priceUsd: number, currencies: string[]): Promise<PriceMap> {
    const result: PriceMap = {};

    const supportedCurrenciesList = await db.select().from(supportedCurrencies);
    const symbolMap: Record<string, string> = {};

    for (const curr of supportedCurrenciesList) {
      symbolMap[curr.code] = curr.symbol;
    }

    for (const currency of currencies) {
      const conversion = await this.convert(priceUsd, "USD", currency);
      const symbol = symbolMap[currency] || currency;

      result[currency] = {
        amount: conversion.convertedAmount,
        symbol,
        formatted: `${symbol}${conversion.convertedAmount.toFixed(2)}`,
      };
    }

    return result;
  }

  /**
   * Get all supported currencies
   */
  async getSupportedCurrencies(): Promise<typeof supportedCurrencies.$inferSelect[]> {
    return await db
      .select()
      .from(supportedCurrencies)
      .where(eq(supportedCurrencies.isActive, true));
  }
}

export const currencyService = new CurrencyService();
