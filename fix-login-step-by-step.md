# 🔐 Fix Login - Guide Étape par Étape

## ❌ Problème : "Email ou mot de passe incorrect" malgré les bons identifiants

### 🎯 **Solution 1 : Créer l'Utilisateur Master**

**Le problème principal :** L'utilisateur `master@mastercom.fr` n'existe probablement pas dans Supabase.

#### **Étapes dans Supabase Dashboard :**
1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous et sélectionnez votre projet **MasterCom**
3. **Authentication** → **Users**
4. **Add user** (bouton bleu en haut à droite)
5. Remplissez :
   ```
   Email: master@mastercom.fr
   Password: admin123
   Confirm email: ✅ (cochez cette case)
   ```
6. **Create user**

### 🎯 **Solution 2 : Utiliser le Script Vercel**

**Le script `test-vercel-direct.js` sert à diagnostiquer le problème sur Vercel.**

#### **Comment l'utiliser :**
1. **Ouvrez votre site Vercel** (pas local)
2. **Appuyez sur F12** (outils de développement)
3. **Cliquez sur l'onglet "Console"**
4. **Copiez tout le contenu** du fichier `test-vercel-direct.js`
5. **Collez dans la console** et appuyez sur Entrée
6. **Regardez les résultats** et copiez-moi tout

#### **Ce que le script va vous dire :**
- ✅ Si la connexion Supabase fonctionne
- ❌ Quelle erreur exacte se produit
- 🔧 Si les variables d'environnement sont correctes
- 📊 Le détail de la réponse Supabase

### 🎯 **Solution 3 : Vérifier les Variables Vercel**

**Dans Vercel Dashboard :**
1. **Settings** → **Environment Variables**
2. Vérifiez que ces 2 variables existent :
   ```
   VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV5kh4A
   ```
3. Vérifiez qu'elles sont activées pour **Production**
4. **Redéployez** si vous les avez modifiées

### 🎯 **Solution 4 : Test Direct Supabase**

**Pour vérifier si l'utilisateur existe :**
1. Allez dans **Supabase Dashboard**
2. **Authentication** → **Users**
3. Cherchez `master@mastercom.fr`
4. Si il n'existe pas → **Créez-le** (Solution 1)
5. Si il existe → Vérifiez le mot de passe

### 📋 **Checklist de Vérification**

- [ ] Utilisateur `master@mastercom.fr` créé dans Supabase
- [ ] Mot de passe `admin123` correct
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Variables activées pour Production
- [ ] Application redéployée après modification
- [ ] Script de test exécuté dans la console F12

### 🚨 **Actions Immédiates**

1. **Créez l'utilisateur** dans Supabase (Solution 1)
2. **Exécutez le script** dans la console F12 (Solution 2)
3. **Envoyez-moi les résultats** du script

### 💡 **Pourquoi ça marche en local mais pas sur Vercel ?**

- **Local :** Utilise les valeurs par défaut dans le code
- **Vercel :** Utilise les variables d'environnement
- **Si les variables sont mal configurées** → Erreur de connexion

**Le script va nous dire exactement où est le problème !** 🔍
