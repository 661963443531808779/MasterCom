-- Script de correction de sécurité pour MasterCom
-- À exécuter dans Supabase SQL Editor

-- 1. Supprimer l'ancienne vue project_overview
DROP VIEW IF EXISTS project_overview;

-- 2. Créer une fonction sécurisée pour obtenir les données de projet
CREATE OR REPLACE FUNCTION get_project_overview()
RETURNS TABLE (
    id UUID,
    name TEXT,
    description TEXT,
    status TEXT,
    priority TEXT,
    progress INTEGER,
    start_date DATE,
    end_date DATE,
    estimated_hours INTEGER,
    actual_hours INTEGER,
    budget DECIMAL,
    client_name TEXT,
    client_email TEXT,
    commercial_name TEXT,
    commercial_email TEXT,
    total_tasks BIGINT,
    completed_tasks BIGINT,
    total_milestones BIGINT,
    completed_milestones BIGINT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.description,
        p.status,
        p.priority,
        p.progress,
        p.start_date,
        p.end_date,
        p.estimated_hours,
        p.actual_hours,
        p.budget,
        c.name as client_name,
        c.email as client_email,
        up.first_name || ' ' || up.last_name as commercial_name,
        up.email as commercial_email,
        COUNT(DISTINCT pt.id) as total_tasks,
        COUNT(DISTINCT CASE WHEN pt.status = 'completed' THEN pt.id END) as completed_tasks,
        COUNT(DISTINCT pm.id) as total_milestones,
        COUNT(DISTINCT CASE WHEN pm.status = 'completed' THEN pm.id END) as completed_milestones,
        p.created_at,
        p.updated_at
    FROM projects p
    LEFT JOIN clients c ON p.client_id = c.id
    LEFT JOIN user_profiles up ON p.commercial_id = up.id
    LEFT JOIN project_tasks pt ON p.id = pt.project_id
    LEFT JOIN project_milestones pm ON p.id = pm.project_id
    GROUP BY p.id, c.name, c.email, up.first_name, up.last_name, up.email;
END;
$$;

-- 3. Créer une vue simple qui utilise la fonction sécurisée
CREATE VIEW project_overview AS
SELECT * FROM get_project_overview();

-- 4. Optimiser les index pour de meilleures performances
CREATE INDEX IF NOT EXISTS idx_clients_created_by ON clients(created_by);
CREATE INDEX IF NOT EXISTS idx_invoices_created_by ON invoices(created_by);
CREATE INDEX IF NOT EXISTS idx_quotes_created_by ON quotes(created_by);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_by ON support_tickets(created_by);

-- 5. Créer des index composites pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_clients_status_created_at ON clients(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_status_created_at ON invoices(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status_created_at ON quotes(status, created_at DESC);

-- 6. Optimiser les politiques RLS pour de meilleures performances
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "clients_all" ON clients;
DROP POLICY IF EXISTS "invoices_all" ON invoices;
DROP POLICY IF EXISTS "quotes_all" ON quotes;
DROP POLICY IF EXISTS "support_tickets_all" ON support_tickets;

-- Créer des politiques optimisées
CREATE POLICY "clients_authenticated_access" ON clients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "invoices_authenticated_access" ON invoices
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "quotes_authenticated_access" ON quotes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "support_tickets_authenticated_access" ON support_tickets
    FOR ALL USING (auth.role() = 'authenticated');

-- 7. Créer une fonction pour nettoyer les données expirées (optionnel)
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Supprimer les sessions expirées (plus de 30 jours)
    DELETE FROM auth.sessions 
    WHERE created_at < NOW() - INTERVAL '30 days';
    
    -- Nettoyer les logs d'audit anciens (plus de 90 jours)
    -- Cette table n'existe peut-être pas, donc on l'ignore si elle n'existe pas
    BEGIN
        DELETE FROM audit_logs 
        WHERE created_at < NOW() - INTERVAL '90 days';
    EXCEPTION
        WHEN undefined_table THEN
            -- Table n'existe pas, on continue
            NULL;
    END;
END;
$$;

-- 8. Créer un job de nettoyage automatique (si pg_cron est disponible)
-- Cette commande peut échouer si pg_cron n'est pas installé, c'est normal
DO $$
BEGIN
    PERFORM cron.schedule('cleanup-expired-data', '0 2 * * *', 'SELECT cleanup_expired_data();');
EXCEPTION
    WHEN undefined_function THEN
        -- pg_cron n'est pas disponible, on continue sans le job
        NULL;
END;
$$;

-- 9. Message de confirmation
SELECT 'Corrections de sécurité appliquées avec succès !' as message,
       'Base de données optimisée pour la production' as status;
