import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.vite/**',
      'build-*.js',
      'vercel-*.json'
    ],
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        process: 'readonly'
      },
    },
    rules: {
      'no-unused-vars': 'off', // Désactivé pour TypeScript
      'no-console': 'off',
    },
  },
];