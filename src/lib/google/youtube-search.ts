import { youtube_v3 } from "@googleapis/youtube";

import { env } from "@/env";

import type { YoutubeSearchParams, YoutubeSearchResponse } from "./youtube.schema";
import { YoutubeSearchParamsSchema } from "./youtube.schema";

export async function youtubeSearch(params: YoutubeSearchParams): Promise<YoutubeSearchResponse> {
  // Validate input parameters
  const validatedParams = YoutubeSearchParamsSchema.parse(params);

  const youtube = new youtube_v3.Youtube({
    auth: env.GOOGLE_API_KEY,
  });

  try {
    const videoDuration =
      validatedParams.videoDuration === "any" ? undefined : validatedParams.videoDuration;
    const response = await youtube.search.list({
      part: ["snippet", "id"],
      q: validatedParams.query,
      maxResults: validatedParams.maxResults,
      pageToken: validatedParams.pageToken,
      type: ["video"],
      videoEmbeddable: "true",
      videoSyndicated: "true",
      order: validatedParams.order,
      publishedAfter: validatedParams.publishedAfter?.toISOString(),
      videoDuration: videoDuration,
    });

    if (!response.data.items) {
      return {
        items: [],
        totalResults: 0,
      };
    }

    const items = response.data.items.map((item) => ({
      id: item.id?.videoId || "",
      title: item.snippet?.title || "",
      description: item.snippet?.description || null,
      thumbnailUrl: item.snippet?.thumbnails?.high?.url || null,
      videoUrl: `https://www.youtube.com/watch?v=${item.id?.videoId}`,
      publishedAt: item.snippet?.publishedAt || new Date().toISOString(),
      channelId: item.snippet?.channelId || "",
      channelTitle: item.snippet?.channelTitle || "",
    }));

    return {
      items,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
      totalResults: response.data.pageInfo?.totalResults || 0,
    };
  } catch (error) {
    console.error("Error occurred during YouTube Search:", error);
    throw error;
  }
}
