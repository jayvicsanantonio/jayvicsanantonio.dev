// Flat ESLint config for ESLint v9
import next from 'eslint-config-next';
import { fileURLToPath } from 'url';

const tsProject = './tsconfig.json';
const tsconfigRootDir = fileURLToPath(new URL('.', import.meta.url));

const config = [
  // Next.js recommended config (flat-config compatible)
  ...next,
  // Repo-specific tweaks and ignores
  {
    ignores: ['.next/**', 'node_modules/**', 'reports/**', 'artifacts/**', '.lighthouse/**', 'eslint.config.mjs', 'prettier.config.mjs', 'postcss.config.mjs', 'next.config.mjs'],
    rules: {
      'react/no-unescaped-entities': 'off',
      // Disallow console logs in code; keep errors for observability
      'no-console': ['error', { allow: ['error'] }],
    },
    languageOptions: {
      parserOptions: {
        project: tsProject,
        // Resolve relative to repo root
        tsconfigRootDir,
      },
    },
  },
];

export default config;
