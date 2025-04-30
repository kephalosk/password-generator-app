import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/password-generator-app/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
