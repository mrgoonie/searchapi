import express from "express";
import { z } from "zod";

import { IsDev } from "@/config";
import { validateSession } from "@/lib/auth";
import { apiKeyAuth } from "@/middlewares/api_key_auth";
import { backupAndUploadDatabase, generateBackupName } from "@/modules/databases/postgres";

// Database types enum - will be expanded in the future
export const DatabaseType = {
  POSTGRES: "postgres",
  // TODO: Add support for other databases
  // MYSQL: "mysql",
  // MONGODB: "mongodb",
} as const;

// Cloud storage providers
export const CloudStorageProvider = {
  AWS: "aws",
  CLOUDFLARE: "cloudflare",
} as const;

// Database Backup API Router
// Tag: DatabaseBackup
export const apiDatabaseBackupRouter = express.Router();

// Zod schema for cloud storage configuration
const CloudStorageSchema = z.object({
  provider: z.nativeEnum(CloudStorageProvider),
  bucket: z.string(),
  region: z.string(),
  accessKey: z.string(),
  secretKey: z.string(),
  endpoint: z.string(),
  baseUrl: z.string().optional(),
  basePath: z.string().optional(),
});

// Zod schema for database backup creation
const DatabaseBackupRequestSchema = z.object({
  name: z.string().optional(),
  databaseType: z.nativeEnum(DatabaseType),
  connectionUrl: z.string(),
  storage: CloudStorageSchema,
});

/**
 * @openapi
 * components:
 *   schemas:
 *     DatabaseType:
 *       type: string
 *       enum: [postgres]
 *       description: Type of database to backup (currently only postgres is supported)
 *     CloudStorageProvider:
 *       type: string
 *       enum: [cloudflare, aws_s3, do_space, google]
 *       description: Cloud storage provider for storing backups
 *     CloudStorage:
 *       type: object
 *       properties:
 *         provider:
 *           $ref: '#/components/schemas/CloudStorageProvider'
 *         bucket:
 *           type: string
 *           description: Storage bucket name
 *         region:
 *           type: string
 *           description: Storage region
 *         accessKey:
 *           type: string
 *           description: Storage access key
 *         secretKey:
 *           type: string
 *           description: Storage secret key
 *         endpoint:
 *           type: string
 *           description: Custom endpoint URL
 *         baseUrl:
 *           type: string
 *           description: Base URL for accessing files (optional)
 *         basePath:
 *           type: string
 *           description: Base path prefix for files (optional)
 *       required:
 *         - provider
 *         - bucket
 *         - region
 *         - accessKey
 *         - secretKey
 *         - endpoint
 *     DatabaseBackupCreate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the backup (optional, will be auto-generated if not provided)
 *         databaseType:
 *           $ref: '#/components/schemas/DatabaseType'
 *         connectionUrl:
 *           type: string
 *           description: Database connection URL
 *         storage:
 *           $ref: '#/components/schemas/CloudStorage'
 *       required:
 *         - databaseType
 *         - connectionUrl
 *         - storage
 */

/**
 * @openapi
 * /api/v1/database-backup:
 *   post:
 *     summary: Create a database backup and upload to cloud storage
 *     tags:
 *       - DatabaseBackup
 *     security:
 *       - ApiKeyAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DatabaseBackupCreate'
 *     responses:
 *       201:
 *         description: Database backup created and uploaded successfully
 *       400:
 *         description: Invalid backup data
 *       500:
 *         description: Failed to create backup
 */
apiDatabaseBackupRouter.post("/", validateSession, apiKeyAuth, async (req, res, next) => {
  try {
    const backupData = DatabaseBackupRequestSchema.parse(req.body);
    const backupName = backupData.name || generateBackupName(backupData.connectionUrl);
    const outputName = `${backupName}.dump`;

    console.log(`Backup data :>>`, backupData);
    // Handle different database types
    switch (backupData.databaseType) {
      case DatabaseType.POSTGRES: {
        const { provider, url } = await backupAndUploadDatabase({
          connectionUrl: backupData.connectionUrl,
          outputName,
          storage: backupData.storage,
          debug: IsDev(),
        });

        res.status(201).json({
          success: true,
          data: {
            name: backupName,
            provider,
            url,
          },
        });
        break;
      }
      default:
        throw new Error(`Unsupported database type: ${backupData.databaseType}`);
    }
  } catch (error) {
    next(error);
  }
});
