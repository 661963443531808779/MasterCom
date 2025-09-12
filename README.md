# MasterCom - Agence de Communication

Application React/TypeScript pour une agence de communication professionnelle avec CRM intégré.

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement la configuration Vite
3. Le déploiement se fera automatiquement à chaque push

### Configuration Vercel
- **Framework**: Vite (détecté automatiquement)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

## 🛠️ Développement Local

```bash
# Installation
npm install

# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages de l'application
├── contexts/      # Contextes React (Auth, etc.)
├── services/      # Services (Supabase, etc.)
├── utils/         # Utilitaires
└── App.tsx        # Composant principal
```

## 🔧 Configuration

### Variables d'environnement
Les variables d'environnement sont configurées dans `vercel.json` :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_TIMEOUT`
- `VITE_RETRY_ATTEMPTS`
- `VITE_CACHE_DURATION`

### Vercel.json
Configuration optimisée pour Vercel avec :
- Headers de sécurité
- Cache optimisé
- Rewrites pour SPA
- Variables d'environnement

## 🎯 Fonctionnalités

- ✅ Site vitrine responsive
- ✅ Système d'authentification
- ✅ CRM intégré
- ✅ Dashboard administrateur
- ✅ Blog et portfolio
- ✅ Formulaire de contact
- ✅ SEO optimisé

## 📱 Pages

- **/** - Accueil
- **/about** - À propos
- **/services** - Nos services
- **/portfolio** - Réalisations
- **/blog** - Blog
- **/contact** - Contact
- **/login** - Connexion
- **/crm** - Interface CRM
- **/dashboard** - Dashboard admin

## 🚀 Déploiement GitHub

1. **Push vers GitHub** : Le code est automatiquement déployé
2. **Vercel Integration** : Déploiement automatique via Vercel
3. **Build Status** : Vérifiable dans l'onglet Actions de GitHub

## 🔍 Debug

En cas de problème :
1. Vérifier les logs Vercel
2. Tester en local avec `npm run preview`
3. Vérifier la console du navigateur

## 📞 Support

Pour toute question technique, vérifiez :
- Les logs de déploiement Vercel
- La console du navigateur
- Les erreurs de build GitHub Actions