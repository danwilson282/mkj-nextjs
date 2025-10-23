import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';
// Needed for FlatCompat
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

// Final ESLint config
const eslintConfig = [
  // Extend Next.js recommended configs for Core Web Vitals & TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier config — disables conflicting ESLint rules
  ...compat.extends('prettier'),

  // Custom rules and ignores
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
    plugins: {
      // Prettier plugin provides the prettier/prettier rule
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Make Prettier issues errors in ESLint
      'prettier/prettier': 'error',

      // Optional: you can override other rules here
      '@next/next/no-img-element': 'error',
    },
  },
];

export default eslintConfig;
