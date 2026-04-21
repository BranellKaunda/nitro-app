import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./server",
  devServer: {
    port: 8000,
    watch: ["./server/plugins"],
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
});
