/* eslint-env node */
/**
 * ESLint configuration
 * - Enforces one React component per file via react/no-multi-comp
 * - Aligns with Next.js, TypeScript, a11y, and import hygiene best practices
 */

const config = {
  root: true,
  ignorePatterns: ['.next', 'node_modules', 'pnpm-lock.yaml'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'unused-imports', 'import'],
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    // One component per file
    'react/no-multi-comp': ['error', { ignoreStateless: false }],

    // React & Hooks
    'react/jsx-key': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Imports
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],

    // TypeScript
    // Note: we ignore only underscore-prefixed vars/args by convention
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],

    // Optional: steer away from deep relative imports when alias is available
    // (kept lenient to avoid false positives within co-located components)
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          // Warn only on very deep parents; prefer "@/" alias instead
          '^../../../',
          '^../../../../',
        ],
      },
    ],
  },
};

export default config;
