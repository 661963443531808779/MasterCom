import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Composant de navigation simple
const SimpleNavbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">MasterCom</h1>
      <div className="space-x-4">
        <a href="/" className="hover:text-blue-200">Accueil</a>
        <a href="/about" className="hover:text-blue-200">À propos</a>
        <a href="/contact" className="hover:text-blue-200">Contact</a>
      </div>
    </div>
  </nav>
);

// Page d'accueil simple
const SimpleHome = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Bienvenue chez <span className="text-blue-600">MasterCom</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Votre partenaire de confiance pour tous vos besoins en communication.
          Nous transformons vos idées en succès mesurables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Stratégie</h3>
            <p className="text-gray-600">Développement de stratégies sur-mesure pour optimiser votre image de marque.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Créativité</h3>
            <p className="text-gray-600">Création d'identités visuelles impactantes et mémorables.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Digital</h3>
            <p className="text-gray-600">Gestion complète de votre présence sur les réseaux sociaux.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Page À propos simple
const SimpleAbout = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">À propos de MasterCom</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          MasterCom est une agence de communication moderne qui allie créativité et stratégie 
          pour créer des campagnes mémorables et efficaces.
        </p>
      </div>
    </div>
  </div>
);

// Page Contact simple
const SimpleContact = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contactez-nous</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Prêt à donner une nouvelle dimension à votre communication ? 
          Discutons de votre projet.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input 
              type="email" 
              placeholder="Votre email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea 
              placeholder="Votre message" 
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

// Footer simple
const SimpleFooter = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 MasterCom. Tous droits réservés.</p>
    </div>
  </footer>
);

// Application principale simplifiée
function AppFallback() {
  console.log('🚀 MasterCom - Version de fallback simplifiée');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <SimpleNavbar />
        
        <main>
          <Routes>
            <Route path="/" element={<SimpleHome />} />
            <Route path="/about" element={<SimpleAbout />} />
            <Route path="/contact" element={<SimpleContact />} />
            <Route path="*" element={<SimpleHome />} />
          </Routes>
        </main>

        <SimpleFooter />
      </div>
    </Router>
  );
}

export default AppFallback;
