// Prisma 7 does not read .env on its own, and the CLI process does not
// inherit Bun's .env values. Load them here so every prisma command sees them.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "bun prisma/seed.ts",
  },
  datasource: {
    // CLI commands (migrate, studio) need a direct connection, not the pooler.
    url: env("DIRECT_URL"),
  },
});
