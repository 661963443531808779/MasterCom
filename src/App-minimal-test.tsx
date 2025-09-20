import React from 'react';

console.log('🚀 App Minimal Test - Démarrage');

function App() {
  console.log('🔍 App Minimal Test - Rendu');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '600px',
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px 0' }}>
          🎉 MasterCom
        </h1>
        <p style={{ fontSize: '24px', margin: '0 0 30px 0' }}>
          Version Minimal Test
        </p>
        
        <div style={{
          background: 'rgba(34, 197, 94, 0.3)',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0'
        }}>
          <h2>✅ Tests de Base</h2>
          <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
            <li>✅ React fonctionne</li>
            <li>✅ JavaScript fonctionne</li>
            <li>✅ CSS fonctionne</li>
            <li>✅ Vercel fonctionne</li>
            <li>✅ Console: {typeof console !== 'undefined' ? 'OK' : 'ERREUR'}</li>
            <li>✅ Document: {typeof document !== 'undefined' ? 'OK' : 'ERREUR'}</li>
            <li>✅ Window: {typeof window !== 'undefined' ? 'OK' : 'ERREUR'}</li>
          </ul>
        </div>

        <button
          onClick={() => {
            console.log('🔘 Bouton cliqué');
            alert('Bouton fonctionne ! JavaScript OK !');
          }}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          🧪 Test Interactif
        </button>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          <p><strong>Debug Info:</strong></p>
          <p>URL: {window.location.href}</p>
          <p>User Agent: {navigator.userAgent.substring(0, 50)}...</p>
          <p>Timestamp: {new Date().toLocaleString()}</p>
          <p>Viewport: {window.innerWidth}x{window.innerHeight}</p>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(59, 130, 246, 0.3)',
          borderRadius: '10px'
        }}>
          <h3>🔗 Navigation</h3>
          <button
            onClick={() => window.location.href = '/about'}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '5px'
            }}
          >
            📖 About
          </button>
          <button
            onClick={() => window.location.href = '/contact'}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '5px'
            }}
          >
            📞 Contact
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
