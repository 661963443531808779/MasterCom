# 🔑 Récupérer la VRAIE Clé API Supabase

## ❌ Problème : Mauvaise Clé API

La clé `sb_secret_WfNSTR3OK_doUtK2XNIJag_TKYIfdKY` n'est **PAS** la clé API anon de Supabase.

## 🚀 Solution : Récupérer la Bonne Clé

### **Étape 1 : Aller dans Supabase Dashboard**
1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous et sélectionnez votre projet **MasterCom**

### **Étape 2 : Aller dans Settings → API**
1. **Settings** (menu de gauche)
2. **API** (dans le menu Settings)

### **Étape 3 : Copier la Clé "anon public"**
Dans la section **"Project API keys"**, vous verrez :

```
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.XXXXXXXXXXXX
```

**Copiez TOUTE la clé qui commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`**

### **Étape 4 : Vérifier la Clé**
La clé doit :
- ✅ Commencer par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- ✅ Être très longue (plus de 100 caractères)
- ✅ Se terminer par une signature JWT

### **Étape 5 : Envoyer la Clé**
Une fois que vous avez la **vraie** clé anon public, envoyez-la moi pour que je mette à jour le code.

## 🔍 **Différence entre les Clés**

- ❌ **Clé Secrète** : `sb_secret_...` (pour les opérations admin)
- ✅ **Clé Anon Public** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (pour l'authentification)

## 📋 **Checklist**

- [ ] Aller dans Supabase Dashboard
- [ ] Settings → API
- [ ] Copier la clé "anon public" complète
- [ ] Vérifier qu'elle commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- [ ] Envoyer la clé complète

**Il faut la clé "anon public", pas la clé secrète !** 🔑
