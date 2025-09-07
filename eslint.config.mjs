import { FlatCompat } from '@eslint/eslintrc';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

const config = [
  // Bring in Next.js recommended rules via compat
  ...compat.extends('next/core-web-vitals'),

  // Our TypeScript/React rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: false,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    settings: {
      react: { version: 'detect' },
      // Allow @/* alias to resolve for import/order
      'import/resolver': {
        node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        typescript: {},
      },
    },
    rules: {
      // Enforce exactly one React component per file (including stateless)
      'react/no-multi-comp': ['error', { ignoreStateless: false }],

      // Hooks correctness
      'react-hooks/rules-of-hooks': 'error',
'react-hooks/exhaustive-deps': 'warn',

      // Allow typical apostrophes in text content without escaping
      'react/no-unescaped-entities': 'off',

      // Allow anonymous default exports in config files / small configs
      'import/no-anonymous-default-export': 'off',

      // A11y basics
      'jsx-a11y/alt-text': 'warn',

      // Import hygiene and ordering
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Unused imports removal + keep underscores as intentional
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // React 17+ JSX transform: no need to import React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },


  // Global ignores
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'build/**'],
  },
];

export default config;
