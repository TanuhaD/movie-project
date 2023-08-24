import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import postcssPresetEnv from "postcss-preset-env";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssNesting, postcssPresetEnv({})],
    },
  },
});
