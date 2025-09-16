import { useState, FC } from 'react';
import { ArrowRight, ExternalLink, Calendar, Target } from 'lucide-react';

const Portfolio: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'branding', name: 'Branding' },
    { id: 'digital', name: 'Marketing Digital' },
    { id: 'events', name: 'Événementiel' },
    { id: 'social', name: 'Réseaux Sociaux' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Rebranding TechStart',
      category: 'branding',
      client: 'TechStart SAS',
      year: '2024',
      image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Refonte complète de l\'identité visuelle d\'une startup technologique en pleine expansion.',
      objectives: [
        'Moderniser l\'image de marque',
        'Améliorer la reconnaissance',
        'Créer une cohérence visuelle'
      ],
      results: [
        '+45% de reconnaissance de marque',
        '+30% d\'engagement client',
        'Nouvelle identité déployée sur 12 pays'
      ],
      services: ['Stratégie de marque', 'Création logo', 'Charte graphique', 'Supports print & digital'],
    },
    {
      id: 2,
      title: 'Campagne Digitale EcoMode',
      category: 'digital',
      client: 'EcoMode Fashion',
      year: '2024',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Stratégie marketing digital 360° pour le lancement d\'une marque de mode éthique.',
      objectives: [
        'Lancer la marque sur le marché français',
        'Générer du trafic qualifié',
        'Créer une communauté engagée'
      ],
      results: [
        '+200% de visiteurs web',
        '15K followers Instagram en 6 mois',
        'ROI de 400% sur les campagnes paid'
      ],
      services: ['SEO', 'Social Ads', 'Content Marketing', 'Influence Marketing'],
    },
    {
      id: 3,
      title: 'Salon Innovation 2024',
      category: 'events',
      client: 'Innovation Hub',
      year: '2024',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Organisation complète du salon de l\'innovation technologique avec 500 exposants.',
      objectives: [
        'Rassembler 10 000 visiteurs',
        'Créer un événement mémorable',
        'Faciliter les échanges B2B'
      ],
      results: [
        '12 500 visiteurs sur 3 jours',
        '85% de satisfaction exposants',
        '2 500 rendez-vous B2B générés'
      ],
      services: ['Conception événementielle', 'Logistique', 'Communication', 'Relations presse'],
    },
    {
      id: 4,
      title: 'Stratégie Social Media FoodCorp',
      category: 'social',
      client: 'FoodCorp Industries',
      year: '2023',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Développement de la présence social media d\'un groupe agroalimentaire.',
      objectives: [
        'Humaniser la marque corporate',
        'Engager les consommateurs',
        'Améliorer l\'e-réputation'
      ],
      results: [
        '+150% d\'engagement moyen',
        '+80% de followers LinkedIn',
        'Sentiment positif de 92%'
      ],
      services: ['Stratégie social media', 'Content creation', 'Community management', 'Influence'],
    },
    {
      id: 5,
      title: 'Lancement Produit InnovHealth',
      category: 'branding',
      client: 'InnovHealth Lab',
      year: '2023',
      image: 'https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Stratégie de lancement complète pour un nouveau produit de santé connectée.',
      objectives: [
        'Créer l\'identité du produit',
        'Sensibiliser le marché',
        'Générer des pre-commandes'
      ],
      results: [
        '5000 pre-commandes en 2 mois',
        'Couverture presse dans 15 médias',
        'Taux de conversion de 12%'
      ],
      services: ['Product branding', 'PR Campaign', 'Digital Strategy', 'Event Marketing'],
    },
    {
      id: 6,
      title: 'Transformation Digitale RetailPlus',
      category: 'digital',
      client: 'RetailPlus Group',
      year: '2023',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Accompagnement dans la transformation digitale d\'une chaîne de magasins.',
      objectives: [
        'Digitiser l\'expérience client',
        'Créer un écosystème omnicanal',
        'Former les équipes'
      ],
      results: [
        '+60% de ventes en ligne',
        'App mobile: 4.8/5 étoiles',
        '90% des équipes formées'
      ],
      services: ['Digital Strategy', 'UX/UI Design', 'Formation', 'Change Management'],
    },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Réalisations</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {categories.find(c => c.id === project.category)?.name}
                    </span>
                    <span className="text-gray-500 text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{project.client}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold">
                    <span>Voir le projet</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
              >
                ×
              </button>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>{selectedProject.client}</span>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
                  {categories.find(c => c.id === selectedProject.category)?.name}
                </span>
              </div>

              <p className="text-lg text-gray-700 mb-8">{selectedProject.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-blue-600" />
                    Objectifs
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></span>
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-green-600" />
                    Résultats
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Services fournis</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Voir le site web
                </button>
                <button className="flex items-center justify-center px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Projet similaire ?
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;