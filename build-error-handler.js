// Gestionnaire d'erreurs pour le build
console.log('🔧 Vérification de la configuration de build...');

// Vérifier que tous les fichiers requis existent
import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'index.html',
  'package.json',
  'vite.config.ts'
];

console.log('📁 Vérification des fichiers requis:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.error(`❌ ${file} manquant`);
    process.exit(1);
  }
});

console.log('✅ Tous les fichiers requis sont présents');
console.log('🚀 Prêt pour le build sur Vercel');
