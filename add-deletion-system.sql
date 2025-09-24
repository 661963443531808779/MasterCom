-- =====================================================
-- SYSTÈME DE VALIDATION DES SUPPRESSIONS - MASTERCOM
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Table des demandes de suppression
CREATE TABLE IF NOT EXISTS deletion_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id UUID NOT NULL,
  record_data JSONB NOT NULL,
  reason TEXT,
  requested_by UUID NOT NULL,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  review_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur la table des demandes de suppression
ALTER TABLE deletion_requests ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON deletion_requests;

-- Créer une politique permissive pour les utilisateurs authentifiés
CREATE POLICY "Enable all operations for authenticated users" ON deletion_requests
  FOR ALL USING (auth.role() = 'authenticated');

-- Ajouter des données de test pour les demandes de suppression
INSERT INTO deletion_requests (table_name, record_id, record_data, reason, requested_by) 
SELECT 'clients', 
       (SELECT id FROM clients WHERE email = 'client1@test.com'), 
       jsonb_build_object(
         'name', (SELECT name FROM clients WHERE email = 'client1@test.com'),
         'email', (SELECT email FROM clients WHERE email = 'client1@test.com'),
         'phone', (SELECT phone FROM clients WHERE email = 'client1@test.com')
       ),
       'Client ne répond plus aux emails',
       gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM deletion_requests WHERE table_name = 'clients' AND record_id = (SELECT id FROM clients WHERE email = 'client1@test.com'));

INSERT INTO deletion_requests (table_name, record_id, record_data, reason, requested_by) 
SELECT 'projects', 
       (SELECT id FROM projects WHERE name = 'Projet Web 1'), 
       jsonb_build_object(
         'name', (SELECT name FROM projects WHERE name = 'Projet Web 1'),
         'description', (SELECT description FROM projects WHERE name = 'Projet Web 1'),
         'status', (SELECT status FROM projects WHERE name = 'Projet Web 1')
       ),
       'Projet annulé par le client',
       gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM deletion_requests WHERE table_name = 'projects' AND record_id = (SELECT id FROM projects WHERE name = 'Projet Web 1'));

-- Message de confirmation
SELECT '🎉 Système de validation des suppressions créé avec succès!' as message;
SELECT '✅ Table deletion_requests créée' as details;
SELECT '✅ Politiques RLS activées' as security;
SELECT '✅ Données de test insérées' as test_data;
