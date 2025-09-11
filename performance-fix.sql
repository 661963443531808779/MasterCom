-- Script de correction des problèmes de performance pour MasterCom
-- À exécuter dans Supabase SQL Editor

-- 1. AJOUTER LES INDEX MANQUANTS POUR LES CLÉS ÉTRANGÈRES
-- Ces index sont essentiels pour les performances des jointures

-- Index pour project_files
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_task_id ON project_files(task_id);

-- Index pour project_milestones
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id);

-- Index pour project_tasks
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);

-- Index pour projects
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_commercial_id ON projects(commercial_id);

-- 2. OPTIMISER LES INDEX EXISTANTS
-- Garder seulement les index les plus importants et supprimer les redondants

-- Supprimer les index inutilisés pour l'instant
DROP INDEX IF EXISTS idx_clients_created_by;
DROP INDEX IF EXISTS idx_invoices_created_by;
DROP INDEX IF EXISTS idx_quotes_created_by;
DROP INDEX IF EXISTS idx_support_tickets_created_by;
DROP INDEX IF EXISTS idx_clients_status_created_at;
DROP INDEX IF EXISTS idx_invoices_status_created_at;
DROP INDEX IF EXISTS idx_quotes_status_created_at;
DROP INDEX IF EXISTS idx_user_profiles_email;
DROP INDEX IF EXISTS idx_clients_email;
DROP INDEX IF EXISTS idx_clients_commercial_id;
DROP INDEX IF EXISTS idx_invoices_client_id;
DROP INDEX IF EXISTS idx_invoices_invoice_number;
DROP INDEX IF EXISTS idx_quotes_client_id;
DROP INDEX IF EXISTS idx_quotes_quote_number;
DROP INDEX IF EXISTS idx_support_tickets_client_id;
DROP INDEX IF EXISTS idx_support_tickets_assigned_to;
DROP INDEX IF EXISTS idx_clients_active;
DROP INDEX IF EXISTS idx_invoices_pending;
DROP INDEX IF EXISTS idx_quotes_pending;
DROP INDEX IF EXISTS idx_project_overview_status;

-- 3. CRÉER DES INDEX OPTIMISÉS POUR LES REQUÊTES FRÉQUENTES
-- Index composites pour les requêtes les plus courantes

-- Index pour les clients (tri par statut et date)
CREATE INDEX IF NOT EXISTS idx_clients_status_created_at ON clients(status, created_at DESC);

-- Index pour les factures (tri par statut et date)
CREATE INDEX IF NOT EXISTS idx_invoices_status_created_at ON invoices(status, created_at DESC);

-- Index pour les devis (tri par statut et date)
CREATE INDEX IF NOT EXISTS idx_quotes_status_created_at ON quotes(status, created_at DESC);

-- Index pour les tickets de support (tri par statut et date)
CREATE INDEX IF NOT EXISTS idx_support_tickets_status_created_at ON support_tickets(status, created_at DESC);

-- Index pour les projets (tri par statut et date)
CREATE INDEX IF NOT EXISTS idx_projects_status_created_at ON projects(status, created_at DESC);

-- 4. INDEX POUR LES REQUÊTES DE RECHERCHE
-- Index pour les recherches par email
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);

-- Index pour les numéros de facture et devis
CREATE INDEX IF NOT EXISTS idx_invoices_invoice_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_number ON quotes(quote_number);

-- 5. INDEX POUR LES RELATIONS IMPORTANTES
-- Index pour les relations commerciales
CREATE INDEX IF NOT EXISTS idx_clients_commercial_id ON clients(commercial_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_client_id ON support_tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_assigned_to ON support_tickets(assigned_to);

-- 6. INDEX POUR LES TÂCHES ET MILESTONES
-- Index pour les tâches de projet
CREATE INDEX IF NOT EXISTS idx_project_tasks_assigned_to ON project_tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_project_tasks_status ON project_tasks(status);

-- 7. FONCTION POUR ANALYSER L'UTILISATION DES INDEX
-- Supprimer d'abord la fonction existante si elle existe
DROP FUNCTION IF EXISTS analyze_index_usage();

-- Créer la nouvelle fonction
CREATE FUNCTION analyze_index_usage()
RETURNS TABLE (
    table_name TEXT,
    index_name TEXT,
    index_size TEXT,
    is_used BOOLEAN,
    usage_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.tablename::TEXT,
        i.indexname::TEXT,
        pg_size_pretty(pg_relation_size(s.indexrelid))::TEXT,
        (s.idx_scan > 0) as is_used,
        COALESCE(s.idx_scan, 0) as usage_count
    FROM pg_tables t
    LEFT JOIN pg_indexes i ON t.tablename = i.tablename
    LEFT JOIN pg_stat_user_indexes s ON i.indexname = s.indexrelname
    WHERE t.schemaname = 'public'
    AND i.indexname IS NOT NULL
    ORDER BY t.tablename, i.indexname;
END;
$$;

-- 8. FONCTION POUR NETTOYER LES INDEX INUTILISÉS
-- Supprimer d'abord la fonction existante si elle existe
DROP FUNCTION IF EXISTS cleanup_unused_indexes();

-- Créer la nouvelle fonction
CREATE FUNCTION cleanup_unused_indexes()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result TEXT := '';
    rec RECORD;
BEGIN
    -- Supprimer les index inutilisés (attention: à utiliser avec précaution)
    FOR rec IN 
        SELECT indexname, tablename
        FROM pg_stat_user_indexes s
        JOIN pg_indexes i ON s.indexrelname = i.indexname
        WHERE s.idx_scan = 0
        AND i.indexname LIKE 'idx_%'
        AND i.tablename IN ('clients', 'invoices', 'quotes', 'support_tickets', 'projects')
    LOOP
        EXECUTE 'DROP INDEX IF EXISTS ' || rec.indexname;
        result := result || 'Supprimé: ' || rec.indexname || E'\n';
    END LOOP;
    
    RETURN result;
END;
$$;

-- 9. FONCTION POUR OPTIMISER LA BASE DE DONNÉES
-- Supprimer d'abord la fonction existante si elle existe
DROP FUNCTION IF EXISTS optimize_database();

-- Créer la nouvelle fonction
CREATE FUNCTION optimize_database()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result TEXT := '';
BEGIN
    -- Analyser les tables pour optimiser les requêtes
    ANALYZE;
    
    -- Vérifier les statistiques
    SELECT 'Analyse terminée' INTO result;
    
    RETURN result;
END;
$$;

-- 10. VÉRIFICATION FINALE
SELECT 'Correction des problèmes de performance terminée !' as message,
       'Tous les index nécessaires ont été créés' as status;

-- 11. AFFICHER LES STATISTIQUES
SELECT * FROM analyze_index_usage();

-- 12. OPTIMISER LA BASE DE DONNÉES
SELECT optimize_database();
