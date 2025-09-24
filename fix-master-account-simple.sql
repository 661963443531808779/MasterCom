-- =====================================================
-- CORRECTION SIMPLE DU COMPTE MASTER
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script corrige le compte master sans créer de doublons

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
-- 2. CORRIGER LE COMPTE MASTER EXISTANT
-- =====================================================

-- Mettre à jour le compte existant avec l'UUID aa72e089-7ae9-4fe6-bae1-04cce09df80c
UPDATE users 
SET 
  email = 'master@mastercom.fr',
  first_name = 'Master',
  last_name = 'Admin',
  role = 'master',
  status = 'active',
  updated_at = NOW()
WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c';

-- =====================================================
-- 3. AJOUTER UN COMPTE MASTER ALTERNATIF SI NÉCESSAIRE
-- =====================================================

-- Ajouter master@mastercom.com si il n'existe pas déjà
INSERT INTO users (email, first_name, last_name, role, status, created_by) 
SELECT 
  'master@mastercom.com',
  'Master',
  'Admin',
  'master',
  'active',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
WHERE NOT EXISTS (
  SELECT 1 FROM users WHERE email = 'master@mastercom.com'
);

-- =====================================================
-- 4. VÉRIFICATION FINALE
-- =====================================================

-- Afficher tous les comptes master
SELECT 
  'Comptes Master configurés:' as message,
  id,
  email,
  role,
  status,
  updated_at
FROM users 
WHERE role = 'master'
ORDER BY updated_at DESC;

-- =====================================================
-- 5. CRÉER LES INDEX POUR LES PERFORMANCES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Message de confirmation
SELECT '✅ Compte master corrigé avec succès!' as result;
SELECT '✅ Email master@mastercom.fr configuré' as details;
SELECT '✅ Rôle master attribué' as role_status;
