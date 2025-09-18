import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App-minimal.tsx';
import './index.css';

// Vérifier que l'élément root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Créer le root React
const root = createRoot(rootElement);

// Rendre l'application
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);