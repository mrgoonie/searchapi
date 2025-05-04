import { customsearch } from "@googleapis/customsearch";
import dayjs from "dayjs";

import { env } from "@/env";

/**
 * Process a single Google search query
 * @private
 */
async function processSingleGoogleSearch(
  query: string,
  options?: {
    limit?: number;
    offset?: number;
    sort?: string;
    from_date?: string;
    to_date?: string;
  }
) {
  const apiKey = env.GOOGLE_API_KEY;
  const cx = env.GOOGLE_SEARCH_ENGINE_ID;

  const search = customsearch({ version: "v1", auth: env.GOOGLE_API_KEY });

  const { limit, offset, sort, from_date, to_date } = options || {};

  const startDate = from_date ? dayjs(from_date).format("YYYYMMDD") : null;
  const endDate = to_date ? dayjs(to_date).format("YYYYMMDD") : null;
  const sortStr = startDate && endDate ? `date:r:${startDate}:${endDate}` : sort || "date:d";

  try {
    const res = await search.cse.list({
      auth: apiKey,
      cx: cx,
      q: query.trim(),
      sort: sortStr,
      num: limit || 10,
      start: offset || 0,
    });

    const results =
      res.data.items?.map((item) => {
        const metatags = item.pagemap?.metatags || [];
        const firstMetatag = metatags[0];
        const meta = firstMetatag
          ? {
              "og:site_name": firstMetatag["og:site_name"],
              "og:title": firstMetatag["og:title"],
              "og:description": firstMetatag["og:description"],
              "og:url": firstMetatag["og:url"],
              "og:image": firstMetatag["og:image"],
              "og:image:width": firstMetatag["og:image:width"],
              "og:image:height": firstMetatag["og:image:height"],
            }
          : {};
        const image = item.pagemap?.cse_image;

        delete item.htmlTitle;
        delete item.htmlFormattedUrl;
        delete item.htmlSnippet;
        delete item.formattedUrl;
        delete item.displayLink;
        delete item.pagemap;

        return { ...item, image, meta };
      }) || [];

    return results;
  } catch (error) {
    console.error(`Error occurred during Google Search for query "${query}": `, error);
    throw error;
  }
}

/**
 * Perform Google search with support for comma-separated queries
 * @param query - Search query (can contain commas to search for multiple queries in parallel)
 */
export async function googleSearch(
  query: string,
  options?: {
    /**
     * @default 10
     */
    limit?: number;
    /**
     * @default 0
     */
    offset?: number;
    /**
     * @default "date:d"
     */
    sort?: string;
    /**
     * @default null
     */
    from_date?: string;
    /**
     * @default null
     */
    to_date?: string;
  }
) {
  // Check if query contains commas
  if (query.includes(",")) {
    // Split query by commas and trim whitespace
    const queries = query
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    try {
      // Process all queries in parallel
      const resultsArray = await Promise.all(
        queries.map((singleQuery) => processSingleGoogleSearch(singleQuery, options))
      );

      // Combine all results into a single array
      return resultsArray.flat();
    } catch (error) {
      console.error("Error occurred during parallel Google Search: ", error);
      throw error;
    }
  } else {
    // Process single query
    return processSingleGoogleSearch(query, options);
  }
}

export async function googleSearchImages(
  query: string,
  options?: {
    limit?: number;
    offset?: number;
    sort?: string;
    from_date?: string;
    to_date?: string;
  }
) {
  const apiKey = env.GOOGLE_API_KEY; // Thay YOUR_API_KEY bằng khóa API của bạn
  const cx = env.GOOGLE_SEARCH_ENGINE_ID; // Thay YOUR_SEARCH_ENGINE_ID bằng ID của công cụ tìm kiếm thiết lập bởi bạn

  const search = customsearch({ version: "v1", auth: env.GOOGLE_API_KEY });

  const { limit, offset, sort, from_date, to_date } = options || {};

  const startDate = from_date ? dayjs(from_date).format("YYYYMMDD") : null;
  const endDate = to_date ? dayjs(to_date).format("YYYYMMDD") : null;
  const sortStr = startDate && startDate ? `date:r:${startDate}:${endDate}` : sort || "date:d";

  try {
    const results = await search.cse.list({
      auth: apiKey,
      cx: cx,
      q: query,
      searchType: "image",
      num: limit || 10,
      start: offset || 0,
      sort: sortStr,
    });

    return results.data.items;
  } catch (error) {
    console.error("Error occurred during Google Search: ", error);
    throw error;
  }
}
