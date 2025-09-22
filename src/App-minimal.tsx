import React from 'react';

function App() {
  console.log('🚀 App MasterCom - Version minimale');

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ 
          color: '#2563eb', 
          fontSize: '3rem', 
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          Master<span style={{ color: '#f59e0b' }}>Com</span>
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.2rem',
          marginBottom: '2rem'
        }}>
          Votre partenaire de communication professionnelle
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <h3 style={{ color: '#2563eb', marginBottom: '0.5rem' }}>Stratégie</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Développement de stratégies sur-mesure
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#fef3c7',
            borderRadius: '8px',
            border: '1px solid #fde68a'
          }}>
            <h3 style={{ color: '#d97706', marginBottom: '0.5rem' }}>Créativité</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Identités visuelles impactantes
            </p>
          </div>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#ecfdf5',
            borderRadius: '8px',
            border: '1px solid #d1fae5'
          }}>
            <h3 style={{ color: '#059669', marginBottom: '0.5rem' }}>Digital</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Gestion réseaux sociaux
            </p>
          </div>
        </div>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          🚀 Application Chargée avec Succès !
        </button>
      </div>
    </div>
  );
}

export default App;
