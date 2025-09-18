import { useState, FC, useEffect } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, Shield, AlertCircle, 
  Key, UserCheck, Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSecureForm, validationRules } from '../hooks/useSecureForm';
import { initTestUsers, checkTestUsers } from '../utils/initTestUsers';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: FC<LoginProps> = ({ onLogin }) => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialiser les utilisateurs de test au chargement
  useEffect(() => {
    const initializeUsers = async () => {
      setIsInitializing(true);
      try {
        const usersExist = await checkTestUsers();
        if (!usersExist) {
          console.log('🔧 Initialisation des utilisateurs de test...');
          await initTestUsers();
        }
      } catch (error) {
        console.warn('⚠️ Erreur lors de l\'initialisation:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeUsers();
  }, []);
  
  const {
    values: formData,
    errors,
    isSubmitting,
    csrfToken,
    handleChange,
    handleSubmit
  } = useSecureForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: validationRules.email,
      password: validationRules.required
    },
    enableCSRF: true
  });

  const onSubmit = async (values: any) => {
    setError('');
    try {
      console.log('🔐 Tentative de connexion avec:', values.email);
      
      // Essayer d'abord la connexion Supabase
      try {
        const user = await login(values.email, values.password);
        
        if (user) {
          console.log('✅ Connexion Supabase réussie:', user);
          const userRole = user.roles?.name || user.role_id || 'client';
          onLogin(userRole);
          return;
        }
      } catch (supabaseError) {
        console.warn('⚠️ Erreur Supabase, tentative avec utilisateurs de test:', supabaseError);
      }

      // Fallback avec utilisateurs de test
      if (values.email === 'admin@mastercom.fr' && values.password === 'admin123') {
        console.log('✅ Connexion test admin réussie');
        onLogin('master');
      } else if (values.email === 'client@mastercom.fr' && values.password === 'client123') {
        console.log('✅ Connexion test client réussie');
        onLogin('client');
      } else {
        setError('Email ou mot de passe incorrect. Essayez avec les comptes de test.');
      }
    } catch (error: any) {
      console.error('❌ Erreur de connexion:', error);
      setError(error.message || 'Erreur de connexion');
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
                🔧 Initialisation des utilisateurs de test...
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="admin@mastercom.fr"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
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
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Connexion...
                </>
              ) : (
                <>
                  <Key className="h-5 w-5 mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <Settings className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-900 mb-1">
                  Comptes de test disponibles
                </h3>
                <p className="text-xs text-blue-700">
                  <strong>Admin:</strong> admin@mastercom.fr / admin123<br/>
                  <strong>Client:</strong> client@mastercom.fr / client123<br/>
                  <em>Ou utilisez vos identifiants Supabase</em>
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
