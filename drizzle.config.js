import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://prompt_owner:verPM5kFK6Ry@ep-hidden-pond-a1ttb5zv.ap-southeast-1.aws.neon.tech/prompt?sslmode=require",
  },
  verbose: true,
  strict: true,
});
