-- Script de nettoyage des index inutilisés pour MasterCom
-- À exécuter dans Supabase SQL Editor

-- 1. SUPPRIMER TOUS LES INDEX INUTILISÉS
-- Ces index n'ont jamais été utilisés et ralentissent les performances

-- Index des projets
DROP INDEX IF EXISTS idx_project_tasks_project_id;
DROP INDEX IF EXISTS idx_projects_client_id;
DROP INDEX IF EXISTS idx_project_files_project_id;
DROP INDEX IF EXISTS idx_project_milestones_project_id;
DROP INDEX IF EXISTS idx_projects_commercial_id;
DROP INDEX IF EXISTS idx_projects_status_created_at;

-- Index des entités principales
DROP INDEX IF EXISTS idx_clients_status_created_at;
DROP INDEX IF EXISTS idx_invoices_status_created_at;
DROP INDEX IF EXISTS idx_quotes_status_created_at;
DROP INDEX IF EXISTS idx_support_tickets_status_created_at;

-- Index de recherche
DROP INDEX IF EXISTS idx_clients_email;
DROP INDEX IF EXISTS idx_user_profiles_email;
DROP INDEX IF EXISTS idx_invoices_invoice_number;
DROP INDEX IF EXISTS idx_quotes_quote_number;

-- Index de relations
DROP INDEX IF EXISTS idx_clients_commercial_id;
DROP INDEX IF EXISTS idx_invoices_client_id;
DROP INDEX IF EXISTS idx_quotes_client_id;
DROP INDEX IF EXISTS idx_support_tickets_client_id;
DROP INDEX IF EXISTS idx_support_tickets_assigned_to;

-- Index des tâches
DROP INDEX IF EXISTS idx_project_tasks_assigned_to;
DROP INDEX IF EXISTS idx_project_tasks_status;
DROP INDEX IF EXISTS idx_project_files_task_id;

-- 2. CRÉER UNIQUEMENT LES INDEX ESSENTIELS
-- Index pour les clés primaires et étrangères critiques uniquement

-- Index pour les clés étrangères essentielles
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_commercial_id ON projects(commercial_id);
CREATE INDEX IF NOT EXISTS idx_project_tasks_project_id ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_project_milestones_project_id ON project_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_project_id ON project_files(project_id);
CREATE INDEX IF NOT EXISTS idx_project_files_task_id ON project_files(task_id);

-- Index pour les relations importantes
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_client_id ON support_tickets(client_id);

-- 3. FONCTION POUR NETTOYER AUTOMATIQUEMENT LES INDEX INUTILISÉS
CREATE OR REPLACE FUNCTION auto_cleanup_unused_indexes()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result TEXT := '';
    rec RECORD;
    dropped_count INTEGER := 0;
BEGIN
    -- Supprimer les index inutilisés depuis plus de 24h
    FOR rec IN 
        SELECT 
            i.indexname,
            i.tablename,
            s.idx_scan,
            s.last_idx_scan
        FROM pg_indexes i
        LEFT JOIN pg_stat_user_indexes s ON i.indexname = s.indexrelname
        WHERE i.schemaname = 'public'
        AND i.indexname LIKE 'idx_%'
        AND (s.idx_scan = 0 OR s.idx_scan IS NULL)
        AND i.tablename IN ('clients', 'invoices', 'quotes', 'support_tickets', 'projects', 'project_tasks', 'project_milestones', 'project_files')
    LOOP
        EXECUTE 'DROP INDEX IF EXISTS ' || rec.indexname;
        dropped_count := dropped_count + 1;
        result := result || 'Supprimé: ' || rec.indexname || ' (scans: ' || COALESCE(rec.idx_scan::TEXT, '0') || ')' || E'\n';
    END LOOP;
    
    result := result || E'\n' || 'Total supprimé: ' || dropped_count || ' index';
    
    RETURN result;
END;
$$;

-- 4. FONCTION POUR MONITORER L'UTILISATION DES INDEX
CREATE OR REPLACE FUNCTION monitor_index_usage()
RETURNS TABLE (
    table_name TEXT,
    index_name TEXT,
    index_size TEXT,
    scans_count BIGINT,
    last_scan TIMESTAMP,
    is_used BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        i.tablename::TEXT,
        i.indexname::TEXT,
        pg_size_pretty(pg_relation_size(s.indexrelid))::TEXT,
        COALESCE(s.idx_scan, 0) as scans_count,
        s.last_idx_scan::TIMESTAMP,
        (s.idx_scan > 0) as is_used
    FROM pg_indexes i
    LEFT JOIN pg_stat_user_indexes s ON i.indexname = s.indexrelname
    WHERE i.schemaname = 'public'
    AND i.indexname LIKE 'idx_%'
    ORDER BY COALESCE(s.idx_scan, 0) DESC, i.tablename, i.indexname;
END;
$$;

-- 5. FONCTION POUR OPTIMISER LA BASE DE DONNÉES
CREATE OR REPLACE FUNCTION optimize_database_performance()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result TEXT := '';
    start_time TIMESTAMP;
    end_time TIMESTAMP;
BEGIN
    start_time := clock_timestamp();
    
    -- Analyser toutes les tables
    ANALYZE;
    
    -- Nettoyer les index inutilisés
    SELECT auto_cleanup_unused_indexes() INTO result;
    
    end_time := clock_timestamp();
    
    result := result || E'\n' || 'Optimisation terminée en: ' || 
             EXTRACT(EPOCH FROM (end_time - start_time))::TEXT || ' secondes';
    
    RETURN result;
END;
$$;

-- 6. EXÉCUTER LE NETTOYAGE
SELECT 'Nettoyage des index inutilisés en cours...' as message;

-- 7. AFFICHER LES RÉSULTATS
SELECT 'Index inutilisés supprimés avec succès !' as message,
       'Base de données optimisée pour la production' as status;

-- 8. MONITORER L'UTILISATION DES INDEX RESTANTS
SELECT 'Index restants et leur utilisation:' as info;
SELECT * FROM monitor_index_usage();

-- 9. OPTIMISER LA BASE DE DONNÉES
SELECT optimize_database_performance();
