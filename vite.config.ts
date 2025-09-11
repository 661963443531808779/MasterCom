import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimisations React agressives
      fastRefresh: true
    }),
  ],
  optimizeDeps: {
    // Pré-bundler les dépendances critiques
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js'
    ],
    exclude: ['lucide-react'],
    force: true, // Forcer la re-optimisation
    esbuildOptions: {
      target: 'es2015',
      minify: true,
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    }
  },
  build: {
    // Optimisations de build agressives
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: false, // Un seul fichier CSS
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@supabase')) {
              return 'supabase';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }
        },
        // Optimisations de nommage
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8].[ext]',
      },
    },
    // Augmenter la limite de taille des chunks
    chunkSizeWarningLimit: 3000,
    reportCompressedSize: false,
    // Optimisations Terser
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer console.log en production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true
      },
      mangle: {
        safari10: true
      }
    },
  },
  server: {
    // Configuration du serveur de développement
    port: 3000,
    host: '0.0.0.0',
    cors: true,
    hmr: {
      overlay: false,
      port: 3001
    },
    // Optimisations de serveur
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
  },
  // Optimisations globales
  esbuild: {
    target: 'es2015',
    drop: ['console', 'debugger'], // Supprimer console en production
  },
});
