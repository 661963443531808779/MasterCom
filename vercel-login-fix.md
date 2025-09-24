# 🔧 Fix Login Vercel - MasterCom

## ❌ Problème Actuel
- **Vercel** : ✅ Configuration OK mais ❌ Login ne marche pas
- **Local** : ✅ Configuration OK et ✅ Login fonctionne

## 🔍 Diagnostic

### **Étape 1 : Vérifier les Logs**
1. Ouvrez votre site Vercel
2. Appuyez sur **F12** (Console)
3. Regardez les logs qui commencent par :
   - 🔧 Configuration Supabase
   - 🔐 Tentative de connexion
   - 📡 Réponse Supabase

### **Étape 2 : Tester avec le Script**
1. Ouvrez `test-vercel-login.html` dans votre navigateur
2. Cliquez sur **"Tester la Configuration"**
3. Essayez la connexion avec `master@mastercom.fr` / `admin123`
4. Vérifiez les logs dans la console

## 🚀 Solutions Possibles

### **Solution 1 : Variables d'Environnement**
Vérifiez dans Vercel Dashboard :
- **Settings** → **Environment Variables**
- Assurez-vous que les variables sont activées pour **Production**
- Redéployez après modification

### **Solution 2 : Problème de Build**
Le problème peut venir du build Vercel :
```bash
# Testez localement avec le build de production
npm run build
npm run preview
```

### **Solution 3 : Problème Supabase**
Vérifiez dans Supabase Dashboard :
- **Authentication** → **Users**
- L'utilisateur `master@mastercom.fr` existe-t-il ?
- Le mot de passe est-il correct ?

### **Solution 4 : Problème de CORS**
Vérifiez dans Supabase Dashboard :
- **Settings** → **API**
- **Site URL** contient votre domaine Vercel
- **Additional Redirect URLs** contient votre domaine Vercel

## 🔧 Actions à Effectuer

### **1. Vérifier Supabase Dashboard**
```
URL: https://supabase.com/dashboard/project/gpnjamtnogyfvykgdiwd
1. Authentication → Users
2. Vérifier que master@mastercom.fr existe
3. Settings → API → Site URL
4. Ajouter votre domaine Vercel
```

### **2. Vérifier Vercel Dashboard**
```
1. Settings → Environment Variables
2. Vérifier que les 2 variables sont présentes
3. Vérifier qu'elles sont activées pour Production
4. Redéployer si nécessaire
```

### **3. Tester avec les Logs**
```
1. Ouvrir F12 sur votre site Vercel
2. Essayer de se connecter
3. Copier les logs de la console
4. Analyser les erreurs
```

## 📋 Checklist de Vérification

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Variables activées pour Production
- [ ] Application redéployée après modification
- [ ] Utilisateur `master@mastercom.fr` existe dans Supabase
- [ ] Site URL configuré dans Supabase
- [ ] Pas d'erreurs CORS
- [ ] Logs de debug visibles dans la console

## 🎯 Résultat Attendu

**Après correction :**
- ✅ Configuration OK sur Vercel
- ✅ Login fonctionne avec master@mastercom.fr / admin123
- ✅ Accès au Master Panel
- ✅ Thèmes saisonniers accessibles

## 🆘 Si ça ne marche toujours pas

**Envoyez-moi :**
1. Les logs de la console F12
2. Le résultat du test avec `test-vercel-login.html`
3. Les variables d'environnement configurées (sans les valeurs)
4. L'URL de votre site Vercel
