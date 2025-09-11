# Configuration de déploiement MasterCom

## Configuration Vercel optimisée

### Fichiers de configuration :
- `vercel.json` - Configuration principale
- `vercel-production.json` - Configuration de production optimisée

### Variables d'environnement :
```bash
VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A
VITE_TIMEOUT=15000
VITE_RETRY_ATTEMPTS=5
VITE_CACHE_DURATION=120000
NODE_ENV=production
```

### Commandes de déploiement :
```bash
# Déploiement standard
npm run deploy

# Déploiement avec configuration optimisée
npm run deploy:production

# Déploiement preview
npm run deploy:preview
```

### Ports configurés :
- Développement : 3000
- Preview : 3000
- HMR : 3001

### Optimisations incluses :
- ✅ Cache agressif pour les assets
- ✅ Headers de sécurité
- ✅ Compression gzip
- ✅ Minification Terser
- ✅ Code splitting optimisé
- ✅ Redirections SPA
- ✅ Support HTTPS
