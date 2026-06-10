import next from "eslint-config-next";
import { fileURLToPath } from "url";

const tsProject = "./tsconfig.json";
const tsconfigRootDir = fileURLToPath(new URL(".", import.meta.url));

const config = [
  {
    // A config object with only "ignores" applies globally; combined with
    // other keys it would only scope that object.
    ignores: [
      ".next/**",
      ".vercel/**",
      "node_modules/**",
      "reports/**",
      "artifacts/**",
      ".lighthouse/**",
      "eslint.config.mjs",
      "prettier.config.mjs",
      "postcss.config.mjs",
      "next.config.mjs",
    ],
  },
  ...next,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "no-console": ["error", { allow: ["error"] }],
    },
    languageOptions: {
      parserOptions: {
        project: tsProject,
        tsconfigRootDir,
      },
    },
  },
];

export default config;
