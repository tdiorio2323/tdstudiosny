import { resolve } from "path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    include: ["__tests__/**/*.spec.ts?(x)", "tests/**/*.spec.ts?(x)"],
    exclude: ["tests/e2e/**"],
    passWithNoTests: false,
    globals: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
})
