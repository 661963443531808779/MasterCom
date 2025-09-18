import { useState, FC, useEffect } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Shield, AlertCircle, 
  Key, UserCheck, Settings
} from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialiser les rôles Supabase au chargement
  useEffect(() => {
    const initializeRoles = async () => {
      setIsInitializing(true);
      try {
        const { supabase } = await import('../services/supabase');
        
        // Créer les rôles si nécessaire
        const { error: roleError } = await supabase
          .from('roles')
          .upsert([
            {
              id: 'master',
              name: 'master',
              description: 'Administrateur principal',
              permissions: { all: true }
            },
            {
              id: 'client',
              name: 'client',
              description: 'Client standard',
              permissions: { all: false }
            }
          ]);

        if (roleError) {
          console.warn('Erreur création rôles:', roleError.message);
        } else {
          console.log('✅ Rôles Supabase initialisés');
        }

      } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('🔐 Tentative de connexion Supabase avec:', email);
      
      // Import dynamique de Supabase
      const { supabase } = await import('../services/supabase');
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('❌ Erreur Supabase:', authError.message);
        setError('Email ou mot de passe incorrect');
        return;
      }

      if (data.user) {
        console.log('✅ Connexion Supabase réussie:', data.user.email);
        
        // Récupérer le profil utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*, roles(*)')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.warn('⚠️ Erreur profil, utilisation du rôle par défaut:', profileError);
          onLogin('client');
        } else {
          const userRole = profile.roles?.name || 'client';
          console.log('✅ Rôle utilisateur:', userRole);
          onLogin(userRole);
        }
      }
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', error);
      setError('Erreur de connexion. Vérifiez votre connexion internet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion MasterCom
            </h2>
            <p className="text-gray-600">
              Accédez à votre espace personnel
            </p>
            {isInitializing && (
              <div className="mt-2 text-sm text-blue-600">
                🔧 Initialisation des rôles Supabase...
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre email Supabase"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading || isInitializing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <Key className="h-5 w-5 mr-2" />
                  Se connecter avec Supabase
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Settings className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">
                  Authentification Supabase
                </h3>
                <p className="text-xs text-blue-700">
                  Utilisez vos identifiants Supabase pour vous connecter.
                  Créez un compte si vous n'en avez pas encore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
