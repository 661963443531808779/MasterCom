# Configuration Supabase pour MasterCom

## Variables d'environnement requises

Créez un fichier `.env.local` dans la racine du projet avec les variables suivantes :

```env
# Configuration Supabase
VITE_SUPABASE_URL=https://gpnjamtnogyfvykgdiwd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A

# Configuration de performance
VITE_TIMEOUT=5000
VITE_RETRY_ATTEMPTS=3
VITE_CACHE_DURATION=60000

# Mode de développement
VITE_DEV_MODE=true
```

## Fonctionnalités restaurées

✅ **Authentification Supabase complète**
- Connexion/déconnexion sécurisée
- Gestion des sessions persistantes
- Protection des routes privées

✅ **Dashboard fonctionnel**
- KPIs en temps réel
- Graphiques interactifs
- Statistiques des projets et clients

✅ **CRM complet**
- Gestion des clients
- Gestion des factures
- Gestion des devis
- Gestion des projets
- Système de tickets de support

✅ **Navigation sécurisée**
- Redirection automatique après connexion
- Protection des routes sensibles
- Gestion des rôles utilisateur

## Utilisation

1. **Démarrer l'application** :
   ```bash
   npm run dev
   ```

2. **Se connecter** :
   - Accédez à `/login`
   - Utilisez vos identifiants Supabase
   - Redirection automatique vers le dashboard

3. **Accéder au CRM** :
   - Cliquez sur "CRM" dans la navigation
   - Gestion complète des clients, factures, devis et projets

4. **Dashboard** :
   - Vue d'ensemble des KPIs
   - Graphiques d'évolution
   - Activité récente

## Structure de la base de données

L'application utilise les tables suivantes dans Supabase :
- `user_profiles` - Profils utilisateur avec rôles
- `clients` - Gestion des clients
- `projects` - Gestion des projets
- `invoices` - Gestion des factures
- `quotes` - Gestion des devis
- `support_tickets` - Tickets de support

## Sécurité

- Authentification sécurisée via Supabase Auth
- Protection CSRF
- Sanitisation des données d'entrée
- Validation des formulaires
- Gestion des rôles et permissions
