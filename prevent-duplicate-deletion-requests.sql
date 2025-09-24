-- =====================================================
-- PRÉVENTION DES DOUBLONS DE DEMANDES DE SUPPRESSION
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script ajoute une contrainte unique pour empêcher les doublons

-- =====================================================
-- 1. NETTOYER LES DOUBLONS EXISTANTS
-- =====================================================

-- Supprimer les doublons en gardant seulement la première demande pour chaque combinaison (table_name, record_id)
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY table_name, record_id 
           ORDER BY requested_at ASC
         ) as rn
  FROM deletion_requests
  WHERE status = 'pending'
)
DELETE FROM deletion_requests 
WHERE id IN (
  SELECT id FROM duplicates WHERE rn > 1
);

-- =====================================================
-- 2. AJOUTER UNE CONTRAINTE UNIQUE
-- =====================================================

-- Ajouter une contrainte unique pour empêcher les doublons futurs
-- Cette contrainte permet seulement une demande 'pending' par combinaison (table_name, record_id)
DO $$
BEGIN
  -- Vérifier si la contrainte existe déjà
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'deletion_requests_unique_pending' 
    AND table_name = 'deletion_requests'
  ) THEN
    -- Créer un index unique partiel pour les demandes en attente
    CREATE UNIQUE INDEX deletion_requests_unique_pending 
    ON deletion_requests (table_name, record_id) 
    WHERE status = 'pending';
    
    RAISE NOTICE 'Contrainte unique ajoutée pour empêcher les doublons de demandes en attente.';
  ELSE
    RAISE NOTICE 'Contrainte unique existe déjà.';
  END IF;
END $$;

-- =====================================================
-- 3. VÉRIFICATION
-- =====================================================

-- Vérifier qu'il n'y a plus de doublons
SELECT 
  'Vérification des doublons:' as message,
  COUNT(*) as total_requests,
  COUNT(DISTINCT CONCAT(table_name, '-', record_id)) as unique_combinations
FROM deletion_requests 
WHERE status = 'pending';

-- Afficher les demandes en attente restantes
SELECT 
  table_name,
  record_id,
  reason,
  requested_at
FROM deletion_requests 
WHERE status = 'pending'
ORDER BY requested_at DESC;

-- Message de confirmation
SELECT '✅ Système de prévention des doublons configuré avec succès!' as result;
