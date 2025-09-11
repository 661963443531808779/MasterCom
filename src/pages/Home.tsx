import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, Award } from 'lucide-react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const services = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Stratégie Communication',
      description: 'Développement de stratégies sur-mesure pour optimiser votre image de marque.',
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Créativité & Design',
      description: 'Création d\'identités visuelles impactantes et mémorables.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Réseaux Sociaux',
      description: 'Gestion complète de votre présence sur les réseaux sociaux.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Événementiel',
      description: 'Organisation d\'événements corporates et relations publiques.',
    },
  ];

  return (
    <>
      <SEO 
        title="Accueil - MasterCom"
        description="Découvrez MasterCom, votre agence de communication professionnelle. Services de branding, marketing digital, réseaux sociaux et événementiel avec CRM intégré."
        keywords="agence communication, branding, marketing digital, réseaux sociaux, événementiel, MasterCom"
      />
      <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Master<span className="text-orange-400">Com</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Votre partenaire créatif pour une communication d'exception. 
              Nous transformons vos idées en succès mesurables.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Découvrir l'équipe
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Expertises</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche 360° pour répondre à tous vos besoins en communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-blue-600 mb-4 group-hover:text-orange-500 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              Voir tous nos services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">300+</div>
              <div className="text-gray-600">Projets réalisés</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">15</div>
              <div className="text-gray-600">Experts créatifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à donner une nouvelle dimension à votre communication ?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Discutons de votre projet et découvrons ensemble comment nous pouvons vous aider.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            Demander un devis gratuit
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default Home;