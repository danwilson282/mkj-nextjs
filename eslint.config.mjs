import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

/**
 * ESLint Flat Config
 * - Ignores build/output folders reliably
 * - Extends Next.js recommended rules + TypeScript
 * - Integrates Prettier properly
 */
const eslintConfig = [
  // Ignores configuration (must be separate)
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },

  // Next.js recommended rules
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Prettier integration (disables conflicting rules)
  ...compat.extends('prettier'),

  // Custom rules
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: {
      'prettier/prettier': 'error',
      '@next/next/no-img-element': 'error',
    },
  },
];

export default eslintConfig;
