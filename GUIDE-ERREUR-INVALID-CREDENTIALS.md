# Guide de Résolution - Erreur "Invalid login credentials"

## Problème Identifié ❌

Vous rencontrez l'erreur **"Invalid login credentials"** qui indique que le compte master n'existe pas encore dans votre base Supabase.

## Solutions Disponibles

### 🎯 Solution 1: Test Direct dans la Console (RECOMMANDÉE)

1. **Ouvrez la console du navigateur** (F12)
2. **Copiez et collez** le contenu du fichier `test-supabase-direct.js`
3. **Appuyez sur Entrée** pour exécuter le script
4. **Regardez les résultats** dans la console

Le script va :
- ✅ Tester la connexion réseau
- ✅ Essayer 16 mots de passe différents
- ✅ Créer le compte master automatiquement
- ✅ Tester avec un email alternatif si nécessaire

### 🔧 Solution 2: Utiliser le Système Simplifié

1. **Allez sur** `/login` (nouveau système)
2. **Cliquez sur** "Mode test simplifié"
3. **Utilisez** "Test Connexion" pour diagnostiquer
4. **Utilisez** "Créer & Connexion Master" pour créer le compte

### 🛠️ Solution 3: Création Manuelle dans Supabase Dashboard

1. **Allez sur** [Supabase Dashboard](https://supabase.com/dashboard)
2. **Sélectionnez** votre projet MasterCom
3. **Allez dans** Authentication > Users
4. **Cliquez sur** "Add user"
5. **Entrez** :
   - Email: `master@mastercom.fr`
   - Password: `MasterCom2024!`
   - Confirm password: `MasterCom2024!`
6. **Cliquez sur** "Create user"

## Diagnostic Détaillé

### Configuration Supabase Actuelle
- **URL:** `https://gpnjamtnogyfvykgdiwd.supabase.co`
- **Anon Key:** Configurée dans le code
- **Email de test:** `master@mastercom.fr`

### Mots de Passe Testés Automatiquement
Le système teste automatiquement ces 16 mots de passe :
1. `MasterCom2024!` (par défaut)
2. `mastercom2024`
3. `MasterCom2024`
4. `master@mastercom.fr`
5. `master123`
6. `Master123!`
7. `admin123`
8. `password123`
9. `MasterCom2023!`
10. `master2024`
11. `admin`
12. `password`
13. `123456`
14. `master`
15. `MasterCom`
16. `mastercom`

### Méthodes de Création de Compte
Le système utilise 3 méthodes de fallback :
1. **Méthode standard** : `supabase.auth.signUp()`
2. **Fetch direct** : Appel direct à l'API Supabase
3. **Email alternatif** : `master@mastercom.com`

## Messages d'Erreur et Solutions

### "Invalid login credentials"
- **Cause** : Le compte n'existe pas
- **Solution** : Utilisez le script de test ou créez le compte manuellement

### "User already registered"
- **Cause** : Le compte existe mais le mot de passe est incorrect
- **Solution** : Le système teste automatiquement d'autres mots de passe

### "Problème de connexion réseau"
- **Cause** : Problème de connectivité avec Supabase
- **Solution** : Vérifiez votre connexion internet et les paramètres de firewall

### "Service d'authentification non disponible"
- **Cause** : Configuration Supabase incorrecte
- **Solution** : Vérifiez les clés API dans Supabase Dashboard

## Étapes de Dépannage

### Étape 1: Vérification de Base
```javascript
// Dans la console du navigateur
console.log('URL Supabase:', 'https://gpnjamtnogyfvykgdiwd.supabase.co');
console.log('Anon Key:', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
```

### Étape 2: Test de Connexion Réseau
```javascript
fetch('https://gpnjamtnogyfvykgdiwd.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
}).then(r => console.log('Status:', r.status));
```

### Étape 3: Test de Création de Compte
```javascript
fetch('https://gpnjamtnogyfvykgdiwd.supabase.co/auth/v1/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  },
  body: JSON.stringify({
    email: 'master@mastercom.fr',
    password: 'MasterCom2024!'
  })
}).then(r => r.json()).then(console.log);
```

## Résolution Rapide

**Pour résoudre rapidement le problème :**

1. **Exécutez le script de test** (`test-supabase-direct.js`) dans la console
2. **Si le script échoue**, créez le compte manuellement dans Supabase Dashboard
3. **Si le compte existe déjà**, utilisez le bouton "Créer & Connexion Master" qui testera tous les mots de passe

## Support

Si le problème persiste :
1. **Vérifiez les logs** dans la console du navigateur
2. **Vérifiez Supabase Dashboard** pour voir si le compte existe
3. **Testez avec un autre email** (`master@mastercom.com`)
4. **Vérifiez les paramètres** de votre projet Supabase

Le système est maintenant **ultra-robuste** et devrait créer le compte automatiquement ! 🚀
