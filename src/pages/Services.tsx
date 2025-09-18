import { FC } from 'react';
import { Target, Lightbulb, Users, Award, BarChart3, Calendar } from 'lucide-react';

const Services: FC = () => {
  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Stratégie de Communication',
      description: 'Développement de stratégies sur-mesure pour optimiser votre image de marque et votre positionnement.',
      features: ['Audit de communication', 'Définition de l\'identité de marque', 'Plan de communication', 'Positionnement concurrentiel']
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Créativité & Design',
      description: 'Création d\'identités visuelles impactantes et mémorables qui reflètent votre personnalité.',
      features: ['Logo et identité visuelle', 'Charte graphique', 'Supports de communication', 'Packaging design']
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Réseaux Sociaux',
      description: 'Gestion complète de votre présence sur les réseaux sociaux pour maximiser votre engagement.',
      features: ['Stratégie social media', 'Création de contenu', 'Community management', 'Influence marketing']
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Marketing Digital',
      description: 'Optimisation de votre présence digitale avec des campagnes performantes et mesurables.',
      features: ['SEO/SEA', 'Email marketing', 'Publicité en ligne', 'Analytics et reporting']
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Événementiel',
      description: 'Organisation d\'événements corporates et relations publiques pour renforcer votre image.',
      features: ['Organisation d\'événements', 'Relations presse', 'Partenariats', 'Communication de crise']
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Formation & Conseil',
      description: 'Formation de vos équipes et conseil stratégique pour développer vos compétences.',
      features: ['Formation communication', 'Coaching dirigeants', 'Conseil stratégique', 'Accompagnement']
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Découverte',
      description: 'Nous analysons vos besoins et votre environnement concurrentiel pour comprendre vos enjeux.'
    },
    {
      step: '02',
      title: 'Stratégie',
      description: 'Nous développons une stratégie personnalisée alignée sur vos objectifs business.'
    },
    {
      step: '03',
      title: 'Création',
      description: 'Nous créons des solutions créatives et impactantes qui marquent les esprits.'
    },
    {
      step: '04',
      title: 'Déploiement',
      description: 'Nous accompagnons la mise en œuvre et assurons le suivi de performance.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Des solutions complètes pour tous vos besoins de communication
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Domaines d'Expertise</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services de communication
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="text-blue-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Processus */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Processus</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de vos projets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à transformer votre communication ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Demander un devis
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
