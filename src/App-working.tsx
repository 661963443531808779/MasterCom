import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Composant de navigation simple
const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        MasterCom
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-200">Accueil</Link>
        <Link to="/about" className="hover:text-blue-200">À propos</Link>
        <Link to="/services" className="hover:text-blue-200">Services</Link>
        <Link to="/contact" className="hover:text-blue-200">Contact</Link>
      </div>
    </div>
  </nav>
);

// Page d'accueil
const Home = () => (
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

// Page À propos
const About = () => (
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

// Page Services
const Services = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Nos Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Communication Digitale</h3>
            <p className="text-gray-600">Stratégie et création de contenu pour vos réseaux sociaux.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Branding</h3>
            <p className="text-gray-600">Création d'identité visuelle et développement de marque.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Page Contact
const Contact = () => (
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

// Footer
const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; 2024 MasterCom. Tous droits réservés.</p>
    </div>
  </footer>
);

// Application principale
function App() {
  console.log('🚀 MasterCom - Version fonctionnelle avec Tailwind');

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;