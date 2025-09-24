-- =====================================================
-- VÉRIFICATION DE LA TABLE CLIENTS - MASTERCOM
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Vérifier si la table clients existe
SELECT 
  CASE 
    WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'clients')
    THEN '✅ Table clients existe'
    ELSE '❌ Table clients n''existe pas'
  END as table_status;

-- Vérifier les colonnes de la table clients
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'clients' 
ORDER BY ordinal_position;

-- Vérifier les contraintes
SELECT 
  constraint_name,
  constraint_type
FROM information_schema.table_constraints 
WHERE table_name = 'clients';

-- Vérifier les politiques RLS
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'clients';

-- Tester l'insertion d'un client de test
INSERT INTO clients (name, email, phone, city, country, created_by) 
VALUES (
  'Test Client',
  'test@example.com',
  '0123456789',
  'Paris',
  'France',
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
) ON CONFLICT (email) DO NOTHING;

-- Vérifier que l'insertion a fonctionné
SELECT '✅ Test d''insertion réussi' as test_result
WHERE EXISTS (SELECT 1 FROM clients WHERE email = 'test@example.com');

-- Nettoyer le client de test
DELETE FROM clients WHERE email = 'test@example.com';

-- Message de confirmation
SELECT '🎉 Vérification de la table clients terminée!' as message;
