-- Système de thèmes saisonniers global pour MasterCom
-- Ce script crée la table pour gérer les thèmes pour tous les visiteurs

-- Créer la table des préférences de thème
CREATE TABLE IF NOT EXISTS theme_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL DEFAULT 'global-theme',
    theme_name TEXT NOT NULL CHECK (theme_name IN ('none', 'christmas', 'easter', 'halloween', 'summer')),
    is_active BOOLEAN NOT NULL DEFAULT false,
    activated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, theme_name)
);

-- Créer un index pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_theme_preferences_active ON theme_preferences(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_theme_preferences_user ON theme_preferences(user_id);

-- Activer RLS (Row Level Security)
ALTER TABLE theme_preferences ENABLE ROW LEVEL SECURITY;

-- Politique RLS : Tout le monde peut lire les thèmes actifs
CREATE POLICY "Anyone can read active themes" ON theme_preferences
    FOR SELECT USING (is_active = true);

-- Politique RLS : Seuls les masters peuvent modifier les thèmes
CREATE POLICY "Only masters can modify themes" ON theme_preferences
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'master'
        )
    );

-- Fonction pour désactiver tous les thèmes avant d'en activer un nouveau
CREATE OR REPLACE FUNCTION deactivate_all_themes()
RETURNS void AS $$
BEGIN
    UPDATE theme_preferences 
    SET is_active = false, updated_at = CURRENT_TIMESTAMP
    WHERE is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour activer un thème global
CREATE OR REPLACE FUNCTION activate_global_theme(theme_name_param TEXT)
RETURNS void AS $$
BEGIN
    -- Vérifier que le thème est valide
    IF theme_name_param NOT IN ('none', 'christmas', 'easter', 'halloween', 'summer') THEN
        RAISE EXCEPTION 'Thème invalide: %', theme_name_param;
    END IF;
    
    -- Désactiver tous les thèmes actifs
    PERFORM deactivate_all_themes();
    
    -- Si le thème n'est pas 'none', l'activer
    IF theme_name_param != 'none' THEN
        INSERT INTO theme_preferences (user_id, theme_name, is_active, activated_at)
        VALUES ('global-theme', theme_name_param, true, CURRENT_TIMESTAMP)
        ON CONFLICT (user_id, theme_name) 
        DO UPDATE SET 
            is_active = true,
            activated_at = CURRENT_TIMESTAMP,
            updated_at = CURRENT_TIMESTAMP;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insérer le thème par défaut (aucun thème)
INSERT INTO theme_preferences (user_id, theme_name, is_active, activated_at)
VALUES ('global-theme', 'none', true, CURRENT_TIMESTAMP)
ON CONFLICT (user_id, theme_name) DO NOTHING;

-- Commentaires sur la table
COMMENT ON TABLE theme_preferences IS 'Préférences de thèmes saisonniers pour tous les visiteurs';
COMMENT ON COLUMN theme_preferences.user_id IS 'ID utilisateur ou "global-theme" pour les thèmes globaux';
COMMENT ON COLUMN theme_preferences.theme_name IS 'Nom du thème saisonnier';
COMMENT ON COLUMN theme_preferences.is_active IS 'Indique si ce thème est actuellement actif';
COMMENT ON COLUMN theme_preferences.activated_at IS 'Date et heure d''activation du thème';

-- Instructions d'utilisation
-- Pour activer un thème global (exemple Halloween) :
-- SELECT activate_global_theme('halloween');
--
-- Pour désactiver tous les thèmes :
-- SELECT activate_global_theme('none');
--
-- Pour voir le thème actuellement actif :
-- SELECT theme_name FROM theme_preferences WHERE is_active = true LIMIT 1;
