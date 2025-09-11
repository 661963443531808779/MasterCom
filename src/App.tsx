import React, { Suspense, lazy, memo } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DebugAuth from './components/DebugAuth';
import ErrorBoundary from './components/ErrorBoundary';
import GlobalErrorHandler from './components/GlobalErrorHandler';
import LoadingFallback from './components/LoadingFallback';
import FastLoading from './components/FastLoading';

// Lazy loading des pages pour optimiser le chargement initial
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const CRM = lazy(() => import('./pages/CRM'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));

const AppRoutes = memo(() => {
  const { isAuthenticated, user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  // Chargement immédiat sans attendre l'auth
  if (isLoading) {
    // Timeout de sécurité pour éviter le blocage infini
    setTimeout(() => {
      console.log('⚠️ Timeout de chargement - passage en mode non-authentifié');
    }, 2000);
    
    return <FastLoading message="Chargement de MasterCom..." fullScreen showProgress />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        isLoggedIn={isAuthenticated} 
        userRole={user?.role_id || 'client'} 
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
          <Route 
            path="/login" 
            element={
              <Login 
                onLogin={(role) => {
                  // Navigation sécurisée avec React Router
                  if (role === 'master') {
                    navigate('/dashboard');
                  } else {
                    navigate('/crm');
                  }
                }} 
              />
            } 
          />
          <Route 
            path="/crm" 
            element={isAuthenticated ? <CRM userRole={user?.role_id || 'client'} /> : <Login onLogin={() => {}} />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated && user?.role_id === 'master' ? <Dashboard /> : <Login onLogin={() => {}} />} 
          />
        </Routes>
      </main>
      <Footer />
      {!import.meta.env.DEV && <DebugAuth />}
    </div>
  );
});

function App() {
  return (
    <GlobalErrorHandler>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Suspense fallback={<FastLoading message="Chargement..." />}>
              <AppRoutes />
            </Suspense>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </GlobalErrorHandler>
  );
}

export default App;