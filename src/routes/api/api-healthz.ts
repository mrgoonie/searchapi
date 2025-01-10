import express from "express";

export const apiHealthzRouter = express.Router();

/**
 * @swagger
 * /api/v1/healthz:
 *   get:
 *     summary: Check the health status of the service
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Service is healthy
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: OK
 */
apiHealthzRouter.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Service is healthy",
    data: { status: "OK" },
  });
});
