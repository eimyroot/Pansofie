import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  { files: ["src/legacy-pages/**", "src/components/**"], rules: { "@next/next/no-html-link-for-pages": "off" } },
  globalIgnores([".next/**", "dist/**"]),
]);
