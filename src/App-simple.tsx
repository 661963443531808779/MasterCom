import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composant Home simple pour tester
const Home = () => (
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

// Composant Login simple
const Login = () => (
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
      <form onSubmit={(e) => e.preventDefault()}>
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

// Composant CRM simple
const CRM = () => (
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
        onClick={() => window.location.href = '/'}
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

// Navigation simple
const Navigation = () => (
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

function App() {
  console.log('🚀 App MasterCom Simple - Démarrage');
  
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
