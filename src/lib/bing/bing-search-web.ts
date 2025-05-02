import axios from "axios";

import { env } from "@/env";

import type { BingWebSearchParams, BingWebSearchResponse } from "./bing.schema";
import { BingWebSearchParamsSchema } from "./bing.schema";

/**
 * Performs a Bing web search with the given parameters
 * @param params Search parameters
 * @returns Search results
 */
export async function bingWebSearch(params: BingWebSearchParams): Promise<BingWebSearchResponse> {
  // Validate input parameters
  const validatedParams = BingWebSearchParamsSchema.parse(params);

  try {
    // Prepare request URL and headers
    const endpoint = "https://api.bing.microsoft.com/v7.0/search";

    // Build query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("q", validatedParams.query);
    queryParams.append("count", validatedParams.count.toString());
    queryParams.append("offset", validatedParams.offset.toString());
    queryParams.append("mkt", validatedParams.market);
    queryParams.append("safeSearch", validatedParams.safeSearch);

    if (validatedParams.freshness !== "all") {
      queryParams.append("freshness", validatedParams.freshness);
    }

    if (validatedParams.responseFilter) {
      queryParams.append("responseFilter", validatedParams.responseFilter);
    }

    // Make the API request
    const response = await axios.get(`${endpoint}?${queryParams.toString()}`, {
      headers: {
        "Ocp-Apim-Subscription-Key": env.BING_API_KEY,
      },
    });

    // Process and transform the response
    if (!response.data.webPages?.value) {
      return {
        items: [],
        totalEstimatedMatches: 0,
      };
    }

    const items = response.data.webPages.value.map((item: any) => ({
      id: item.id || "",
      name: item.name || "",
      url: item.url || "",
      displayUrl: item.displayUrl || "",
      snippet: item.snippet || "",
      dateLastCrawled: item.dateLastCrawled || null,
      language: item.language || null,
      isFamilyFriendly: item.isFamilyFriendly || null,
      isNavigational: item.isNavigational || null,
    }));

    return {
      items,
      totalEstimatedMatches: response.data.webPages.totalEstimatedMatches || 0,
      nextOffset: response.data.webPages.nextOffset,
      queryContext: {
        originalQuery: response.data.queryContext?.originalQuery || validatedParams.query,
      },
    };
  } catch (error) {
    console.error("Error occurred during Bing Web Search:", error);
    throw error;
  }
}
