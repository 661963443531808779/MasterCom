import { useState, FC } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, AlertCircle, 
  Key, CheckCircle, Camera, Video, Mic, Sparkles, UserPlus
} from 'lucide-react';
import { simpleAuth, SimpleUser } from '../services/simpleAuth';

interface SimpleLoginProps {
  onLogin: (user: SimpleUser) => void;
}

const SimpleLogin: FC<SimpleLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTestMode, setShowTestMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setIsSuccess(false);

    try {
      console.log('🔐 SimpleLogin - Tentative de connexion:', email);
      
      const user = await simpleAuth.login(email, password);
      
      console.log('✅ SimpleLogin - Connexion réussie:', user.email);
      setIsSuccess(true);
      
      // Appeler la fonction de callback
      onLogin(user);
      
      // Redirection automatique après succès
      setTimeout(() => {
        window.location.href = '/master-panel';
      }, 1500);
    } catch (error: any) {
      console.error('❌ SimpleLogin - Erreur:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour créer un compte master automatiquement
  const handleCreateMaster = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🧪 SimpleLogin - Création compte master...');
      const user = await simpleAuth.createMasterAccount();
      
      setError('');
      alert(`✅ Compte master créé avec succès!\nEmail: ${user.email}\nMot de passe: admin123`);
      setEmail(user.email);
      setPassword('admin123');
      setIsSuccess(true);
      
      // Appeler la fonction de callback
      onLogin(user);
      
      setTimeout(() => {
        window.location.href = '/master-panel';
      }, 1500);
    } catch (error: any) {
      console.error('❌ SimpleLogin - Erreur création:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour se connecter avec le mot de passe configuré
  const handleLoginWithConfiguredPassword = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🔑 SimpleLogin - Connexion avec mot de passe configuré...');
      const user = await simpleAuth.loginWithConfiguredPassword();
      
      setError('');
      alert(`✅ Connexion réussie!\nEmail: ${user.email}\nMot de passe: admin123`);
      setEmail(user.email);
      setPassword('admin123');
      setIsSuccess(true);
      
      // Appeler la fonction de callback
      onLogin(user);
      
      setTimeout(() => {
        window.location.href = '/master-panel';
      }, 1500);
    } catch (error: any) {
      console.error('❌ SimpleLogin - Erreur connexion configurée:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de test de connexion
  const handleTestConnection = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('🧪 SimpleLogin - Test de connexion...');
      const result = await simpleAuth.testConnection();
      
      if (result.success) {
        setError('');
        const details = result.details ? `\nDétails: ${JSON.stringify(result.details, null, 2)}` : '';
        alert(`✅ Test de connexion réussi!\n${result.message}${details}\n\nVérifiez la console pour plus de détails.`);
      } else {
        setError(`❌ Test échoué: ${result.message}`);
        const details = result.details ? `\nDétails: ${JSON.stringify(result.details, null, 2)}` : '';
        alert(`❌ Test échoué\n${result.message}${details}\n\nVérifiez la console pour plus de détails.`);
      }
    } catch (error: any) {
      console.error('❌ SimpleLogin - Erreur test:', error.message);
      setError('Erreur lors du test de connexion');
      alert(`❌ Erreur lors du test de connexion\n${error.message}\n\nVérifiez la console pour plus de détails.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Particules flottantes */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-200 rounded-full animate-bounce opacity-60"></div>
        
        {/* Grille de fond */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Effets de lumière */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-md w-full space-y-8">
        {/* Header avec effets visuels */}
        <div className="text-center">
          <div className="relative mx-auto h-16 w-16 mb-6">
            {/* Cercle principal avec gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 bg-blue-900 rounded-full flex items-center justify-center">
              <div className="relative">
                <Camera className="h-8 w-8 text-white" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-blue-300 animate-pulse" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent">
            MasterCom
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Agence de Communication Créative
          </p>
          
          {/* Indicateurs d'activité */}
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>En ligne</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Video className="h-3 w-3" />
              <span>Studio actif</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <Mic className="h-3 w-3" />
              <span>Enregistrement</span>
            </div>
          </div>
        </div>

        {/* Formulaire avec design glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  Adresse email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                  Mot de passe
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-purple-400 transition-colors"
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
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            {/* Message de succès */}
            {isSuccess && (
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-200">Connexion réussie ! Redirection en cours...</p>
              </div>
            )}

            {/* Bouton de connexion avec effet gradient */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="group relative w-full flex justify-center py-4 px-6 text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex items-center">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Connexion en cours...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-3" />
                    Connexion réussie
                  </>
                ) : (
                  <>
                    <Key className="h-5 w-5 mr-3" />
                    Accéder au Studio
                  </>
                )}
              </div>
            </button>

            {/* Options supplémentaires */}
            <div className="text-center space-y-3">
              {/* Bouton de test pour créer un utilisateur master */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowTestMode(!showTestMode)}
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Mode test simplifié
                </button>
                
                {showTestMode && (
                  <div className="mt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleLoginWithConfiguredPassword}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors mx-auto"
                    >
                      <Key className="h-4 w-4" />
                      <span>Connexion admin123</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleCreateMaster}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors mx-auto"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Créer & Connexion Master</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors mx-auto"
                    >
                      <Key className="h-4 w-4" />
                      <span>Test Connexion</span>
                    </button>
                    
                    <p className="text-xs text-gray-400 mt-1">
                      Mot de passe configuré: admin123
                    </p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SimpleLogin;
