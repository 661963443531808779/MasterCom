# 🚀 Guide de Déploiement Vercel - MasterCom

## 📋 Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **Compte Supabase** : [supabase.com](https://supabase.com)
3. **Node.js 18+** installé localement
4. **Git** configuré

## 🔧 Configuration Supabase

### 1. Exécuter le script SQL
```sql
-- Exécuter vercel-deployment.sql dans Supabase SQL Editor
```

### 2. Configurer Auth dans Supabase Dashboard
- **Authentication** → **Settings** → **Password Protection**
  - ✅ **Enable leaked password protection**
- **Authentication** → **Settings** → **Multi-Factor Authentication**
  - ✅ **Enable TOTP**

## 🚀 Déploiement Vercel

### Méthode 1 : Via Vercel CLI (Recommandée)

```bash
# 1. Installer Vercel CLI
npm i -g vercel

# 2. Se connecter
vercel login

# 3. Dans le dossier du projet
vercel

# 4. Suivre les instructions
# - Link to existing project? N
# - Project name: mastercom
# - Framework: Vite
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

### Méthode 2 : Via GitHub

1. **Pousser le code sur GitHub**
2. **Connecter Vercel à GitHub**
3. **Importer le projet**
4. **Configurer les variables d'environnement**

## ⚙️ Configuration des Variables d'Environnement

Dans Vercel Dashboard → **Settings** → **Environment Variables** :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `VITE_SUPABASE_URL` | `https://your-project-id.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `your_supabase_anon_key` | Production, Preview, Development |

## 🔍 Vérification du Déploiement

### 1. Test de l'application
```bash
# URL de production
https://your-app.vercel.app

# Vérifier :
# ✅ Page d'accueil se charge
# ✅ Connexion fonctionne
# ✅ Dashboard s'affiche
# ✅ CRUD clients fonctionne
```

### 2. Monitoring des performances
```bash
# Vérifier les logs Vercel
vercel logs

# Vérifier les métriques
# Dashboard Vercel → Analytics
```

## 🚨 Résolution des Problèmes

### Erreur : Configuration Supabase manquante
```bash
# Vérifier les variables d'environnement
vercel env ls

# Redéployer après correction
vercel --prod
```

### Erreur : Build failed
```bash
# Vérifier les logs de build
vercel logs --follow

# Build local pour tester
npm run build:vercel
```

### Erreur : CORS
```bash
# Vérifier la configuration Supabase
# Dashboard Supabase → Settings → API
# Ajouter le domaine Vercel dans les CORS origins
```

## 📊 Optimisations Appliquées

### Performance
- ✅ **Cache multi-niveaux** (2-5 minutes)
- ✅ **Retry automatique** (3 tentatives)
- ✅ **Timeout configuré** (10 secondes)
- ✅ **Chunks optimisés** (React, Supabase séparés)
- ✅ **Compression Terser** (console.log supprimés)

### Sécurité
- ✅ **Headers de sécurité** (HSTS, XSS, etc.)
- ✅ **Politiques RLS optimisées**
- ✅ **Fonctions sécurisées** (search_path fixé)
- ✅ **Auth renforcée** (MFA, leaked passwords)

### Vercel
- ✅ **Configuration optimisée** (vercel.json)
- ✅ **Build optimisé** (vite.config.ts)
- ✅ **Cache statique** (assets immutables)
- ✅ **Redirections SPA** (toutes vers index.html)

## 🎯 Résultats Attendus

### Temps de Chargement
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Time to Interactive** : < 3s

### Performance Score
- **Lighthouse Performance** : > 90
- **Lighthouse SEO** : > 95
- **Lighthouse Accessibility** : > 90

### Fonctionnalités
- ✅ **Authentification** : Connexion/Déconnexion
- ✅ **Dashboard** : Statistiques en temps réel
- ✅ **CRUD Clients** : Création/Modification/Suppression
- ✅ **Cache intelligent** : Données mises en cache
- ✅ **Responsive** : Mobile/Desktop

## 🔄 Mise à Jour Continue

### Déploiement automatique
```bash
# Push sur main = déploiement production
git push origin main

# Push sur develop = déploiement preview
git push origin develop
```

### Monitoring
- **Vercel Analytics** : Performance et erreurs
- **Supabase Dashboard** : Requêtes et logs
- **Console Browser** : Erreurs client

---

*MasterCom est maintenant optimisé et prêt pour la production sur Vercel ! 🎉*
