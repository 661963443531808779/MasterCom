import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx'; // Application complète MasterCom
import './index.css';

// Gestion d'erreur globale pour le rendu
window.addEventListener('error', () => {
});

// Vérifier que l'élément root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  document.body.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #dc2626;">Erreur de Chargement</h1>
        <p style="color: #6b7280;">Impossible de trouver l'élément root.</p>
        <button onclick="window.location.reload()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
          Rafraîchir
        </button>
      </div>
    </div>
  `;
} else {
  try {
    // Créer et rendre l'application
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #dc2626;">Erreur de Rendu</h1>
          <p style="color: #6b7280;">Une erreur s'est produite lors du rendu de l'application.</p>
          <button onclick="window.location.reload()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
            Rafraîchir
          </button>
        </div>
      </div>
    `;
  }
}