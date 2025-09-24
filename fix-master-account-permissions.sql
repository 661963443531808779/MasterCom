-- =====================================================
-- CORRECTION DES PERMISSIONS DU COMPTE MASTER
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script s'assure que le compte master a les bonnes permissions

-- =====================================================
-- 1. VÉRIFIER ET CRÉER LA TABLE USERS SI NÉCESSAIRE
-- =====================================================

-- Créer la table users si elle n'existe pas
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'commercial' CHECK (role IN ('master', 'commercial')),
  status VARCHAR(50) DEFAULT 'active',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur la table users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON users;

-- Créer une politique RLS permissive (pour le développement)
CREATE POLICY "Enable all operations for authenticated users" ON users
  FOR ALL USING (auth.role() = 'authenticated');

-- =====================================================
-- 2. INSÉRER/METTRE À JOUR LE COMPTE MASTER
-- =====================================================

-- Mettre à jour le compte master existant avec l'email master@mastercom.fr
UPDATE users 
SET 
  email = 'master@mastercom.fr',
  first_name = 'Master',
  last_name = 'Admin',
  role = 'master',
  status = 'active',
  updated_at = NOW()
WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c';

-- Si aucun enregistrement n'a été mis à jour, insérer un nouveau compte
INSERT INTO users (id, email, first_name, last_name, role, status, created_by) 
SELECT 
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c',
  'master@mastercom.fr',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
);

-- Insérer aussi le compte master@mastercom.com pour compatibilité
INSERT INTO users (email, first_name, last_name, role, status, created_by) 
VALUES (
  'master@mastercom.com',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
) ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 3. VÉRIFIER LES COMPTES MASTER
-- =====================================================

-- Afficher tous les comptes master
SELECT 
  'Comptes Master dans la table users:' as message,
  email,
  role,
  status,
  created_at
FROM users 
WHERE role = 'master'
ORDER BY created_at DESC;

-- =====================================================
-- 4. CRÉER UN INDEX POUR AMÉLIORER LES PERFORMANCES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =====================================================
-- 5. MESSAGE DE CONFIRMATION
-- =====================================================

SELECT '✅ Permissions du compte master corrigées avec succès!' as result;
SELECT '✅ Table users créée/mise à jour' as details;
SELECT '✅ Compte master@mastercom.fr configuré' as master_account;
SELECT '✅ Politiques RLS activées' as security;
