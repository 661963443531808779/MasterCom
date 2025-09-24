import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Target, Lightbulb, Award, Sparkles, Zap, Star, Heart } from 'lucide-react';

const Home: FC = () => {
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
    <div className="relative overflow-hidden">
      {/* Hero Section avec effets visuels époustouflants */}
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        {/* Effets de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Particules flottantes colorées */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-80"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce opacity-80"></div>
          <div className="absolute top-3/4 left-1/2 w-3.5 h-3.5 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
          
          {/* Grille de fond animée */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
          
          {/* Effets de lumière colorés */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
          <div className="text-center w-full">
            {/* Logo avec effet sparkles */}
            <div className="relative mb-8">
              <div className="inline-block relative">
                <h1 className="text-6xl md:text-8xl font-black mb-6 animate-fade-in bg-gradient-to-r from-white via-yellow-200 to-pink-200 bg-clip-text text-transparent">
                  Master<span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">Com</span>
                </h1>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-400 animate-pulse" />
                <Star className="absolute -bottom-1 -left-1 h-6 w-6 text-pink-400 animate-bounce" />
                <Heart className="absolute top-1/2 -right-8 h-5 w-5 text-red-400 animate-pulse" />
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl mb-8 text-gray-200 max-w-4xl mx-auto font-light leading-relaxed">
              ✨ <span className="text-yellow-300 font-semibold">Votre partenaire créatif</span> pour une communication 
              <span className="text-pink-300 font-semibold"> d'exception</span> ✨<br/>
              Nous transformons vos <span className="text-cyan-300 font-semibold">idées</span> en 
              <span className="text-green-300 font-semibold"> succès mesurables</span>
            </p>
            
            {/* Boutons avec effets visuels */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/contact"
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-yellow-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Zap className="mr-3 h-6 w-6" />
                <span className="relative">Nous contacter</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center px-10 py-5 bg-transparent border-3 border-white text-white font-bold text-lg rounded-2xl hover:bg-white hover:text-purple-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Users className="mr-3 h-6 w-6" />
                Découvrir l'équipe
                <Sparkles className="ml-3 h-5 w-5 group-hover:animate-spin" />
              </Link>
            </div>

            {/* Indicateurs de performance */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">150+</div>
                <div className="text-sm text-gray-300">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-1">300+</div>
                <div className="text-sm text-gray-300">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">15</div>
                <div className="text-sm text-gray-300">Experts créatifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">98%</div>
                <div className="text-sm text-gray-300">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vague décorative avec gradient */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#gradient)"></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
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
  );
};

export default Home;