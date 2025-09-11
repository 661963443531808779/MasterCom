# 🚀 Guide de déploiement MasterCom

## Configuration finale pour master-com.vercel.app

### ✅ Problèmes résolus :
1. **Terser manquant** - Ajouté comme dépendance dev
2. **Configuration Vercel** - Optimisée pour Vite + React
3. **Ports** - Standardisés sur 3000
4. **Headers de sécurité** - Configurés
5. **Cache** - Optimisé pour les assets
6. **Build** - Script optimisé créé

### 📁 Fichiers de configuration :
- `vercel.json` - Configuration principale
- `vercel-production.json` - Configuration de production
- `vercel-domain-config.json` - Configuration pour domaine personnalisé
- `build-vercel.js` - Script de build optimisé

### 🛠️ Commandes de déploiement :

```bash
# Déploiement standard
npm run deploy

# Déploiement avec configuration optimisée
npm run deploy:production

# Déploiement pour domaine personnalisé
npm run deploy:domain

# Build local de test
npm run build:vercel-optimized
```

### 🌐 Configuration des domaines :

1. **master-com.vercel.app** (automatique)
2. **www.master-com.vercel.app** (redirection vers master-com.vercel.app)
3. **Votre domaine personnalisé** (si configuré)

### ⚙️ Variables d'environnement configurées :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TIMEOUT`
- `VITE_RETRY_ATTEMPTS`
- `VITE_CACHE_DURATION`
- `NODE_ENV=production`

### 🔧 Optimisations incluses :
- ✅ Minification Terser
- ✅ Code splitting
- ✅ Cache agressif (1 an)
- ✅ Headers de sécurité
- ✅ Compression gzip
- ✅ HTTPS forcé
- ✅ CSP (Content Security Policy)
- ✅ Redirections SPA

### 📊 Ports configurés :
- **Développement** : 3000
- **Preview** : 3000
- **HMR** : 3001

### 🚀 Étapes de déploiement :

1. **Test local** :
   ```bash
   npm run build:vercel-optimized
   npm run preview
   ```

2. **Déploiement** :
   ```bash
   npm run deploy:domain
   ```

3. **Vérification** :
   - Vérifiez que l'application est accessible
   - Testez les routes SPA
   - Vérifiez les performances

### 🔍 Debugging :
- Logs Vercel : `vercel logs`
- Status : `vercel ls`
- Inspect : `vercel inspect <url>`

### 📝 Notes importantes :
- Le build est optimisé pour la production
- Tous les console.log sont supprimés en production
- Les assets sont mis en cache pendant 1 an
- L'application est sécurisée avec HTTPS
