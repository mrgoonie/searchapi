import dayjs from "dayjs";
import slugify from "slugify";

/**
 * Extract database name from connection URL
 */
export function getDatabaseNameFromUrl(url: string): string {
  try {
    const dbName = url.split("/").pop()?.split("?")[0];
    return dbName || "database";
  } catch (error) {
    return "database";
  }
}

/**
 * Generate a backup name if not provided
 */
export function generateBackupName(connectionUrl: string): string {
  const dbName = getDatabaseNameFromUrl(connectionUrl);
  const timestamp = dayjs().format("YYYY-MM-DD-HH-mm-ss");
  return slugify(`${dbName}-${timestamp}`, { lower: true });
}
