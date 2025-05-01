import { z } from "zod";

export const BingSearchMarketSchema = z
  .enum([
    "en-US", // United States (English)
    "en-GB", // United Kingdom (English)
    "en-CA", // Canada (English)
    "en-AU", // Australia (English)
    "fr-FR", // France (French)
    "de-DE", // Germany (German)
    "it-IT", // Italy (Italian)
    "es-ES", // Spain (Spanish)
    "pt-BR", // Brazil (Portuguese)
    "zh-CN", // China (Chinese)
    "ja-JP", // Japan (Japanese)
    "ko-KR", // Korea (Korean)
    "ru-RU", // Russia (Russian)
  ])
  .default("en-US");

export const BingSearchSafeSearchSchema = z
  .enum([
    "off", // Don't filter adult content
    "moderate", // Filter adult images but not text
    "strict", // Filter all adult content
  ])
  .default("moderate");

export const BingSearchFreshnessSchema = z
  .enum([
    "day", // Content discovered in the past 24 hours
    "week", // Content discovered in the past week
    "month", // Content discovered in the past month
    "year", // Content discovered in the past year
    "all", // No freshness filter (default)
  ])
  .default("all");

export const BingWebSearchParamsSchema = z.object({
  query: z.string().min(1).max(500),
  count: z.number().min(1).max(50).default(10),
  offset: z.number().min(0).default(0),
  market: BingSearchMarketSchema,
  safeSearch: BingSearchSafeSearchSchema,
  freshness: BingSearchFreshnessSchema,
  responseFilter: z.string().optional(), // Filter to specific fields
});

export const BingWebSearchResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  displayUrl: z.string(),
  snippet: z.string(),
  dateLastCrawled: z.string().datetime().optional(),
  language: z.string().optional(),
  isFamilyFriendly: z.boolean().optional(),
  isNavigational: z.boolean().optional(),
});

export const BingWebSearchResponseSchema = z.object({
  items: z.array(BingWebSearchResultSchema),
  totalEstimatedMatches: z.number(),
  nextOffset: z.number().optional(),
  queryContext: z
    .object({
      originalQuery: z.string(),
    })
    .optional(),
});

export type BingWebSearchParams = z.infer<typeof BingWebSearchParamsSchema>;
export type BingWebSearchResult = z.infer<typeof BingWebSearchResultSchema>;
export type BingWebSearchResponse = z.infer<typeof BingWebSearchResponseSchema>;
