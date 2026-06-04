import { defineConfig } from "vite";

/** Ruta base en GitHub Pages: https://<user>.github.io/<repo>/ */
const repoBase = "/hackaton-devin/";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? repoBase : "/",
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
  build: {
    assetsInlineLimit: 0,
  },
  esbuild: {
    minifySyntax: false,
  },
});
