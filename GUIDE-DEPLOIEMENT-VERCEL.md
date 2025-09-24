# 🚀 Guide de Déploiement Vercel - MasterCom

## ❌ Problème : Login fonctionne en local mais pas sur Vercel

### 🔍 Causes Possibles

1. **Variables d'environnement manquantes**
2. **Configuration Supabase différente**
3. **Problèmes de CORS**
4. **Cache de build**

## ✅ Solutions

### 1. Configurer les Variables d'Environnement

**Dans Vercel Dashboard :**
1. Allez dans votre projet Vercel
2. Cliquez sur **Settings**
3. Cliquez sur **Environment Variables**
4. Ajoutez ces variables pour **Production**, **Preview** et **Development** :

```
VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A
```

### 2. Vérifier la Configuration Supabase

**Dans Supabase Dashboard :**
1. Allez dans **Settings** > **API**
2. Vérifiez que l'URL et la clé anonyme sont correctes
3. Dans **Authentication** > **URL Configuration**, ajoutez votre domaine Vercel :
   - `https://votre-projet.vercel.app`
   - `https://votre-projet-git-main.vercel.app`

### 3. Redéployer l'Application

**Après avoir ajouté les variables d'environnement :**
1. Allez dans **Deployments**
2. Cliquez sur **Redeploy** sur le dernier déploiement
3. Ou faites un nouveau commit pour déclencher un nouveau déploiement

### 4. Vérifier les Logs

**Dans Vercel Dashboard :**
1. Allez dans **Functions** ou **Deployments**
2. Cliquez sur le dernier déploiement
3. Vérifiez les logs pour des erreurs

## 🔧 Diagnostic

### Console du Navigateur (F12)
```javascript
// Testez la configuration
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Présent' : 'Manquant');

// Testez la connexion
fetch('https://gpnjamtnogyfvykgdiwd.supabase.co/rest/v1/', {
  headers: { 'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A' }
})
.then(r => console.log('Connexion:', r.ok ? 'OK' : 'Erreur'))
.catch(e => console.error('Erreur:', e));
```

## 🎯 Checklist de Déploiement

- [ ] Variables d'environnement configurées dans Vercel
- [ ] Domaines ajoutés dans Supabase Auth
- [ ] Application redéployée
- [ ] Logs vérifiés
- [ ] Test de connexion effectué

## 🆘 Si le problème persiste

1. **Vérifiez les erreurs réseau** dans F12 > Network
2. **Testez avec un compte différent**
3. **Vérifiez les politiques RLS** dans Supabase
4. **Contactez le support** avec les logs d'erreur

---

**Note :** Le code a été modifié pour utiliser les variables d'environnement avec des fallbacks, ce qui devrait résoudre la plupart des problèmes de déploiement.
