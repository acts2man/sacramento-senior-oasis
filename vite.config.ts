import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { writeFileSync, mkdirSync } from "fs";
import { componentTagger } from "lovable-tagger";
import { generateSitemap } from "./src/utils/sitemapGenerator";

const sitemapPlugin = () => ({
  name: "generate-sitemap",
  buildStart() {
    const sitemap = generateSitemap();
    const outPath = path.resolve(__dirname, "public/sitemap.xml");
    mkdirSync(path.dirname(outPath), { recursive: true });
    writeFileSync(outPath, sitemap);
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    sitemapPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
