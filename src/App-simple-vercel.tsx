import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import statique de Supabase
import { supabase } from './services/supabase';

// Types simples
interface User {
  id: string;
  email: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  console.log('🚀 App MasterCom - Version Ultra-Simple Vercel');

  // Vérifier la session utilisateur
  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('🔍 Vérification de la session...');
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('❌ Erreur session:', error.message);
          return;
        }

        if (session?.user) {
          console.log('✅ Session trouvée:', session.user.email);
          setUser(session.user);
        } else {
          console.log('ℹ️ Aucune session');
        }
      } catch (error) {
        console.error('❌ Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth change:', event);
        
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Gestion de la connexion
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log('🔐 Connexion:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Erreur:', error.message);
        throw error;
      }

      if (data.user) {
        console.log('✅ Connecté:', data.user.email);
        setUser(data.user);
        return data.user;
      }
    } catch (error: any) {
      console.error('❌ Erreur connexion:', error);
      throw error;
    }
  };

  // Gestion de la déconnexion
  const handleLogout = async () => {
    try {
      console.log('🚪 Déconnexion...');
      await supabase.auth.signOut();
      setUser(null);
      console.log('✅ Déconnecté');
    } catch (error) {
      console.error('❌ Erreur déconnexion:', error);
      setUser(null);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        {/* Navigation simple */}
        <nav style={{
          backgroundColor: '#1f2937',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>
            MasterCom
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {user ? (
              <>
                <span style={{ color: 'white' }}>Bonjour, {user.email}</span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                  }}
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <a
                href="/login"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  borderRadius: '0.25rem'
                }}
              >
                Connexion
              </a>
            )}
          </div>
        </nav>

        {/* Contenu principal */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            {/* Page d'accueil simple */}
            <Route path="/" element={
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1f2937' }}>
                  Bienvenue sur MasterCom
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
                  Votre plateforme de gestion complète
                </p>
                {user ? (
                  <div>
                    <p style={{ color: 'green', marginBottom: '1rem' }}>
                      ✅ Vous êtes connecté en tant que {user.email}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <a
                        href="/dashboard"
                        style={{
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '0.75rem 1.5rem',
                          textDecoration: 'none',
                          borderRadius: '0.5rem'
                        }}
                      >
                        Dashboard
                      </a>
                      <a
                        href="/crm"
                        style={{
                          backgroundColor: '#10b981',
                          color: 'white',
                          padding: '0.75rem 1.5rem',
                          textDecoration: 'none',
                          borderRadius: '0.5rem'
                        }}
                      >
                        CRM
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href="/login"
                    style={{
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      padding: '0.75rem 2rem',
                      textDecoration: 'none',
                      borderRadius: '0.5rem',
                      fontSize: '1.25rem'
                    }}
                  >
                    Se connecter
                  </a>
                )}
              </div>
            } />
            
            {/* Route de connexion */}
            <Route 
              path="/login" 
              element={
                user ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1f2937' }}>
                      Connexion
                    </h2>
                    <form onSubmit={async (e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target as HTMLFormElement);
                      const email = formData.get('email') as string;
                      const password = formData.get('password') as string;
                      
                      try {
                        await handleLogin(email, password);
                      } catch (error: any) {
                        alert('Erreur: ' + error.message);
                      }
                    }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
                          Mot de passe
                        </label>
                        <input
                          type="password"
                          name="password"
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          padding: '0.75rem',
                          border: 'none',
                          borderRadius: '0.25rem',
                          fontSize: '1rem',
                          cursor: 'pointer'
                        }}
                      >
                        Se connecter
                      </button>
                    </form>
                  </div>
                )
              } 
            />
            
            {/* Routes protégées */}
            <Route 
              path="/dashboard" 
              element={
                user ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
                      Dashboard
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
                      Bienvenue dans votre tableau de bord, {user.email} !
                    </p>
                    <div style={{
                      backgroundColor: '#f3f4f6',
                      padding: '2rem',
                      borderRadius: '0.5rem',
                      maxWidth: '600px',
                      margin: '0 auto'
                    }}>
                      <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
                        Fonctionnalités disponibles
                      </h2>
                      <ul style={{ textAlign: 'left', color: '#374151' }}>
                        <li>✅ Authentification Supabase fonctionnelle</li>
                        <li>✅ Gestion des sessions utilisateur</li>
                        <li>✅ Interface responsive</li>
                        <li>✅ Déploiement Vercel réussi</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/crm" 
              element={
                user ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
                      CRM
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>
                      Module CRM en cours de développement...
                    </p>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Route par défaut */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Pied de page simple */}
        <footer style={{
          backgroundColor: '#1f2937',
          color: 'white',
          textAlign: 'center',
          padding: '2rem',
          marginTop: 'auto'
        }}>
          <p>&copy; 2024 MasterCom. Tous droits réservés.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
