-- =====================================================
-- CRÉATION DE LA TABLE UTILISATEURS - MASTERCOM
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Table des utilisateurs
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

-- Activer RLS sur la table des utilisateurs
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON users;

-- Créer une politique RLS permissive (pour le développement)
CREATE POLICY "Enable all operations for authenticated users" ON users
  FOR ALL USING (auth.role() = 'authenticated');

-- Insérer l'utilisateur master existant
INSERT INTO users (id, email, first_name, last_name, role, status, created_by) 
VALUES (
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c',
  'master@mastercom.com',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
) ON CONFLICT (id) DO NOTHING;

-- Ajouter une contrainte CHECK pour valider les rôles (si elle n'existe pas déjà)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'users_role_check' 
    AND table_name = 'users'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_role_check 
    CHECK (role IN ('master', 'commercial'));
  END IF;
END $$;

-- Message de confirmation
SELECT '🎉 Table utilisateurs créée avec succès!' as message;
SELECT '✅ Utilisateur master ajouté' as details;
SELECT '✅ Politiques RLS activées' as security;
