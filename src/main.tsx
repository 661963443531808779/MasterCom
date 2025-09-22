import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Gestion d'erreur globale pour le rendu
window.addEventListener('error', (event) => {
  console.error('❌ Erreur globale dans main.tsx:', event.error);
});

// Fonction pour charger l'application avec fallback
const loadApp = async () => {
  try {
    // Essayer de charger l'application principale
    const { default: App } = await import('./App.tsx');
    return App;
  } catch (error) {
    console.warn('⚠️ Impossible de charger App.tsx, utilisation du fallback:', error);
    try {
      // Charger la version de fallback
      const { default: AppFallback } = await import('./App-fallback.tsx');
      return AppFallback;
    } catch (fallbackError) {
      console.error('❌ Impossible de charger même le fallback:', fallbackError);
      return null;
    }
  }
};

// Vérifier que l'élément root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('❌ Root element not found');
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
    // Charger et rendre l'application
    loadApp().then((AppComponent) => {
      if (AppComponent) {
        const root = createRoot(rootElement);
        root.render(
          <StrictMode>
            <AppComponent />
          </StrictMode>
        );
        console.log('✅ Application rendue avec succès');
      } else {
        // Afficher une erreur si aucun composant ne peut être chargé
        rootElement.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui;">
            <div style="text-align: center; padding: 20px;">
              <h1 style="color: #dc2626;">Erreur de Chargement</h1>
              <p style="color: #6b7280;">Impossible de charger l'application.</p>
              <button onclick="window.location.reload()" style="background: #2563eb; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">
                Rafraîchir
              </button>
            </div>
          </div>
        `;
      }
    });
  } catch (error) {
    console.error('❌ Erreur lors du rendu:', error);
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