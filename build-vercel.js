#!/usr/bin/env node

/**
 * Script de build optimisé pour Vercel
 * MasterCom - Configuration de production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 MasterCom - Build optimisé pour Vercel');

// Vérifier que nous sommes dans le bon répertoire
if (!fs.existsSync('package.json')) {
  console.error('❌ Erreur: package.json non trouvé');
  process.exit(1);
}

try {
  // Nettoyer les anciens builds
  console.log('🧹 Nettoyage des anciens builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  if (fs.existsSync('.vite')) {
    fs.rmSync('.vite', { recursive: true, force: true });
  }

  // Installer les dépendances
  console.log('📦 Installation des dépendances...');
  execSync('npm install --include=dev', { stdio: 'inherit' });

  // Build de production
  console.log('🔨 Build de production...');
  execSync('npm run build', { stdio: 'inherit' });

  // Vérifier que le build a réussi
  if (!fs.existsSync('dist/index.html')) {
    throw new Error('Build failed: index.html not found');
  }

  // Optimisations post-build
  console.log('⚡ Optimisations post-build...');
  
  // Vérifier la taille du build
  const distStats = fs.statSync('dist');
  console.log(`📊 Taille du build: ${(distStats.size / 1024 / 1024).toFixed(2)} MB`);

  // Lister les fichiers générés
  const files = fs.readdirSync('dist', { recursive: true });
  console.log(`📁 Fichiers générés: ${files.length}`);

  console.log('✅ Build terminé avec succès!');
  console.log('🌐 Prêt pour le déploiement sur Vercel');

} catch (error) {
  console.error('❌ Erreur lors du build:', error.message);
  process.exit(1);
}
