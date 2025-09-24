# 🔐 Guide de Debug Login - MasterCom

## 🚨 Problème : Impossible de se connecter

### 📋 **Étapes de Diagnostic**

#### **1. Ouvrir la Console (F12)**
1. Allez sur votre site (local ou Vercel)
2. Appuyez sur **F12** pour ouvrir les outils de développement
3. Cliquez sur l'onglet **Console**
4. Essayez de vous connecter avec `master@mastercom.fr` / `admin123`
5. Regardez les logs qui apparaissent

#### **2. Logs à Chercher**
Vous devriez voir des logs comme :
```
🔧 Configuration Supabase: { url: "...", hasKey: true, ... }
🔐 Tentative de connexion: { email: "master@mastercom.fr" }
📡 Réponse Supabase: { hasData: true, hasUser: true, ... }
```

#### **3. Erreurs Possibles**
- ❌ `Invalid login credentials` → Email/mot de passe incorrect
- ❌ `Email not confirmed` → Email non confirmé
- ❌ `Too many requests` → Trop de tentatives
- ❌ `Configuration Supabase` → Problème de variables d'environnement

### 🔧 **Solutions par Type d'Erreur**

#### **Erreur : "Invalid login credentials"**
**Cause :** Email ou mot de passe incorrect
**Solution :**
1. Vérifiez l'email : `master@mastercom.fr` (exactement)
2. Vérifiez le mot de passe : `admin123` (exactement)
3. Vérifiez dans Supabase Dashboard → Authentication → Users

#### **Erreur : "Email not confirmed"**
**Cause :** Email non confirmé dans Supabase
**Solution :**
1. Allez dans Supabase Dashboard
2. Authentication → Users
3. Trouvez `master@mastercom.fr`
4. Cliquez sur "Confirm" si nécessaire

#### **Erreur : "Configuration Supabase"**
**Cause :** Variables d'environnement manquantes
**Solution :**
1. **Local :** Créez un fichier `.env.local` avec :
   ```
   VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A
   ```

2. **Vercel :** Vérifiez dans Settings → Environment Variables

#### **Erreur : "Too many requests"**
**Cause :** Trop de tentatives de connexion
**Solution :** Attendez 5-10 minutes avant de réessayer

### 🎯 **Test Rapide**

#### **Option 1 : Test avec le Script HTML**
1. Ouvrez `test-vercel-login.html` dans votre navigateur
2. Cliquez sur "Tester la Configuration"
3. Essayez la connexion
4. Regardez les résultats

#### **Option 2 : Test Direct Supabase**
1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous à votre projet
3. Authentication → Users
4. Vérifiez que `master@mastercom.fr` existe
5. Testez la connexion directement

### 📞 **Informations à Me Donner**

Si ça ne marche toujours pas, envoyez-moi :
1. **Les logs de la console F12** (copiez-collez tout)
2. **Le message d'erreur exact** affiché
3. **Local ou Vercel** ? (où vous testez)
4. **Les identifiants utilisés** (email/mot de passe)

### 🔍 **Vérifications Rapides**

- [ ] Email : `master@mastercom.fr` (exactement)
- [ ] Mot de passe : `admin123` (exactement)
- [ ] Console F12 ouverte
- [ ] Logs de debug visibles
- [ ] Pas de bloqueur de pub qui interfère
- [ ] Connexion internet stable

### 🚀 **Solution d'Urgence**

Si rien ne marche, essayez :
1. **Vider le cache** du navigateur (Ctrl+F5)
2. **Mode incognito** pour tester
3. **Autre navigateur** (Chrome, Firefox, Edge)
4. **Redémarrer** le serveur de développement
