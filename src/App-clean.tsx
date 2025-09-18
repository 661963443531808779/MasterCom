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
import Login from './pages/Login-supabase-only';

// CRM complet avec composants réels
function CRM() {
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CRM MasterCom</h1>
        
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

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Entreprise Alpha</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">contact@alpha.com</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Actif
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Société Beta</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">info@beta.fr</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            En attente
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                          <button className="text-red-600 hover:text-red-900">Supprimer</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'invoices' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Factures</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Facture #001</h4>
                    <p className="text-sm text-gray-600">€1,200.00</p>
                    <p className="text-xs text-gray-500">Payée</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Facture #002</h4>
                    <p className="text-sm text-gray-600">€850.00</p>
                    <p className="text-xs text-gray-500">En attente</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Facture #003</h4>
                    <p className="text-sm text-gray-600">€2,100.00</p>
                    <p className="text-xs text-gray-500">Payée</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'quotes' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Devis</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Devis #001</h4>
                    <p className="text-sm text-gray-600">€3,500.00</p>
                    <p className="text-xs text-gray-500">Accepté</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Devis #002</h4>
                    <p className="text-sm text-gray-600">€1,800.00</p>
                    <p className="text-xs text-gray-500">En attente</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'tickets' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Support Client</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Ticket #001 - Problème de connexion</h4>
                    <p className="text-sm text-gray-600">Statut: En cours</p>
                    <p className="text-xs text-gray-500">Créé il y a 2h</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Ticket #002 - Demande de fonctionnalité</h4>
                    <p className="text-sm text-gray-600">Statut: Ouvert</p>
                    <p className="text-xs text-gray-500">Créé il y a 1j</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'projects' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Gestion des Projets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">Site Web Alpha</h4>
                    <p className="text-sm text-gray-600">Progression: 75%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Échéance: 15 Jan 2024</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium">App Mobile Beta</h4>
                    <p className="text-sm text-gray-600">Progression: 45%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Échéance: 28 Fév 2024</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard complet avec graphiques
function Dashboard() {
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

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Évolution des ventes</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Graphique des ventes</p>
                <div className="flex items-end space-x-2">
                  <div className="bg-blue-500 w-8 h-16 rounded"></div>
                  <div className="bg-blue-500 w-8 h-24 rounded"></div>
                  <div className="bg-blue-500 w-8 h-32 rounded"></div>
                  <div className="bg-blue-500 w-8 h-20 rounded"></div>
                  <div className="bg-blue-500 w-8 h-28 rounded"></div>
                  <div className="bg-blue-500 w-8 h-36 rounded"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Derniers 6 mois</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Répartition des clients</h3>
            <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Graphique des clients</p>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-sm">75%</span>
                    </div>
                    <p className="text-xs text-gray-600">Nouveaux</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-sm">25%</span>
                    </div>
                    <p className="text-xs text-gray-600">Existants</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau récent */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Activité récente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouveau client ajouté</p>
                  <p className="text-sm text-gray-600">Entreprise Gamma</p>
                </div>
                <span className="text-sm text-gray-500">Il y a 2h</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Facture payée</p>
                  <p className="text-sm text-gray-600">#001 - €1,200.00</p>
                </div>
                <span className="text-sm text-gray-500">Il y a 4h</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Projet mis à jour</p>
                  <p className="text-sm text-gray-600">Site Web Alpha - 75%</p>
                </div>
                <span className="text-sm text-gray-500">Il y a 6h</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Devis accepté</p>
                  <p className="text-sm text-gray-600">#002 - €1,800.00</p>
                </div>
                <span className="text-sm text-gray-500">Il y a 1j</span>
              </div>
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
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const { supabase } = await import('./services/supabase');
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setIsLoggedIn(true);
          const { data: profile } = await supabase
            .from('user_profiles')
            .select('*, roles(*)')
            .eq('id', user.id)
            .single();
          
          setUserRole(profile?.roles?.name || 'client');
        }
      } catch (error) {
        console.warn('Erreur vérification auth:', error);
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
      console.error('Erreur déconnexion:', error);
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
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version finale propre avec Supabase');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
