import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://prompt_owner:verPM5kFK6Ry@ep-hidden-pond-a1ttb5zv.ap-southeast-1.aws.neon.tech/prompt?sslmode=require"
);
export const db = drizzle(sql, { schema });
