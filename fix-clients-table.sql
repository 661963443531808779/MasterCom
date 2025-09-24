-- =====================================================
-- CORRECTION DE LA TABLE CLIENTS - MASTERCOM
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor

-- Vérifier si la colonne created_by existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' 
    AND column_name = 'created_by'
  ) THEN
    -- Ajouter la colonne created_by si elle n'existe pas
    ALTER TABLE clients ADD COLUMN created_by UUID;
    RAISE NOTICE 'Colonne created_by ajoutée à la table clients';
  ELSE
    RAISE NOTICE 'Colonne created_by existe déjà';
  END IF;
END $$;

-- Mettre à jour les clients existants qui n'ont pas de created_by
UPDATE clients 
SET created_by = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c'
WHERE created_by IS NULL;

-- Ajouter la contrainte NOT NULL si elle n'existe pas déjà
DO $$
BEGIN
  -- Vérifier si la contrainte NOT NULL existe déjà
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' 
    AND column_name = 'created_by'
    AND is_nullable = 'YES'
  ) THEN
    -- Ajouter la contrainte NOT NULL
    ALTER TABLE clients ALTER COLUMN created_by SET NOT NULL;
    RAISE NOTICE 'Contrainte NOT NULL ajoutée à created_by';
  ELSE
    RAISE NOTICE 'Contrainte NOT NULL existe déjà sur created_by';
  END IF;
END $$;

-- Vérifier la structure finale de la table
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'clients' 
ORDER BY ordinal_position;

-- Message de confirmation
SELECT '🎉 Table clients corrigée avec succès!' as message;
SELECT '✅ Colonne created_by ajoutée' as details;
SELECT '✅ Contrainte NOT NULL appliquée' as constraint;
SELECT '✅ Clients existants mis à jour' as update;
