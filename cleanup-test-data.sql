-- =====================================================
-- NETTOYAGE DES DONNÉES DE TEST - MASTERCOM
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script supprime toutes les données de test injectées

-- =====================================================
-- 1. SUPPRESSION DES DEMANDES DE SUPPRESSION DE TEST
-- =====================================================

-- Supprimer TOUTES les demandes de suppression créées par le master (peu importe le statut)
DELETE FROM deletion_requests 
WHERE requested_by = 'aa72e089-7ae9-4fe6-bae1-04cce09df80c';

-- =====================================================
-- 2. SUPPRESSION DES FACTURES DE TEST (AVANT LES CLIENTS)
-- =====================================================

-- Supprimer les factures de test
DELETE FROM invoices 
WHERE invoice_number IN ('FAC-2024-001', 'FAC-2024-002');

-- =====================================================
-- 3. SUPPRESSION DES DEVIS DE TEST (AVANT LES CLIENTS)
-- =====================================================

-- Supprimer les devis de test
DELETE FROM quotes 
WHERE quote_number IN ('DEV-2024-001', 'DEV-2024-002');

-- =====================================================
-- 4. SUPPRESSION DES PROJETS DE TEST (AVANT LES CLIENTS)
-- =====================================================

-- Supprimer les projets de test
DELETE FROM projects 
WHERE name IN ('Projet Web 1', 'Projet Mobile 1');

-- =====================================================
-- 5. SUPPRESSION DES CLIENTS DE TEST (EN DERNIER)
-- =====================================================

-- Supprimer les clients de test (maintenant que les références sont supprimées)
DELETE FROM clients 
WHERE email IN ('client1@test.com', 'client2@test.com');

-- =====================================================
-- 6. VÉRIFICATION DU NETTOYAGE
-- =====================================================

-- Afficher le nombre d'enregistrements restants
SELECT 'Clients restants:' as type, COUNT(*) as count FROM clients
UNION ALL
SELECT 'Projets restants:', COUNT(*) FROM projects
UNION ALL
SELECT 'Factures restantes:', COUNT(*) FROM invoices
UNION ALL
SELECT 'Devis restants:', COUNT(*) FROM quotes
UNION ALL
SELECT 'Demandes de suppression restantes:', COUNT(*) FROM deletion_requests;

-- =====================================================
-- 7. MESSAGE DE CONFIRMATION
-- =====================================================

SELECT '🧹 Nettoyage des données de test terminé!' as message;
SELECT '✅ Données de test supprimées' as details;
SELECT '✅ Base de données nettoyée' as status;
