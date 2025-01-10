import { customsearch } from "@googleapis/customsearch";

import { env } from "@/env";

export async function googleSearch(query: string) {
  const apiKey = env.GOOGLE_API_KEY; // Thay YOUR_API_KEY bằng khóa API của bạn
  const cx = env.GOOGLE_SEARCH_ENGINE_ID; // Thay YOUR_SEARCH_ENGINE_ID bằng ID của công cụ tìm kiếm thiết lập bởi bạn

  const search = customsearch({ version: "v1", auth: env.GOOGLE_API_KEY });

  try {
    const res = await search.cse.list({
      auth: apiKey,
      cx: cx,
      q: query,
      sort: "date:d",
    });

    const results = res.data.items?.map((item) => {
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
    });

    return results;
  } catch (error) {
    console.error("Error occurred during Google Search: ", error);
    throw error;
  }
}

export async function googleSearchImages(query: string) {
  const apiKey = env.GOOGLE_API_KEY; // Thay YOUR_API_KEY bằng khóa API của bạn
  const cx = env.GOOGLE_SEARCH_ENGINE_ID; // Thay YOUR_SEARCH_ENGINE_ID bằng ID của công cụ tìm kiếm thiết lập bởi bạn

  const search = customsearch({ version: "v1", auth: env.GOOGLE_API_KEY });

  try {
    const results = await search.cse.list({
      auth: apiKey,
      cx: cx,
      q: query,
      searchType: "image",
      num: 10, // Số kết quả muốn trả về
    });

    return results.data.items;
  } catch (error) {
    console.error("Error occurred during Google Search: ", error);
    throw error;
  }
}
