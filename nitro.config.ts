import { defineConfig } from "nitro";

const POSTGRES_URL = process.env.POSTGRES_URL;

export default defineConfig({
  serverDir: "./server",
  experimental: {
    database: true,
  },
  database: {
    default: {
      connector: "postgresql",
      options: {
        url: `${POSTGRES_URL}`,
      },
    },
    users: {
      connector: "postgresql",
      options: {
        url: `${POSTGRES_URL}`,
      },
    },
  },
});
