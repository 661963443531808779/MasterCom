import { useState, FC } from 'react';
import {
  Mail, Lock, Eye, EyeOff, Shield, AlertCircle,
  Key, Settings, CheckCircle
} from 'lucide-react';

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
      console.log('🔐 Tentative de connexion avec:', email);

      // Simulation d'une connexion réussie pour les tests
      if (email === 'test@mastercom.fr' && password === 'test123') {
        console.log('✅ Connexion test réussie');
        setIsSuccess(true);
        setTimeout(() => onLogin('master'), 1000);
        return;
      }

      // Test avec des comptes par défaut
      const testAccounts = [
        { email: 'admin@mastercom.fr', password: 'admin123', role: 'admin' },
        { email: 'client@mastercom.fr', password: 'client123', role: 'client' },
        { email: 'master@mastercom.fr', password: 'master123', role: 'master' }
      ];

      const account = testAccounts.find(acc => acc.email === email && acc.password === password);
      
      if (account) {
        console.log('✅ Connexion réussie avec le rôle:', account.role);
        setIsSuccess(true);
        setTimeout(() => onLogin(account.role), 1000);
        return;
      }

      // Si pas de compte test, essayer Supabase
      console.log('🔄 Tentative de connexion Supabase...');
      
      // Import dynamique de Supabase pour éviter les erreurs
      const { supabase } = await import('../services/supabase');
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

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
        setTimeout(() => onLogin('client'), 1000);
      } else {
        setError('Connexion échouée');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      setError('Une erreur inattendue s\'est produite');
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
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Connexion MasterCom
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre espace personnel
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
                  className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-md relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Message de succès */}
          {isSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-800">Connexion réussie ! Redirection...</p>
                </div>
              </div>
            </div>
          )}

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion...
                </div>
              ) : isSuccess ? (
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Connexion réussie
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>
        </form>

        {/* Comptes de test */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">🧪 Comptes de test :</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div><strong>Admin:</strong> admin@mastercom.fr / admin123</div>
            <div><strong>Client:</strong> client@mastercom.fr / client123</div>
            <div><strong>Master:</strong> master@mastercom.fr / master123</div>
            <div><strong>Test:</strong> test@mastercom.fr / test123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
