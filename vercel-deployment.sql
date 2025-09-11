-- Script de déploiement final pour Vercel
-- À exécuter dans Supabase SQL Editor

-- 1. Nettoyer les vues problématiques
DROP VIEW IF EXISTS project_overview CASCADE;
DROP MATERIALIZED VIEW IF EXISTS project_overview_mv CASCADE;

-- 2. Créer une vue simple et performante
CREATE VIEW project_overview AS
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

-- 3. Optimiser les index pour Vercel
CREATE INDEX IF NOT EXISTS idx_clients_created_by ON clients(created_by);
CREATE INDEX IF NOT EXISTS idx_invoices_created_by ON invoices(created_by);
CREATE INDEX IF NOT EXISTS idx_quotes_created_by ON quotes(created_by);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_by ON support_tickets(created_by);

-- 4. Index composites pour les performances
CREATE INDEX IF NOT EXISTS idx_clients_status_created_at ON clients(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_status_created_at ON invoices(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status_created_at ON quotes(status, created_at DESC);

-- 5. Politiques RLS optimisées pour Vercel
DROP POLICY IF EXISTS "clients_all" ON clients;
DROP POLICY IF EXISTS "invoices_all" ON invoices;
DROP POLICY IF EXISTS "quotes_all" ON quotes;
DROP POLICY IF EXISTS "support_tickets_all" ON support_tickets;

CREATE POLICY "clients_authenticated_access" ON clients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "invoices_authenticated_access" ON invoices
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "quotes_authenticated_access" ON quotes
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "support_tickets_authenticated_access" ON support_tickets
    FOR ALL USING (auth.role() = 'authenticated');

-- 6. Fonctions optimisées pour Vercel
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Supprimer les sessions expirées (plus de 30 jours)
    DELETE FROM auth.sessions 
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$;

-- 7. Fonction de monitoring pour Vercel
CREATE OR REPLACE FUNCTION get_app_health()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'status', 'healthy',
        'timestamp', NOW(),
        'clients_count', (SELECT COUNT(*) FROM clients),
        'invoices_count', (SELECT COUNT(*) FROM invoices),
        'quotes_count', (SELECT COUNT(*) FROM quotes),
        'tickets_count', (SELECT COUNT(*) FROM support_tickets)
    ) INTO result;
    
    RETURN result;
END;
$$;

-- 8. Message de confirmation
SELECT 'Base de données optimisée pour Vercel !' as message,
       'Prête pour le déploiement' as status;
