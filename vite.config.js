import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  base: "./",

  plugins: [react()],

  server: {
    open: true,
  },

  build: {
    manifest: true,
  },

  resolve: {
    alias: {
      "@context": fileURLToPath(new URL("./src/context", import.meta.url)),

      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),

      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),

      "@data": fileURLToPath(new URL("./src/data", import.meta.url)),

      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),

      "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),

      "@link": fileURLToPath(
        new URL(
          "./src/context/LocalizationProvider/Link/Link",
          import.meta.url,
        ),
      ),
    },
  },
});
