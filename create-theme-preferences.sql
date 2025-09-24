-- =====================================================
-- CRÉATION DE LA TABLE DES PRÉFÉRENCES DE THÈMES
-- =====================================================
-- À exécuter dans Supabase Dashboard > SQL Editor
-- Ce script crée une table pour sauvegarder les préférences de thèmes saisonniers

-- Table des préférences de thèmes
CREATE TABLE IF NOT EXISTS theme_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  theme_name VARCHAR(50) NOT NULL CHECK (theme_name IN ('none', 'christmas', 'easter', 'halloween', 'summer')),
  is_active BOOLEAN DEFAULT true,
  activated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deactivated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS sur la table des préférences de thèmes
ALTER TABLE theme_preferences ENABLE ROW LEVEL SECURITY;

-- Supprimer les politiques existantes si elles existent
DROP POLICY IF EXISTS "Enable all operations for authenticated users" ON theme_preferences;

-- Créer une politique RLS permissive (pour le développement)
CREATE POLICY "Enable all operations for authenticated users" ON theme_preferences
  FOR ALL USING (auth.role() = 'authenticated');

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_theme_preferences_user_id ON theme_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_theme_preferences_active ON theme_preferences(is_active) WHERE is_active = true;

-- Insérer une préférence par défaut pour le master
INSERT INTO theme_preferences (user_id, theme_name, is_active) 
VALUES (
  'aa72e089-7ae9-4fe6-bae1-04cce09df80c',
  'none',
  true
) ON CONFLICT (user_id) DO NOTHING;

-- Fonction pour activer un thème
CREATE OR REPLACE FUNCTION activate_theme(
  p_user_id UUID,
  p_theme_name VARCHAR(50)
) RETURNS BOOLEAN AS $$
BEGIN
  -- Désactiver tous les thèmes actuels pour cet utilisateur
  UPDATE theme_preferences 
  SET is_active = false, deactivated_at = NOW()
  WHERE user_id = p_user_id AND is_active = true;
  
  -- Activer le nouveau thème
  INSERT INTO theme_preferences (user_id, theme_name, is_active)
  VALUES (p_user_id, p_theme_name, true)
  ON CONFLICT (user_id) DO UPDATE SET
    theme_name = EXCLUDED.theme_name,
    is_active = true,
    activated_at = NOW(),
    deactivated_at = NULL,
    updated_at = NOW();
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour obtenir le thème actuel d'un utilisateur
CREATE OR REPLACE FUNCTION get_current_theme(p_user_id UUID)
RETURNS VARCHAR(50) AS $$
DECLARE
  current_theme VARCHAR(50);
BEGIN
  SELECT theme_name INTO current_theme
  FROM theme_preferences
  WHERE user_id = p_user_id AND is_active = true
  LIMIT 1;
  
  RETURN COALESCE(current_theme, 'none');
END;
$$ LANGUAGE plpgsql;

-- Message de confirmation
SELECT '🎨 Système de thèmes saisonniers créé avec succès!' as message;
SELECT '✅ Table theme_preferences créée' as details;
SELECT '✅ Politiques RLS activées' as security;
SELECT '✅ Fonctions utilitaires créées' as functions;
SELECT '✅ Préférence par défaut ajoutée' as default_preference;
