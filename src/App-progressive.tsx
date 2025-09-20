import { useState, useEffect, FC } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

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
        onClick={() => window.location.href = '/about'}
        style={{
          backgroundColor: '#6b7280',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        À propos
      </button>
    </div>
  </div>
);

// Composant Login simple
const Login: FC = () => (
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
      <form>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
            Email
          </label>
          <input 
            type="email"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
            placeholder="votre@email.com"
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151' }}>
            Mot de passe
          </label>
          <input 
            type="password"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
            placeholder="••••••••"
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
            borderRadius: '0.375rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Se connecter
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

// Composant About simple
const About: FC = () => (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h1 style={{ color: '#1f2937', fontSize: '2.5rem', marginBottom: '1rem' }}>
      À propos de MasterCom
    </h1>
    <p style={{ color: '#6b7280', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
      MasterCom est une agence de communication professionnelle spécialisée dans le branding, 
      le marketing digital et la gestion de projets. Nous accompagnons nos clients dans 
      leur transformation digitale et leur stratégie de communication.
    </p>
    <div style={{ 
      display: 'flex', 
      gap: '1rem', 
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      <button 
        onClick={() => window.location.href = '/'}
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
        Accueil
      </button>
    </div>
  </div>
);

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
          onClick={() => window.location.href = '/about'}
          style={{
            color: '#6b7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          À propos
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
    console.log('🚀 App progressive démarré');
    
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
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
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
  console.log('🚀 App MasterCom - Version progressive');
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
