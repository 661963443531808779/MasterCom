# 🔧 Configuration Supabase - MasterCom

## Problème de Connexion Détecté

L'erreur `ERR_NAME_NOT_RESOLVED` indique que l'URL Supabase ne peut pas être résolue.

## Solutions

### 1. Vérifier l'URL Supabase

L'URL actuelle dans le code : `https://gpnjamtnogyfvykgdiwd.supabase.co`

**Vérifiez que cette URL est correcte :**
1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings > API**
4. Copiez l'URL exacte

### 2. Créer un fichier `.env.local`

Créez un fichier `.env.local` à la racine du projet :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Vérifier la Clé API

1. Dans Supabase Dashboard > Settings > API
2. Copiez la clé **anon public** (pas la service_role)
3. Collez-la dans `.env.local`

### 4. Redémarrer le serveur

```bash
npm run dev
```

## Diagnostic Automatique

Le système inclut maintenant un diagnostic automatique qui :
- ✅ Teste la connectivité DNS
- ✅ Vérifie les variables d'environnement
- ✅ Teste l'API Supabase
- ✅ Propose des solutions

## URLs Supabase Alternatives

Si l'URL actuelle ne fonctionne pas, essayez :

1. **Vérifier dans Supabase Dashboard** que le projet existe
2. **Vérifier que le projet n'est pas suspendu**
3. **Essayer une nouvelle URL** si nécessaire

## Support

Si le problème persiste :
1. Utilisez le **Diagnostic de Connexion** dans l'interface
2. Vérifiez votre connexion internet
3. Contactez l'administrateur Supabase
