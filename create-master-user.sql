-- Script pour créer l'utilisateur master dans Supabase
-- Exécuter dans Supabase SQL Editor

-- Vérifier si l'utilisateur existe déjà
SELECT * FROM auth.users WHERE email = 'master@mastercom.fr';

-- Si l'utilisateur n'existe pas, le créer
-- Note: Cette commande doit être exécutée dans Supabase Dashboard → Authentication → Users
-- ou via l'API d'authentification

-- Alternative: Créer l'utilisateur via l'interface Supabase
-- 1. Allez dans Supabase Dashboard
-- 2. Authentication → Users
-- 3. "Add user" 
-- 4. Email: master@mastercom.fr
-- 5. Password: admin123
-- 6. Confirmer l'email automatiquement

-- Vérifier les utilisateurs existants
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at,
    last_sign_in_at
FROM auth.users 
ORDER BY created_at DESC;

-- Instructions pour créer l'utilisateur manuellement:
-- 1. Connectez-vous à https://supabase.com/dashboard/project/gpnjamtnogyfvykgdiwd
-- 2. Allez dans "Authentication" → "Users"
-- 3. Cliquez sur "Add user"
-- 4. Remplissez:
--    - Email: master@mastercom.fr
--    - Password: admin123
--    - Confirm email: ✅ (cochez cette case)
-- 5. Cliquez sur "Create user"
