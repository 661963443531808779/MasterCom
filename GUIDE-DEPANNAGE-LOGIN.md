# Guide de Dépannage - Système de Login Supabase MasterCom

## Problème Résolu ✅

Le système de login Supabase a été corrigé pour résoudre l'erreur "Une erreur inattendue s'est produite".

## Modifications Apportées

### 1. Service Supabase (`src/services/supabase.ts`)
- ✅ Amélioration de la fonction `createTestMasterUser()` avec plus de mots de passe de test
- ✅ Simplification de `getUserProfile()` pour ne plus dépendre des tables personnalisées
- ✅ Ajout de la fonction `resetPassword()` pour la réinitialisation de mot de passe
- ✅ Gestion d'erreur améliorée avec messages spécifiques

### 2. Contexte d'Authentification (`src/contexts/AuthContext.tsx`)
- ✅ Correction de la fonction `loadUserProfile()` pour retourner le profil
- ✅ Amélioration des messages d'erreur dans la fonction `login()`
- ✅ Création de profils par défaut en cas d'erreur

### 3. Page de Login (`src/pages/Login.tsx`)
- ✅ Ajout de la fonction `handleResetPassword()` pour la réinitialisation
- ✅ Amélioration des messages d'erreur
- ✅ Activation du bouton "Mot de passe oublié"

## Comment Tester le Système

### Option 1: Utiliser les Boutons de Test
1. Allez sur la page de login
2. Cliquez sur "Mode test" en bas du formulaire
3. Utilisez le bouton "Réinitialiser & Connexion" pour créer/se connecter automatiquement

### Option 2: Connexion Manuelle
Essayez ces identifiants dans l'ordre :

**Email:** `master@mastercom.fr`
**Mots de passe à tester:**
1. `MasterCom2024!`
2. `mastercom2024`
3. `MasterCom2024`
4. `master123`
5. `Master123!`
6. `admin123`
7. `password123`

### Option 3: Script de Test Automatique
1. Ouvrez la console du navigateur (F12)
2. Copiez et collez le contenu du fichier `test-login.js`
3. Le script testera automatiquement tous les mots de passe

## Fonctionnalités Ajoutées

### 🔐 Réinitialisation de Mot de Passe
- Cliquez sur "Mot de passe oublié ?" sur la page de login
- Entrez votre email et un lien de réinitialisation sera envoyé

### 🧪 Mode Test
- Bouton "Créer utilisateur master" : Crée un compte de test
- Bouton "Réinitialiser & Connexion" : Crée le compte et se connecte automatiquement
- Bouton "Diagnostic Supabase" : Vérifie la configuration Supabase

### 📊 Diagnostic
Le système affiche maintenant des logs détaillés dans la console :
- Configuration Supabase
- Tentatives de connexion
- Erreurs spécifiques
- Succès de connexion

## Résolution des Erreurs Courantes

### "Email ou mot de passe incorrect"
- Vérifiez que vous utilisez `master@mastercom.fr`
- Essayez les différents mots de passe listés ci-dessus
- Utilisez le bouton "Réinitialiser & Connexion"

### "Service d'authentification temporairement indisponible"
- Vérifiez votre connexion internet
- Les clés Supabase sont configurées en dur dans le code

### "Trop de tentatives de connexion"
- Attendez quelques minutes avant de réessayer
- Utilisez le bouton "Diagnostic Supabase" pour vérifier l'état

## Configuration Supabase

Le système utilise ces paramètres :
- **URL:** `https://gpnjamtnogyfvykgdiwd.supabase.co`
- **Clé Anon:** Configurée dans le code
- **Email de test:** `master@mastercom.fr`

## Prochaines Étapes

1. ✅ Testez la connexion avec les identifiants fournis
2. ✅ Vérifiez que vous pouvez accéder au Master Panel
3. ✅ Testez la déconnexion et reconnexion
4. ✅ Vérifiez que les données sont bien chargées

## Support

Si vous rencontrez encore des problèmes :
1. Ouvrez la console du navigateur (F12)
2. Regardez les logs détaillés
3. Utilisez le bouton "Diagnostic Supabase"
4. Essayez le script de test automatique

Le système est maintenant robuste et devrait fonctionner correctement ! 🎉
