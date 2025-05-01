import express from "express";

import { validateSession } from "@/lib/auth";
import { bingWebSearch } from "@/lib/bing";
import { apiKeyAuth } from "@/middlewares/api_key_auth";

// Bing Search API Router
// Tag: BingSearch
export const apiBingRouter = express.Router();

/**
 * @swagger
 * /api/v1/bing:
 *   post:
 *     summary: Perform a Bing web search
 *     tags: [BingSearch]
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: Search keyword
 *               count:
 *                 type: number
 *                 description: Number of results to return
 *                 default: 10
 *               offset:
 *                 type: number
 *                 description: Offset for pagination
 *                 default: 0
 *               market:
 *                 type: string
 *                 enum: [en-US, en-GB, en-CA, en-AU, fr-FR, de-DE, it-IT, es-ES, pt-BR, zh-CN, ja-JP, ko-KR, ru-RU]
 *                 description: Market code for region-specific results
 *                 default: "en-US"
 *               safeSearch:
 *                 type: string
 *                 enum: [off, moderate, strict]
 *                 description: Safe search level
 *                 default: "moderate"
 *               freshness:
 *                 type: string
 *                 enum: [day, week, month, year, all]
 *                 description: Filter by content age
 *                 default: "all"
 *     responses:
 *       200:
 *         description: Successful search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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
