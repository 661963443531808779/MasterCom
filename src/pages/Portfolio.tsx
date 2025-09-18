import { FC, useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';

const Portfolio: FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'branding', name: 'Branding' },
    { id: 'digital', name: 'Digital' },
    { id: 'events', name: 'Événementiel' },
    { id: 'social', name: 'Social Media' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Rebranding TechCorp',
      category: 'branding',
      image: '/api/placeholder/600/400',
      description: 'Refonte complète de l\'identité visuelle pour une entreprise tech innovante',
      tags: ['Logo', 'Charte graphique', 'Site web']
    },
    {
      id: 2,
      title: 'Campagne Social Media - Fashion Brand',
      category: 'social',
      image: '/api/placeholder/600/400',
      description: 'Stratégie et création de contenu pour une marque de mode',
      tags: ['Instagram', 'Facebook', 'TikTok']
    },
    {
      id: 3,
      title: 'Lancement Produit - Startup',
      category: 'digital',
      image: '/api/placeholder/600/400',
      description: 'Campagne de lancement digital pour une startup fintech',
      tags: ['SEO', 'Publicité', 'Email marketing']
    },
    {
      id: 4,
      title: 'Événement Corporate - Groupe International',
      category: 'events',
      image: '/api/placeholder/600/400',
      description: 'Organisation d\'un événement de 500 personnes',
      tags: ['Événementiel', 'Relations presse', 'Logistique']
    },
    {
      id: 5,
      title: 'Site E-commerce - Retail',
      category: 'digital',
      image: '/api/placeholder/600/400',
      description: 'Création d\'une plateforme e-commerce sur-mesure',
      tags: ['E-commerce', 'UX/UI', 'Intégration']
    },
    {
      id: 6,
      title: 'Identité Visuelle - Restaurant',
      category: 'branding',
      image: '/api/placeholder/600/400',
      description: 'Création de l\'identité complète pour un restaurant gastronomique',
      tags: ['Logo', 'Menu', 'Décoration']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Réalisations</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Découvrez nos projets les plus marquants et laissez-vous inspirer
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <div className="bg-gray-200 h-64 flex items-center justify-center">
                    <Eye className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center transition-opacity">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Voir le projet
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Chiffres</h2>
            <p className="text-lg text-gray-600">
              Des résultats qui parlent d'eux-mêmes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Prix remportés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
              <div className="text-gray-600">Années d'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Votre projet sera le prochain ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment nous pouvons transformer vos idées en succès
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Démarrer un projet
          </button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
