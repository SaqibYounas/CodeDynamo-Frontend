import { relative } from 'path';

export default {
  // Source code files (lint + prettier)
  'src/**/*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],

  // Test files only (prettier, no ESLint)
  '**/*.test.{js,ts,jsx,tsx}': (filenames) => [
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],

  // Other formats
  '*.{json,css,scss,md}': (filenames) => [
    `prettier --write ${filenames.map((f) => `"${f}"`).join(' ')}`,
  ],
};
