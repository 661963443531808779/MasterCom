# 🔧 Guide de résolution des problèmes - MasterCom

## ✅ Problèmes résolus

### 1. Erreur `Cannot read properties of undefined (reading 'forwardRef')`
**Cause :** Problème de configuration Vite avec Terser et React
**Solution :** 
- Changé `minify: 'terser'` vers `minify: 'esbuild'`
- Simplifié la configuration de build
- Ajouté des imports React explicites

### 2. Chargement infini
**Cause :** Timeouts trop longs dans AuthContext
**Solution :**
- Réduit le timeout à 3 secondes
- Ajouté des fallbacks immédiats
- Simplifié la logique d'authentification

### 3. Problèmes de ports sur Vercel
**Cause :** Configuration de ports hardcodés
**Solution :**
- Supprimé `devCommand` de vercel.json
- Configuré Vite pour Vercel
- Utilisé des variables d'environnement

### 4. Preload warnings
**Cause :** Preloads incorrects dans index.html
**Solution :**
- Supprimé les preloads de fichiers source
- Gardé seulement les preconnects externes

## 🚀 Configuration optimale

### Vercel.json final
```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --include=dev",
  "public": true,
  "regions": ["iad1"]
}
```

### Variables d'environnement
- `VITE_TIMEOUT`: 5000ms (au lieu de 15000ms)
- `VITE_RETRY_ATTEMPTS`: 3 (au lieu de 5)
- `VITE_CACHE_DURATION`: 60000ms (au lieu de 120000ms)

### Configuration Vite
- `minify: 'esbuild'` (plus stable que Terser)
- `cssCodeSplit: true` (meilleure performance)
- Timeouts réduits partout

## 🔍 Debugging

### Console DevTools
Si vous voyez encore des erreurs :
1. Videz le cache du navigateur (Ctrl+Shift+R)
2. Vérifiez la console pour les erreurs spécifiques
3. Utilisez l'ErrorBoundary pour capturer les erreurs React

### Logs Vercel
```bash
vercel logs <deployment-url>
```

### Build local
```bash
npm run build
npm run preview
```

## 📊 Performance

### Métriques optimisées
- Build time: ~3 secondes
- Bundle size: ~350KB vendor + ~200KB app
- Loading time: <3 secondes
- Cache: 1 an pour assets, 1 minute pour données

### Optimisations incluses
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification esbuild
- ✅ Cache agressif
- ✅ Headers de sécurité
- ✅ Compression gzip

## 🎯 Prochaines étapes

1. **Déployer** : `npm run deploy`
2. **Tester** : Vérifier que l'application se charge
3. **Monitorer** : Surveiller les logs Vercel
4. **Optimiser** : Ajuster selon les métriques

## 🆘 Support

Si des problèmes persistent :
1. Vérifiez les logs Vercel
2. Testez en local avec `npm run preview`
3. Videz le cache du navigateur
4. Vérifiez la configuration Supabase
