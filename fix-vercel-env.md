# 🔧 Fix Vercel Environment Variables

## ❌ Problème Actuel
- **Local** : ✅ Configuration OK
- **Production** : ❌ Variables d'environnement manquantes

## 🚀 Solution : Configuration Vercel

### **Étape 1 : Accéder à Vercel Dashboard**
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte
3. Sélectionnez votre projet **MasterCom**

### **Étape 2 : Configurer les Variables**
1. Cliquez sur **Settings** (onglet en haut)
2. Cliquez sur **Environment Variables** (menu de gauche)
3. Cliquez sur **Add New**

### **Étape 3 : Ajouter la Première Variable**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://gpnjamtnogyfvykgdiwd.supabase.co`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Cliquez **Save**

### **Étape 4 : Ajouter la Deuxième Variable**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A`
- **Environment:** ✅ Production ✅ Preview ✅ Development
- Cliquez **Save**

### **Étape 5 : Redéployer**
1. Allez dans l'onglet **Deployments**
2. Cliquez sur **Redeploy** sur le dernier déploiement
3. Attendez que le déploiement se termine

## ✅ Vérification

**Après redéploiement :**
- Le message "❌ Variables d'environnement manquantes" doit disparaître
- La connexion avec `master@mastercom.fr` doit fonctionner
- Les thèmes saisonniers doivent être accessibles

## 🔍 Debug si ça ne marche pas

### **Vérifier dans Vercel :**
1. **Settings** → **Environment Variables**
2. Vérifiez que les 2 variables sont bien présentes
3. Vérifiez qu'elles sont activées pour **Production**

### **Vérifier dans le Code :**
Le code vérifie les variables avec :
```typescript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A';
```

**Si les variables ne sont pas définies, les valeurs par défaut sont utilisées.**

## 🎯 Résultat Attendu

**Après configuration :**
- ✅ **Production** : Configuration OK
- ✅ **Local** : Configuration OK
- ✅ **Connexion** : Fonctionne partout
- ✅ **Thèmes** : Accessibles partout
