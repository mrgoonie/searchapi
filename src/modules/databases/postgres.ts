import { $ } from "execa";
import fs from "fs";
import path from "path";

import { type ICloudStorage, uploadFileBuffer } from "@/lib/cloud-storage";

interface BackupOptions {
  /**
   * The connection URL for the PostgreSQL database.
   */
  connectionUrl: string;

  /**
   * The name of the output file for the backup.
   */
  outputName: string;

  /**
   * Whether to print debug messages.
   */
  debug?: boolean;
}

/**
 * Find pg_dump in the system PATH
 */
async function findPgDump(): Promise<string> {
  try {
    const { stdout } = await $`which pg_dump`;
    return stdout.trim();
  } catch (error) {
    throw new Error(
      "pg_dump not found in system PATH. Please ensure PostgreSQL client tools are installed."
    );
  }
}

/**
 * Backup a PostgreSQL database using pg_dump with plain text format.
 *
 * @param {BackupOptions} options - The options for the backup operation.
 */
export async function backupPostgresDatabase({
  connectionUrl,
  outputName,
  debug = false,
}: BackupOptions): Promise<string> {
  try {
    // Ensure outputName ends with .sql and remove any path separators
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
    const cleanFileName = outputName.replace(/[/\\]/g, "-");
    const sqlFileName = cleanFileName.endsWith(".sql") ? cleanFileName : `${cleanFileName}.sql`;
    const backupFileName = `backup-${timestamp}-${sqlFileName}`;
    const outputPath = path.join(process.cwd(), "public/uploads", backupFileName);

    // Ensure the uploads directory exists
    await fs.promises.mkdir(path.join(process.cwd(), "public/uploads"), { recursive: true });

    // Find pg_dump in system PATH
    const pgDumpPath = await findPgDump();
    if (debug) {
      console.log("Using pg_dump from:", pgDumpPath);
    }

    // Use pg_dump with plain text format for SQL output
    const { stdout, stderr } = await $`${pgDumpPath} ${connectionUrl} -v -f ${outputPath}`;

    if (debug) {
      console.log("Backup stdout:", stdout);
      console.log("Backup stderr:", stderr);
    }

    console.log(`Database backup completed successfully: ${backupFileName}`);
    return backupFileName;
  } catch (error) {
    console.error("Error backing up database:", error);
    throw error;
  }
}

export type StorageUploadOptions = {
  storage: ICloudStorage;
  debug?: boolean;
};

export type BackupAndUploadOptions = BackupOptions & StorageUploadOptions;

export async function backupAndUploadDatabase({
  connectionUrl,
  outputName,
  storage,
  debug = false,
}: BackupAndUploadOptions): Promise<{ provider: string; url: string }> {
  let backupFileName: string | undefined;
  let outputPath: string | undefined;

  try {
    // Create backup
    backupFileName = await backupPostgresDatabase({ connectionUrl, outputName, debug });
    outputPath = path.join(process.cwd(), "public/uploads", backupFileName);

    // Upload to cloud storage
    const fileBuffer = await fs.promises.readFile(outputPath);
    const { publicUrl, provider } = await uploadFileBuffer(fileBuffer, backupFileName, {
      storage,
      debug,
    });

    console.log(`Database backup uploaded to cloud storage: ${backupFileName}`);

    return { provider, url: publicUrl };
  } catch (error) {
    console.error("Error in backup and upload process:", error);
    throw error;
  } finally {
    // Clean up local backup file
    if (outputPath) {
      try {
        // await fs.promises.unlink(outputPath);
      } catch (error) {
        console.error("Error cleaning up backup file:", error);
      }
    }
  }
}

export * from "./utils";
