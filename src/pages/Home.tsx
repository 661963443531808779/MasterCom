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
      {/* Hero Section avec design professionnel et clair */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 overflow-hidden">
        {/* Effets de fond animés */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Particules flottantes subtiles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-indigo-300 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-35"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-3/4 left-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full animate-pulse opacity-30"></div>
          
          {/* Grille de fond animée */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
          
          {/* Effets de lumière subtils */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
          <div className="text-center w-full">
            {/* Logo avec effet sparkles */}
            <div className="relative mb-8">
              <div className="inline-block relative">
                <h1 className="text-6xl md:text-8xl font-display mb-6 animate-fade-in bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Master<span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">Com</span>
                </h1>
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-blue-500 animate-pulse" />
                <Star className="absolute -bottom-1 -left-1 h-6 w-6 text-indigo-500 animate-bounce" />
                <Heart className="absolute top-1/2 -right-8 h-5 w-5 text-purple-500 animate-pulse" />
              </div>
            </div>
            
            <p className="text-2xl md:text-3xl mb-8 text-gray-700 max-w-4xl mx-auto font-body leading-relaxed">
              <span className="text-blue-600 font-heading">Votre partenaire créatif</span> pour une communication 
              <span className="text-indigo-600 font-heading"> d'exception</span><br/>
              Nous transformons vos <span className="text-purple-600 font-heading">idées</span> en 
              <span className="text-blue-700 font-heading"> succès mesurables</span><br/>
              <span className="text-lg text-gray-600 mt-4 block">🚀 Startup innovante - Prêts à révolutionner votre communication</span>
            </p>
            
            {/* Boutons avec effets visuels */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link
                to="/contact"
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <Zap className="mr-3 h-6 w-6" />
                <span className="relative">Nous contacter</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center px-10 py-5 bg-transparent border-3 border-blue-600 text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <Users className="mr-3 h-6 w-6" />
                Découvrir l'équipe
                <Sparkles className="ml-3 h-5 w-5 group-hover:animate-spin" />
              </Link>
            </div>

            {/* Indicateurs de performance - Version Startup */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">0</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
                <div className="text-xs text-gray-500 mt-1">En cours de développement</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-indigo-600 mb-1 group-hover:scale-110 transition-transform duration-300">0</div>
                <div className="text-sm text-gray-600">Projets réalisés</div>
                <div className="text-xs text-gray-500 mt-1">Premiers projets à venir</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-purple-600 mb-1 group-hover:scale-110 transition-transform duration-300">3</div>
                <div className="text-sm text-gray-600">Experts créatifs</div>
                <div className="text-xs text-gray-500 mt-1">Équipe en formation</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-bold text-blue-700 mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-gray-600">Engagement qualité</div>
                <div className="text-xs text-gray-500 mt-1">Excellence garantie</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Vague décorative avec gradient bleu */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#gradient)"></path>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Services Preview avec design professionnel */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Effets de fond subtils */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-15 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-15 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-200 rounded-full opacity-10 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Nos Expertises
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-light">
              Une approche <span className="text-blue-600 font-bold">360°</span> pour répondre à tous vos besoins en communication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const colors = [
                'from-blue-500 to-blue-600',
                'from-indigo-500 to-indigo-600', 
                'from-purple-500 to-purple-600',
                'from-blue-600 to-indigo-600'
              ];
              const bgColors = [
                'bg-gradient-to-br from-blue-50 to-blue-100',
                'bg-gradient-to-br from-indigo-50 to-indigo-100',
                'bg-gradient-to-br from-purple-50 to-purple-100', 
                'bg-gradient-to-br from-blue-50 to-indigo-100'
              ];
              
              return (
                <div
                  key={index}
                  className={`group relative p-8 ${bgColors[index]} rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-2 border-transparent hover:border-white/50 backdrop-blur-sm`}
                >
                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  <div className={`relative z-10 text-center`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors[index]} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white text-2xl">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/services"
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-xl rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Sparkles className="mr-3 h-6 w-6" />
              <span className="relative">Voir tous nos services</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section avec design professionnel */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-300 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full opacity-5 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
              Nos Performances
            </h2>
            <p className="text-xl text-blue-100">
              Des chiffres qui parlent d'eux-mêmes
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-black mb-2 bg-gradient-to-r from-blue-200 to-blue-300 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  0
                </div>
                <div className="text-blue-100 font-medium">Clients satisfaits</div>
                <div className="text-blue-200 text-xs mt-1">En cours de développement</div>
                <Star className="absolute -top-2 -right-2 h-6 w-6 text-blue-300 animate-pulse" />
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-black mb-2 bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  0
                </div>
                <div className="text-blue-100 font-medium">Projets réalisés</div>
                <div className="text-blue-200 text-xs mt-1">Premiers projets à venir</div>
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-blue-300 animate-pulse" />
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-black mb-2 bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="text-blue-100 font-medium">Experts créatifs</div>
                <div className="text-blue-200 text-xs mt-1">Équipe en formation</div>
                <Zap className="absolute -top-2 -right-2 h-6 w-6 text-blue-300 animate-pulse" />
              </div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="text-6xl font-black mb-2 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-blue-100 font-medium">Engagement qualité</div>
                <div className="text-blue-200 text-xs mt-1">Excellence garantie</div>
                <Heart className="absolute -top-2 -right-2 h-6 w-6 text-blue-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section finale professionnelle */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        {/* Effets de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full opacity-5 animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Prêt à donner une nouvelle dimension à votre communication ?
          </h2>
          <p className="text-2xl mb-12 text-blue-100 font-light leading-relaxed">
            Discutons de votre projet et découvrons ensemble comment nous pouvons vous aider à briller !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center px-12 py-6 bg-white text-blue-700 font-black text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-white/25"
            >
              <div className="absolute inset-0 bg-white rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <Zap className="mr-3 h-7 w-7" />
              <span className="relative">Demander un devis gratuit</span>
              <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/portfolio"
              className="group inline-flex items-center px-12 py-6 bg-transparent border-3 border-white text-white font-black text-xl rounded-2xl hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              <Sparkles className="mr-3 h-7 w-7" />
              Voir nos réalisations
              <Star className="ml-3 h-6 w-6 group-hover:animate-spin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;