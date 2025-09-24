# Guide de Connexion MasterCom

## 🔑 Identifiants de Connexion

**Email :** `master@mastercom.fr`  
**Mot de passe :** `admin123`

## 🚀 Comment Se Connecter

### Option 1: Connexion Manuelle
1. Allez sur `/login`
2. Entrez `master@mastercom.fr` dans le champ email
3. Entrez `admin123` dans le champ mot de passe
4. Cliquez sur "Accéder au Studio"

### Option 2: Connexion Automatique
1. Allez sur `/login`
2. Cliquez sur "Mode test"
3. Cliquez sur **"Connexion admin123"** (bouton bleu)
4. Le système se connecte automatiquement

### Option 3: Test dans la Console
1. Ouvrez la console du navigateur (F12)
2. Copiez et collez le contenu de `test-login.js`
3. Appuyez sur Entrée
4. Le script teste la connexion et affiche le résultat

## 🔧 Fonctionnalités Disponibles

### Service auth.ts
- ✅ `login(email, password)` - Connexion simple
- ✅ `logout()` - Déconnexion
- ✅ `getCurrentUser()` - Obtenir l'utilisateur actuel
- ✅ `loginWithAdmin123()` - Connexion avec admin123
- ✅ `testConnection()` - Test de connexion

### Page LoginPage.tsx
- ✅ Formulaire de connexion standard
- ✅ Bouton "Connexion admin123" pour connexion automatique
- ✅ Bouton "Test Connexion" pour diagnostic
- ✅ Gestion d'erreur simplifiée

## 🚨 Si la Connexion Échoue

### Vérification 1: Compte Existe-t-il ?
1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Authentication > Users
3. Cherchez `master@mastercom.fr`
4. Si le compte n'existe pas, créez-le manuellement

### Vérification 2: Mot de Passe Correct ?
1. Dans Supabase Dashboard
2. Cliquez sur l'utilisateur `master@mastercom.fr`
3. Vérifiez que le mot de passe est bien `admin123`
4. Si nécessaire, réinitialisez le mot de passe

### Vérification 3: Configuration Supabase
1. Vérifiez que l'authentification email est activée
2. Vérifiez que les clés API sont correctes
3. Vérifiez que le projet est actif

## 📝 Création de Compte (Manuelle)

Si le compte n'existe pas, créez-le manuellement dans Supabase Dashboard :

1. **Allez sur** [Supabase Dashboard](https://supabase.com/dashboard)
2. **Sélectionnez** votre projet MasterCom
3. **Allez dans** Authentication > Users
4. **Cliquez sur** "Add user"
5. **Entrez** :
   - Email: `master@mastercom.fr`
   - Password: `admin123`
   - Confirm password: `admin123`
   - Email confirm: ✅ (cochez cette case)
6. **Cliquez sur** "Create user"

## 🎯 Résultat Attendu

Après une connexion réussie, vous devriez voir :
```
✅ Connexion réussie avec master@mastercom.fr / admin123
- Token: Présent
- User ID: [uuid]
- Email: master@mastercom.fr
```

## 🚀 Avantages du Système Simplifié

1. **Simple** : Code propre et minimal
2. **Direct** : Connexion directe avec Supabase
3. **Fiable** : Utilise uniquement les API Supabase officielles
4. **Maintenable** : Code facile à comprendre et maintenir
5. **Sécurisé** : Pas de création de compte automatique

## 📞 Support

Si le problème persiste :
1. **Exécutez** le script `test-login.js`
2. **Vérifiez** Supabase Dashboard pour le compte `master@mastercom.fr`
3. **Créez** le compte manuellement si nécessaire
4. **Vérifiez** les paramètres de votre projet Supabase

## 🎉 Résumé

Le système est maintenant **ultra-simplifié** :
- ✅ **Code propre et minimal**
- ✅ **Connexion directe avec Supabase**
- ✅ **Mot de passe configuré : admin123**
- ✅ **Interface simple et claire**
- ✅ **Test de connexion intégré**

**Le système devrait maintenant fonctionner parfaitement avec master@mastercom.fr / admin123 !** 🚀
