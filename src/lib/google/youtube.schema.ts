import { z } from "zod";

export const YoutubeSearchOrderSchema = z
  .enum([
    "date", // Sort by newest first
    "viewCount", // Sort by most views
    "rating", // Sort by highest rating
    "relevance", // Sort by relevance (default)
  ])
  .default("relevance");

export const YoutubeVideoDurationSchema = z
  .enum([
    "short", // Under 4 minutes
    "medium", // Between 4-20 minutes
    "long", // Over 20 minutes
    "any", // Any duration (default)
  ])
  .default("any");

export const YoutubeSearchParamsSchema = z.object({
  query: z.string().min(1).max(500),
  maxResults: z.number().min(1).max(50).default(10),
  pageToken: z.string().optional(),
  order: YoutubeSearchOrderSchema,
  publishedAfter: z.date().optional(),
  videoDuration: YoutubeVideoDurationSchema,
});

export const YoutubeVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  thumbnailUrl: z.string().url().nullable(),
  videoUrl: z.string().url(),
  publishedAt: z.string().datetime(),
  channelId: z.string(),
  channelTitle: z.string(),
  viewCount: z.number().optional(),
  duration: z.string().optional(),
});

export const YoutubeSearchResponseSchema = z.object({
  items: z.array(YoutubeVideoSchema),
  nextPageToken: z.string().nullable().optional(),
  prevPageToken: z.string().nullable().optional(),
  totalResults: z.number(),
});

export type YoutubeSearchParams = z.infer<typeof YoutubeSearchParamsSchema>;
export type YoutubeVideo = z.infer<typeof YoutubeVideoSchema>;
export type YoutubeSearchResponse = z.infer<typeof YoutubeSearchResponseSchema>;
