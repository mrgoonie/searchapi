import { z } from "zod";

export const YoutubeSearchParamsSchema = z.object({
  query: z.string().min(1).max(500),
  maxResults: z.number().min(1).max(50).default(10),
  pageToken: z.string().optional(),
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
