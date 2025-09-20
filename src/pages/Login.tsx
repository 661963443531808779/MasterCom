import { useState, FC } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Shield, AlertCircle, 
  Key, Settings, CheckCircle
} from 'lucide-react';
import { supabase } from '../services/supabase';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setIsSuccess(false);

    try {
      console.log('🔐 Tentative de connexion Supabase avec:', email);
      
      // Ajouter un timeout pour éviter les blocages
      const authPromise = supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout de connexion')), 10000)
      );
      
      const { data, error: authError } = await Promise.race([authPromise, timeoutPromise]) as any;

      if (authError) {
        console.error('❌ Erreur Supabase:', authError.message);
        if (authError.message.includes('Supabase non configuré')) {
          setError('Service d\'authentification temporairement indisponible');
        } else {
          setError('Email ou mot de passe incorrect');
        }
        return;
      }

      if (data && data.user) {
        console.log('✅ Connexion Supabase réussie:', data.user.email);
        setIsSuccess(true);
        
        // Récupérer le profil utilisateur avec timeout
        try {
          const profilePromise = supabase
            .from('user_profiles')
            .select('*, roles(*)')
            .eq('id', data.user.id)
            .single();
          
          const profileTimeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout profil')), 5000)
          );
          
          const { data: profile, error: profileError } = await Promise.race([profilePromise, profileTimeoutPromise]) as any;

          if (profileError) {
            console.warn('⚠️ Erreur profil, utilisation du rôle par défaut:', profileError);
            setTimeout(() => onLogin('client'), 1000);
          } else {
            const userRole = profile?.roles?.name || 'client';
            console.log('✅ Rôle utilisateur récupéré:', userRole);
            setTimeout(() => onLogin(userRole), 1000);
          }
        } catch (profileError) {
          console.warn('⚠️ Erreur récupération profil:', profileError);
          setTimeout(() => onLogin('client'), 1000);
        }
      } else {
        setError('Connexion échouée');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      if (error instanceof Error && error.message.includes('Timeout')) {
        setError('Connexion trop lente. Veuillez réessayer.');
      } else {
        setError('Une erreur inattendue s\'est produite');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Connexion MasterCom
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre espace de gestion
          </p>
        </div>

        {/* Formulaire */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Message de succès */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-sm text-green-700">Connexion réussie ! Redirection en cours...</p>
            </div>
          )}

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connexion en cours...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Connexion réussie
              </>
            ) : (
              <>
                <Key className="h-4 w-4 mr-2" />
                Se connecter
              </>
            )}
          </button>

          {/* Options supplémentaires */}
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              Mot de passe oublié ?
            </button>
          </div>
        </form>

        {/* Informations de test */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Settings className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h3 className="font-medium text-blue-900 mb-1">Informations de connexion</h3>
              <p className="text-blue-700 mb-2">
                Utilisez vos identifiants Supabase pour vous connecter au système.
              </p>
              <div className="text-xs text-blue-600">
                <p>• Email : Votre adresse email Supabase</p>
                <p>• Mot de passe : Votre mot de passe Supabase</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;