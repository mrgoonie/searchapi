import express from "express";

import { apiBingRouter } from "./api-bing";
import { apiGoogleRouter } from "./api-google";
import { apiHealthzRouter } from "./api-healthz";
import { apiKeyRouter } from "./api-key";
import apiOrderRouter from "./api-order";
import { apiPaymentRouter } from "./api-payment";
import { apiProfileRouter } from "./api-profile";
import { apiUploadRouter } from "./api-upload";

export const apiRouter = express.Router();

// middleware
apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

// routes
apiRouter.use("/api/v1/healthz", apiHealthzRouter);
apiRouter.use("/api/v1/profile", apiProfileRouter);
apiRouter.use("/api/v1/upload", apiUploadRouter);
apiRouter.use("/api/v1/api_key", apiKeyRouter);
apiRouter.use("/api/v1/payments", apiPaymentRouter);
apiRouter.use("/api/v1/order", apiOrderRouter);
apiRouter.use("/api/v1/google", apiGoogleRouter);
apiRouter.use("/api/v1/bing", apiBingRouter);
