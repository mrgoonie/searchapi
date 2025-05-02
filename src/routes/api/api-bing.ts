import express from "express";

import { validateSession } from "@/lib/auth";
import { bingWebSearch } from "@/lib/bing";
import { apiKeyAuth } from "@/middlewares/api_key_auth";

// Bing Search API Router
// Tag: BingSearch
export const apiBingRouter = express.Router();

apiBingRouter.post("/", validateSession, apiKeyAuth, async (req, res, next) => {
  try {
    const results = await bingWebSearch({
      query: req.body.query,
      count: req.body.count || 10,
      offset: req.body.offset || 0,
      market: req.body.market || "en-US",
      safeSearch: req.body.safeSearch || "moderate",
      freshness: req.body.freshness || "all",
      responseFilter: req.body.responseFilter,
    });

    return res.status(200).json({
      success: true,
      message: "Results of Bing Web Search",
      data: results,
    });
  } catch (error) {
    next(error);
  }
});
