// Diagnostic de configuration pour le déploiement
export const diagnosticConfig = () => {
  const config = {
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    environment: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  };

  // Log pour le debugging (seulement en développement)
  if (import.meta.env.DEV) {
    console.log('🔧 Configuration Supabase:', {
      url: config.supabaseUrl ? '✅ Configuré' : '❌ Manquant',
      key: config.supabaseKey ? '✅ Configuré' : '❌ Manquant',
      environment: config.environment,
      mode: config.isProduction ? 'Production' : 'Développement'
    });
  }

  return config;
};

// Fonction pour tester la connexion Supabase
export const testSupabaseConnection = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL || 'https://gpnjamtnogyfvykgdiwd.supabase.co'}/rest/v1/`, {
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmphbXRub2d5ZnZ5a2dkaXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0MzY2ODMsImV4cCI6MjA3MzAxMjY4M30.UH_IgEzIOOfECQpGZhhvRGcyyxLmc19lteJoKV9kh4A'
      }
    });

    if (response.ok) {
      console.log('✅ Connexion Supabase OK');
      return true;
    } else {
      console.error('❌ Erreur connexion Supabase:', response.status);
      return false;
    }
  } catch (error) {
    console.error('❌ Erreur réseau Supabase:', error);
    return false;
  }
};
