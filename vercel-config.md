# 🔧 Configuration Vercel - MasterCom

## ❌ Problème : Fonctionne en local mais pas sur Vercel

### 🚀 Solution : Variables d'Environnement

**Dans Vercel Dashboard :**
1. Allez dans votre projet Vercel
2. Cliquez sur **Settings**
3. Cliquez sur **Environment Variables**
4. Ajoutez ces variables pour **Production**, **Preview** et **Development** :

```
VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A
```

### 📋 Étapes Détaillées

**1. Accéder au Dashboard**
- Connectez-vous sur [vercel.com](https://vercel.com)
- Sélectionnez votre projet **MasterCom**

**2. Configurer les Variables**
- Onglet **Settings**
- Menu **Environment Variables**
- Bouton **Add New**

**3. Ajouter les Variables**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://gpnjamtnogyfvykgdiwd.supabase.co`
- **Environment:** Production, Preview, Development

- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A`
- **Environment:** Production, Preview, Development

**4. Redéployer**
- Onglet **Deployments**
- Cliquez sur **Redeploy** sur le dernier déploiement

### ✅ Vérification

**Après configuration :**
1. Le message "❌ Variables d'environnement manquantes" doit disparaître
2. La connexion avec `master@mastercom.fr` doit fonctionner
3. Les thèmes saisonniers doivent être accessibles

### 🎨 Thèmes Améliorés

**Nouveaux thèmes stylés :**
- 🎃 **Halloween** (en premier)
- 🎄 **Noël**
- 🥚 **Pâques**
- ☀️ **Été**

**Décorations positionnées :**
- Coin supérieur gauche
- Coin supérieur droit
- Coin inférieur gauche
- Coin inférieur droit
- Effets de particules animés
