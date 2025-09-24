# 🔑 Fix API Key Supabase - Erreur 401

## ❌ Problème : "Invalid API key"

L'erreur `401 Unauthorized` avec `Invalid API key` indique que la clé API Supabase n'est pas correcte.

## 🚀 Solution : Récupérer la Nouvelle Clé API

### **Étape 1 : Aller dans Supabase Dashboard**
1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous et sélectionnez votre projet **MasterCom**

### **Étape 2 : Récupérer la Clé API**
1. **Settings** → **API** (menu de gauche)
2. Dans la section **"Project API keys"**
3. Copiez la **"anon public"** key (pas la service_role)

### **Étape 3 : Mettre à Jour le Code**
Remplacez l'ancienne clé dans `src/services/auth.ts` :

```typescript
const SUPABASE_ANON_KEY = 'VOTRE_NOUVELLE_CLE_ICI';
```

### **Étape 4 : Mettre à Jour Vercel**
1. **Vercel Dashboard** → Votre projet
2. **Settings** → **Environment Variables**
3. Modifiez `VITE_SUPABASE_ANON_KEY` avec la nouvelle clé
4. **Redéployez** l'application

### **Étape 5 : Tester**
1. Exécutez le script `test-auth-final.js` dans la console F12
2. Vérifiez que l'erreur 401 a disparu

## 🔍 **Vérifications Supplémentaires**

### **Dans Supabase Dashboard :**
- **Settings** → **API** → Vérifiez que l'URL est correcte
- **Authentication** → **Settings** → Vérifiez les configurations

### **Dans Vercel Dashboard :**
- **Settings** → **Environment Variables**
- Vérifiez que les variables sont activées pour **Production**

## 📋 **Checklist**

- [ ] Nouvelle clé API récupérée dans Supabase
- [ ] Code mis à jour avec la nouvelle clé
- [ ] Variables Vercel mises à jour
- [ ] Application redéployée
- [ ] Test effectué dans la console F12

## 🎯 **Résultat Attendu**

Après correction :
- ✅ Plus d'erreur 401
- ✅ Connexion Supabase fonctionnelle
- ✅ Authentification utilisateur possible

**La clé API doit être mise à jour !** 🔑
