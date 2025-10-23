/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react';
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ensure your files are scanned
    './node_modules/@heroui/**/*.{js,ts,jsx,tsx}', // HeroUI added to JIT
    './node_modules/@danwilson282/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Safelist all possible padding classes based on remToTailwind output
    'pb-0',
    'pb-2',
    'pb-4',
    'pb-6',
    'pb-8',
    'pb-12',
    'pt-0',
    'pt-2',
    'pt-4',
    'pt-6',
    'pt-8',
    'pt-12',
    'pl-0',
    'pl-2',
    'pl-4',
    'pl-6',
    'pl-8',
    'pl-12',
    'pr-0',
    'pr-2',
    'pr-4',
    'pr-6',
    'pr-8',
    'pr-12',
  ],
  theme: {
    extend: {},
  },
  plugins: [heroui()],
};
