# 🔧 Configuration Variables d'Environnement Vercel

## 📋 Variables à Configurer dans Vercel

### 1. **Accéder au Dashboard Vercel**
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet `master-com`
4. Allez dans **Settings** → **Environment Variables**

### 2. **Variables OBLIGATOIRES**

#### **VITE_SUPABASE_URL**
```
Nom: VITE_SUPABASE_URL
Valeur: https://gpnjamtnogyfvykgdiwd.supabase.co
Environnements: Production, Preview, Development
```

#### **VITE_SUPABASE_ANON_KEY**
```
Nom: VITE_SUPABASE_ANON_KEY
Valeur: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A
Environnements: Production, Preview, Development
```

### 3. **Variables OPTIONNELLES (Performance)**

#### **VITE_TIMEOUT**
```
Nom: VITE_TIMEOUT
Valeur: 5000
Environnements: Production, Preview, Development
```

#### **VITE_RETRY_ATTEMPTS**
```
Nom: VITE_RETRY_ATTEMPTS
Valeur: 3
Environnements: Production, Preview, Development
```

#### **VITE_CACHE_DURATION**
```
Nom: VITE_CACHE_DURATION
Valeur: 60000
Environnements: Production, Preview, Development
```

### 4. **Configuration Automatique**

Vercel configure automatiquement :
- `NODE_ENV=production`
- `VERCEL=1`
- `VERCEL_ENV=production`

## 🚀 Étapes de Configuration

### **Étape 1 : Ajouter les Variables**
1. Dans le dashboard Vercel, cliquez sur **"Add New"**
2. Ajoutez chaque variable avec son nom et sa valeur
3. Cochez **Production**, **Preview**, et **Development**
4. Cliquez sur **"Save"**

### **Étape 2 : Redéployer**
1. Allez dans **Deployments**
2. Cliquez sur les **"..."** du dernier déploiement
3. Sélectionnez **"Redeploy"**
4. Attendez que le déploiement se termine

### **Étape 3 : Vérifier**
1. Visitez https://master-com.vercel.app/
2. Ouvrez la console du navigateur (F12)
3. Vérifiez qu'il n'y a pas d'erreurs
4. Testez la connexion

## 🔍 Vérification

### **Console du Navigateur**
Vous devriez voir :
```
✅ Supabase initialisé dans App.tsx
🚀 App MasterCom - Version complète
🔍 Vérification de l'authentification...
✅ Chargement terminé
```

### **Si Problème**
Si vous voyez encore des erreurs :
```
⚠️ Erreur initialisation Supabase dans App.tsx
```
Cela signifie que les variables d'environnement ne sont pas correctement configurées.

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez que les variables sont bien configurées
2. Vérifiez que le déploiement est terminé
3. Videz le cache du navigateur
4. Attendez quelques minutes pour la propagation

## ✅ Résultat Attendu

Après configuration, votre site devrait :
- ✅ Se charger sans page blanche
- ✅ Afficher la page d'accueil MasterCom
- ✅ Permettre la navigation
- ✅ Fonctionner avec Supabase (si configuré)

**Votre site MasterCom sera alors 100% fonctionnel !** 🎉
