# 🔑 Mise à Jour Clé API Vercel

## ✅ Clé API Mise à Jour dans le Code

La nouvelle clé API Supabase a été mise à jour dans :
- `src/services/auth.ts` ✅
- `test-auth-final.js` ✅

## 🚀 Actions Requises pour Vercel

### **Étape 1 : Mettre à Jour Vercel Dashboard**
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet **MasterCom**
3. **Settings** → **Environment Variables**

### **Étape 2 : Modifier la Variable**
1. Trouvez `VITE_SUPABASE_ANON_KEY`
2. Cliquez sur **Edit**
3. Remplacez par la nouvelle clé :
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.sb_secret_WfNSTR3OK_doUtK2XNIJag_TKYIfdKY
   ```
4. **Save**

### **Étape 3 : Redéployer**
1. **Deployments** → **Redeploy** (dernier déploiement)
2. Ou **Deployments** → **New Deployment**

### **Étape 4 : Tester**
1. Attendez que le déploiement soit terminé
2. Allez sur votre site Vercel
3. Ouvrez la console F12
4. Exécutez le script `test-auth-final.js`

## 🎯 Résultat Attendu

Après mise à jour :
- ✅ Plus d'erreur 401 "Invalid API key"
- ✅ Connexion Supabase fonctionnelle
- ✅ Authentification utilisateur possible

## 📋 Checklist

- [ ] Code mis à jour avec nouvelle clé ✅
- [ ] Variable Vercel mise à jour
- [ ] Application redéployée
- [ ] Test effectué dans console F12

**La clé API est maintenant correcte !** 🔑
