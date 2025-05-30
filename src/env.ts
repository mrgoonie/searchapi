/* eslint-disable no-unused-vars */
import dotenv from "dotenv";
import z from "zod";

dotenv.config();

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),
  BASE_URL: z.string(),
  SITE_NAME: z.string(),
  SITE_DESCRIPTION: z.string(),
  SITE_KEYWORDS: z.string().optional(),
  LOCALE: z.string().default("en"),
  TZ: z.string().default("Asia/Ho_Chi_Minh"),
  APP_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_API_KEY: z.string(),
  GOOGLE_SEARCH_ENGINE_ID: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  REDIS_PREFIX: z.string().optional(),
  REDIS_URL: z.string().optional(),
  CLOUDFLARE_CDN_PROJECT_NAME: z.string(),
  CLOUDFLARE_CDN_ACCESS_KEY: z.string(),
  CLOUDFLARE_CDN_SECRET_KEY: z.string(),
  CLOUDFLARE_CDN_BUCKET_NAME: z.string(),
  CLOUDFLARE_CDN_ENDPOINT_URL: z.string(),
  CLOUDFLARE_CDN_BASE_URL: z.string(),
  ELASTIC_EMAIL_APIKEY: z.string(),
  ELASTIC_EMAIL_FROM: z.string().default("noreply@searchapi.site"),
  WEBSHAREIO_API_KEY: z.string(),
  PROXY_URL: z.string(),
  OPENROUTER_KEY: z.string(),
  UPFILEBEST_API_KEY: z.string(),
  POLAR_ORGANIZATION_ID: z.string(),
  POLAR_SECRET: z.string(),
  POLAR_ACCESS_TOKEN: z.string(),
  BING_API_KEY: z.string(),
});
export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);

// Extract server env variables
const {
  DATABASE_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_API_KEY,
  GOOGLE_SEARCH_ENGINE_ID,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIS_PREFIX,
  REDIS_URL,
  CLOUDFLARE_CDN_PROJECT_NAME,
  CLOUDFLARE_CDN_ACCESS_KEY,
  CLOUDFLARE_CDN_SECRET_KEY,
  CLOUDFLARE_CDN_BUCKET_NAME,
  CLOUDFLARE_CDN_ENDPOINT_URL,
  ELASTIC_EMAIL_APIKEY,
  ELASTIC_EMAIL_FROM,
  WEBSHAREIO_API_KEY,
  PROXY_URL,
  OPENROUTER_KEY,
  UPFILEBEST_API_KEY,
  POLAR_ORGANIZATION_ID,
  POLAR_ACCESS_TOKEN,
  POLAR_SECRET,
  BING_API_KEY,
  ...clientEnv
} = env;

export { clientEnv };
