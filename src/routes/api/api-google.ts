import express from "express";

import { validateSession } from "@/lib/auth";
import { googleSearch, googleSearchImages } from "@/lib/google";
import { youtubeSearch } from "@/lib/google/youtube-search";
import { apiKeyAuth } from "@/middlewares/api_key_auth";

// Google Search API Router
// Tag: GoogleSearch
export const apiGoogleRouter = express.Router();
/**
 * @swagger
 * /api/v1/google:
 *   post:
 *     summary: Perform a Google search
 *     tags: [GoogleSearch]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
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
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
apiGoogleRouter.post("/", validateSession, apiKeyAuth, async (req, res, next) => {
  try {
    const results = await googleSearch(req.body.query);
    return res.status(200).json({
      success: true,
      message: "Results of Google Search",
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/google/images:
 *   post:
 *     summary: Perform a Google image search
 *     tags: [GoogleSearch]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful image search
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
 *                   type: array
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
apiGoogleRouter.post("/images", validateSession, apiKeyAuth, async (req, res, next) => {
  try {
    const results = await googleSearchImages(req.body.query);
    return res.status(200).json({
      success: true,
      message: "Results of Google Search Images",
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/google/youtube:
 *   post:
 *     summary: Perform a YouTube search
 *     tags: [GoogleSearch]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               query:
 *                 type: string
 *               maxResults:
 *                 type: number
 *                 default: 10
 *               pageToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful YouTube search
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
apiGoogleRouter.post("/youtube", validateSession, apiKeyAuth, async (req, res, next) => {
  try {
    const results = await youtubeSearch({
      query: req.body.query,
      maxResults: req.body.maxResults || 50,
      pageToken: req.body.pageToken,
    });
    return res.status(200).json({
      success: true,
      message: "Results of YouTube Search",
      data: results,
    });
  } catch (error) {
    next(error);
  }
});
