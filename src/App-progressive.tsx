import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

console.log('🚀 App Progressive - Démarrage');

// Import direct pour les composants essentiels
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading pour les pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Login = lazy(() => import('./pages/Login-test'));
// const CRM = lazy(() => import('./pages/CRM'));
// const Dashboard = lazy(() => import('./pages/Dashboard'));

// Composant de loading simple
const LoadingSpinner = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    flexDirection: 'column'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #3b82f6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ marginTop: '10px', color: '#6b7280' }}>Chargement...</p>
  </div>
);

// CSS inline pour l'animation
const spinAnimation = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Injecter le CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinAnimation;
  document.head.appendChild(style);
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('client');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔍 App Progressive - Initialisation');
    
    // Simulation d'un check auth simple
    setTimeout(() => {
      setIsLoading(false);
      console.log('✅ Chargement terminé');
    }, 1000);
  }, []);

  const handleLogin = (role: string) => {
    console.log('🔐 Connexion avec le rôle:', role);
    setIsLoggedIn(true);
    setUserRole(role);
    
    // Redirection après login - temporairement vers la page d'accueil
    navigate('/');
    console.log('✅ Connexion réussie, redirection vers la page d\'accueil');
  };

  const handleLogout = () => {
    console.log('🚪 Déconnexion');
    setIsLoggedIn(false);
    setUserRole('client');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <h2>🚀 MasterCom</h2>
          <p>Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  console.log('🔍 Rendu AppContent - isLoggedIn:', isLoggedIn, 'userRole:', userRole);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Navbar
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {/* Routes CRM et Dashboard temporairement désactivées pour debug */}
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  console.log('🚀 App Progressive - Version complète');

  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;