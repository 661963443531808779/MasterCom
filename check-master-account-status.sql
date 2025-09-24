-- =====================================================
-- VÉRIFICATION DU STATUT DU COMPTE MASTER
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script vérifie l'état actuel du compte master

-- =====================================================
-- 1. VÉRIFIER LA TABLE USERS
-- =====================================================

-- Vérifier si la table users existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')
    THEN '✅ Table users existe'
    ELSE '❌ Table users n''existe pas'
  END as table_status;

-- =====================================================
-- 2. VÉRIFIER LES COMPTES MASTER EXISTANTS
-- =====================================================

-- Afficher tous les utilisateurs avec le rôle master
SELECT 
  'Comptes Master existants:' as message,
  id,
  email,
  first_name,
  last_name,
  role,
  status,
  created_at
FROM users 
WHERE role = 'master' OR email LIKE '%master%'
ORDER BY created_at DESC;

-- =====================================================
-- 3. VÉRIFIER L'UUID SPÉCIFIQUE
-- =====================================================

-- Vérifier si l'UUID aa72e089-7ae9-4fe6-bae1-04cce09df80c existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM users WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c')
    THEN '✅ UUID aa72e089-7ae9-4fe6-bae1-04cce09df80c existe'
    ELSE '❌ UUID aa72e089-7ae9-4fe6-bae1-04cce09df80c n''existe pas'
  END as uuid_status;

-- Afficher les détails de cet UUID s'il existe
SELECT 
  'Détails de l''UUID aa72e089-7ae9-4fe6-bae1-04cce09df80c:' as message,
  id,
  email,
  first_name,
  last_name,
  role,
  status,
  created_at,
  updated_at
FROM users 
WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c';

-- =====================================================
-- 4. VÉRIFIER LES EMAILS MASTER
-- =====================================================

-- Vérifier les emails master spécifiques
SELECT 
  'Emails master recherchés:' as message,
  'master@mastercom.fr' as email_1,
  'master@mastercom.com' as email_2;

-- Vérifier si ces emails existent
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM users WHERE email = 'master@mastercom.fr')
    THEN '✅ master@mastercom.fr existe'
    ELSE '❌ master@mastercom.fr n''existe pas'
  END as email_status_1;

SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM users WHERE email = 'master@mastercom.com')
    THEN '✅ master@mastercom.com existe'
    ELSE '❌ master@mastercom.com n''existe pas'
  END as email_status_2;

-- =====================================================
-- 5. RECOMMANDATIONS
-- =====================================================

-- Afficher les recommandations basées sur l'état actuel
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM users WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c' AND role = 'master')
    THEN '✅ Compte master configuré correctement'
    WHEN EXISTS (SELECT 1 FROM users WHERE id = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c')
    THEN '⚠️ UUID existe mais rôle incorrect - exécuter fix-master-account-permissions.sql'
    ELSE '❌ UUID n''existe pas - exécuter fix-master-account-permissions.sql'
  END as recommendation;
