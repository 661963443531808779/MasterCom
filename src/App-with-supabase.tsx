import { useState, useEffect, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Import Supabase avec gestion d'erreur
import { supabase as supabaseClient } from './services/supabase';

let supabase: any = null;

// Initialiser Supabase
try {
  supabase = supabaseClient;
  console.log('✅ Supabase initialisé avec succès');
} catch (error) {
  console.warn('⚠️ Erreur initialisation Supabase:', error);
  // Mock Supabase
  supabase = {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Mock auth' } }),
      signOut: async () => ({ error: null })
    }
  };
}

// Composant Home simple
const Home: FC = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ color: '#1f2937', fontSize: '2.5rem', marginBottom: '1rem' }}>
      MasterCom
    </h1>
    <p style={{ color: '#6b7280', fontSize: '1.2rem', marginBottom: '2rem' }}>
      Agence de Communication Professionnelle
    </p>
    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <button 
        onClick={() => window.location.href = '/login'}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Connexion
      </button>
      <button 
        onClick={() => window.location.href = '/crm'}
        style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        CRM
      </button>
    </div>
  </div>
);

// Composant Login avec Supabase
const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('🔐 Tentative de connexion avec:', email);
      
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error('❌ Erreur auth:', authError.message);
        setError('Email ou mot de passe incorrect');
      } else if (data && data.user) {
        console.log('✅ Connexion réussie:', data.user.email);
        window.location.href = '/crm';
      }
    } catch (error) {
      console.error('❌ Erreur connexion:', error);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#1f2937' }}>
          Connexion MasterCom
        </h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.375rem',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
              Email
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              placeholder="votre@email.com"
              required
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
              Mot de passe
            </label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '1rem'
              }}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              color: '#6b7280',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ← Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

// Composant CRM simple
const CRM: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Vérification authentification CRM...');
        
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.warn('⚠️ Erreur auth:', error.message);
        } else if (user) {
          console.log('✅ Utilisateur connecté:', user.email);
          setIsLoggedIn(true);
        } else {
          console.log('❌ Aucun utilisateur connecté');
        }
      } catch (error) {
        console.error('❌ Erreur vérification auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#1f2937', fontSize: '2rem', margin: 0 }}>
          CRM MasterCom
        </h1>
        <button 
          onClick={async () => {
            try {
              await supabase.auth.signOut();
              window.location.href = '/';
            } catch (error) {
              console.error('Erreur déconnexion:', error);
            }
          }}
          style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Gestion des Clients</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Gérez vos clients et leurs informations.
          </p>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Accéder
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Factures</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Créez et gérez vos factures.
          </p>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Accéder
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>Projets</h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Suivez l'avancement de vos projets.
          </p>
          <button style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}>
            Accéder
          </button>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

// Navigation simple
const Navigation: FC = () => (
  <nav style={{
    backgroundColor: 'white',
    padding: '1rem 2rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ color: '#1f2937', fontSize: '1.5rem', margin: 0 }}>
        MasterCom
      </h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={() => window.location.href = '/'}
          style={{
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Accueil
        </button>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Connexion
        </button>
      </div>
    </div>
  </nav>
);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('🚀 App avec Supabase démarré');
    
    // Simulation d'un chargement
    setTimeout(() => {
      setIsLoading(false);
      console.log('✅ Chargement terminé');
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Chargement de MasterCom...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function App() {
  console.log('🚀 App MasterCom - Version avec Supabase');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
