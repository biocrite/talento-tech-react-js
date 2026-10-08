import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

const path = (file) =>
  fileURLToPath(new URL(file, import.meta.url));

export default defineConfig({
  plugins: [react()],

  server: {
    open: true,
  },

  build: {
    manifest: true,
  },

  resolve: {
    alias: {
      "@context": path("./src/context"),
      "@components": path("./src/components"),
      "@utils": path("./src/utils"),
      "@data": path("./src/data"),
      "@pages": path("./src/pages"),
      "@routes": path("./src/routes"),
    },
  },
});