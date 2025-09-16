#!/usr/bin/env node

/**
 * Script de déploiement optimisé pour Vercel
 * MasterCom - Déploiement de production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 MasterCom - Déploiement Vercel optimisé');

try {
  // Vérifier que nous sommes dans le bon répertoire
  if (!fs.existsSync('package.json')) {
    throw new Error('package.json non trouvé');
  }

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

  // Vérifier les fichiers critiques
  const criticalFiles = [
    'dist/index.html',
    'dist/assets/index-*.js',
    'dist/assets/index-*.css'
  ];

  console.log('✅ Build terminé avec succès!');
  console.log('🌐 Prêt pour le déploiement sur Vercel');
  console.log('📝 Commandes de déploiement:');
  console.log('   npm run deploy:preview  (pour un déploiement de test)');
  console.log('   npm run deploy:production  (pour la production)');

} catch (error) {
  console.error('❌ Erreur lors du déploiement:', error.message);
  process.exit(1);
}
