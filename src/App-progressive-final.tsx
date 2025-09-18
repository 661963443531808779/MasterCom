import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';

// Version simplifiée du Login avec Supabase mais sans hooks complexes
function SimpleLoginSupabase({ onLogin }: { onLogin: (role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Import dynamique de Supabase pour éviter les conflits
      const { supabase } = await import('./services/supabase');
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Email ou mot de passe incorrect');
        return;
      }

      if (data.user) {
        // Récupérer le profil utilisateur
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('*, roles(*)')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.warn('Erreur profil, utilisation du rôle par défaut:', profileError);
          onLogin('client');
        } else {
          onLogin(profile.roles?.name || 'client');
        }
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Connexion MasterCom
            </h2>
            <p className="text-gray-600">
              Accédez à votre espace personnel
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@mastercom.fr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Version simplifiée du CRM avec composants réels mais sans hooks complexes
function SimpleCRMReal() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CRM MasterCom</h1>
        
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'clients', label: 'Clients' },
                { id: 'invoices', label: 'Factures' },
                { id: 'quotes', label: 'Devis' },
                { id: 'tickets', label: 'Support' },
                { id: 'projects', label: 'Projets' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'clients' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Clients</h3>
                <p className="text-gray-600">Interface de gestion des clients</p>
              </div>
            )}
            {activeTab === 'invoices' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Factures</h3>
                <p className="text-gray-600">Interface de gestion des factures</p>
              </div>
            )}
            {activeTab === 'quotes' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Devis</h3>
                <p className="text-gray-600">Interface de gestion des devis</p>
              </div>
            )}
            {activeTab === 'tickets' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Support Client</h3>
                <p className="text-gray-600">Interface de support client</p>
              </div>
            )}
            {activeTab === 'projects' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Projets</h3>
                <p className="text-gray-600">Interface de gestion des projets</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Version simplifiée du Dashboard avec graphiques simples
function SimpleDashboardReal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard MasterCom</h1>
        
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Clients</h3>
            <p className="text-3xl font-bold text-blue-600">1,234</p>
            <p className="text-sm text-gray-500">+12% ce mois</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">CA</h3>
            <p className="text-3xl font-bold text-green-600">€45,678</p>
            <p className="text-sm text-gray-500">+8% ce mois</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Projets</h3>
            <p className="text-3xl font-bold text-purple-600">89</p>
            <p className="text-sm text-gray-500">+5% ce mois</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">Croissance</h3>
            <p className="text-3xl font-bold text-orange-600">+12.5%</p>
            <p className="text-sm text-gray-500">vs mois dernier</p>
          </div>
        </div>

        {/* Graphiques simples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Évolution des ventes</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Graphique des ventes</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Répartition des clients</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Graphique des clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'état de connexion au chargement
    const checkAuth = async () => {
      try {
        // Délai pour éviter les problèmes de chargement
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Import dynamique de Supabase
        const { supabase } = await import('./services/supabase');
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setIsLoggedIn(true);
          // Récupérer le profil utilisateur
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*, roles(*)')
            .eq('id', user.id)
            .single();
          
          setUserRole(profile?.roles?.name || 'client');
        }
      } catch (error) {
        console.warn('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (role: string) => {
    console.log('🔐 Connexion réussie avec le rôle:', role);
    setIsLoggedIn(true);
    setUserRole(role);

    if (role === 'master' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/crm');
    }
  };

  const handleLogout = async () => {
    try {
      const { supabase } = await import('./services/supabase');
      await supabase.auth.signOut();
      console.log('🚪 Déconnexion');
      setIsLoggedIn(false);
      setUserRole('client');
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<SimpleLoginSupabase onLogin={handleLogin} />} />
          <Route path="/crm" element={<SimpleCRMReal />} />
          <Route path="/dashboard" element={<SimpleDashboardReal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version progressive finale avec Supabase');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
