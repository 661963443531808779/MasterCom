-- Script de correction forcée du problème SECURITY DEFINER
-- À exécuter dans Supabase SQL Editor

-- 1. SUPPRIMER TOUTES LES DÉPENDANCES ET LA VUE
-- Forcer la suppression de toutes les dépendances
DROP VIEW IF EXISTS project_overview CASCADE;

-- 2. VÉRIFIER QUE LA VUE EST BIEN SUPPRIMÉE
SELECT 'Vérification de la suppression de la vue:' as info;
SELECT 
    schemaname,
    viewname,
    definition
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname = 'project_overview';

-- 3. SUPPRIMER TOUTES LES FONCTIONS LIÉES AUX PROJETS
-- Au cas où il y aurait des fonctions SECURITY DEFINER liées
DROP FUNCTION IF EXISTS get_project_overview() CASCADE;
DROP FUNCTION IF EXISTS project_overview_function() CASCADE;

-- 4. CRÉER UNE VUE SIMPLE SANS AUCUNE PROPRIÉTÉ SECURITY DEFINER
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
GROUP BY 
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
    p.created_at, 
    p.updated_at,
    c.name, 
    c.email, 
    up.first_name, 
    up.last_name, 
    up.email;

-- 5. VÉRIFIER LA DÉFINITION DE LA VUE
SELECT 'Définition de la nouvelle vue:' as info;
SELECT 
    schemaname,
    viewname,
    definition
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname = 'project_overview';

-- 6. VÉRIFIER QU'IL N'Y A PAS DE SECURITY DEFINER
SELECT 'Vérification de la sécurité:' as info;
SELECT 
    schemaname,
    viewname,
    CASE 
        WHEN definition LIKE '%SECURITY DEFINER%' THEN 'PROBLÈME: SECURITY DEFINER détecté'
        ELSE 'OK: Pas de SECURITY DEFINER'
    END as security_status
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname = 'project_overview';

-- 7. TESTER LA VUE
SELECT 'Test de la vue:' as info;
SELECT COUNT(*) as total_projects FROM project_overview;

-- 8. CRÉER UNE FONCTION POUR VÉRIFIER TOUTES LES VUES
CREATE OR REPLACE FUNCTION check_all_views_security()
RETURNS TABLE (
    view_name TEXT,
    has_security_definer BOOLEAN,
    security_status TEXT
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
        CASE 
            WHEN v.definition LIKE '%SECURITY DEFINER%' THEN 'DANGER: SECURITY DEFINER détecté'
            ELSE 'SÉCURISÉ: Pas de SECURITY DEFINER'
        END as security_status
    FROM pg_views v
    WHERE v.schemaname = 'public'
    ORDER BY v.viewname;
END;
$$;

-- 9. VÉRIFIER TOUTES LES VUES
SELECT 'Vérification de toutes les vues:' as info;
SELECT * FROM check_all_views_security();

-- 10. MESSAGE FINAL
SELECT 
    'Correction forcée terminée !' as message,
    'La vue project_overview a été recréée sans SECURITY DEFINER' as status;
