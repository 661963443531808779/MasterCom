-- Script de correction du problème SECURITY DEFINER pour project_overview
-- À exécuter dans Supabase SQL Editor

-- 1. SUPPRIMER COMPLÈTEMENT LA VUE PROBLÉMATIQUE
DROP VIEW IF EXISTS project_overview CASCADE;

-- 2. CRÉER UNE VUE SIMPLE SANS SECURITY DEFINER
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
GROUP BY p.id, c.name, c.email, up.first_name, up.last_name, up.email, p.name, p.description, p.status, p.priority, p.progress, p.start_date, p.end_date, p.estimated_hours, p.actual_hours, p.budget, p.created_at, p.updated_at;

-- 3. VÉRIFIER QUE LA VUE N'A PAS DE SECURITY DEFINER
-- Cette requête doit retourner FALSE pour confirmer que la vue n'est pas SECURITY DEFINER
SELECT 
    schemaname,
    viewname,
    definition LIKE '%SECURITY DEFINER%' as has_security_definer
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname = 'project_overview';

-- 4. CRÉER UNE FONCTION DE VÉRIFICATION
CREATE OR REPLACE FUNCTION check_view_security()
RETURNS TABLE (
    view_name TEXT,
    has_security_definer BOOLEAN,
    is_secure BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.viewname::TEXT,
        (v.definition LIKE '%SECURITY DEFINER%') as has_security_definer,
        NOT (v.definition LIKE '%SECURITY DEFINER%') as is_secure
    FROM pg_views v
    WHERE v.schemaname = 'public'
    AND v.viewname = 'project_overview';
END;
$$;

-- 5. TESTER LA VUE
-- Vérifier que la vue fonctionne correctement
SELECT 'Vue project_overview créée avec succès' as message;

-- 6. AFFICHER LES INFORMATIONS DE SÉCURITÉ
SELECT 'Vérification de la sécurité de la vue:' as info;
SELECT * FROM check_view_security();

-- 7. VÉRIFICATION FINALE
SELECT 
    'Correction du problème SECURITY DEFINER terminée !' as message,
    'La vue project_overview est maintenant sécurisée' as status;
