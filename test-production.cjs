// Script de test pour vérifier la build de production
const fs = require('fs');
const path = require('path');

console.log('🧪 Test de la build de production...');

// Vérifier que le fichier index.html existe
const indexPath = path.join(__dirname, 'dist', 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ Fichier index.html manquant dans dist/');
  process.exit(1);
}

// Lire le contenu du fichier HTML
const htmlContent = fs.readFileSync(indexPath, 'utf8');

// Vérifications
const checks = [
  {
    name: 'Doctype HTML',
    test: htmlContent.includes('<!doctype html>'),
    error: 'Doctype HTML manquant'
  },
  {
    name: 'Élément root',
    test: htmlContent.includes('<div id="root"></div>'),
    error: 'Élément root manquant'
  },
  {
    name: 'Script principal',
    test: htmlContent.includes('src="/assets/index-'),
    error: 'Script principal manquant'
  },
  {
    name: 'CSS principal',
    test: htmlContent.includes('href="/assets/index-'),
    error: 'CSS principal manquant'
  },
  {
    name: 'Meta viewport',
    test: htmlContent.includes('name="viewport"'),
    error: 'Meta viewport manquant'
  },
  {
    name: 'Title',
    test: htmlContent.includes('<title>'),
    error: 'Title manquant'
  }
];

let allPassed = true;

checks.forEach(check => {
  if (check.test) {
    console.log(`✅ ${check.name}`);
  } else {
    console.error(`❌ ${check.name}: ${check.error}`);
    allPassed = false;
  }
});

// Vérifier les assets
const assetsDir = path.join(__dirname, 'dist', 'assets');
if (fs.existsSync(assetsDir)) {
  const assets = fs.readdirSync(assetsDir);
  console.log(`✅ Assets trouvés: ${assets.length} fichiers`);
  
  const jsFiles = assets.filter(file => file.endsWith('.js'));
  const cssFiles = assets.filter(file => file.endsWith('.css'));
  
  console.log(`   - ${jsFiles.length} fichiers JS`);
  console.log(`   - ${cssFiles.length} fichiers CSS`);
} else {
  console.error('❌ Dossier assets manquant');
  allPassed = false;
}

if (allPassed) {
  console.log('\n🎉 Tous les tests sont passés ! La build de production est prête.');
} else {
  console.log('\n❌ Certains tests ont échoué. Vérifiez la build.');
  process.exit(1);
}
