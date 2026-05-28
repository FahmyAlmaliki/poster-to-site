import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    // TanStack Start (SSR + server entry).
    tanstackStart({
      server: { entry: "server" },
      // Generate static HTML into dist/client (eg. index.html for "/").
      // This makes static hosts like Vercel work without custom SSR routing.
      prerender: { enabled: true, crawlLinks: false },
      pages: [{ path: "/" }],
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
});
