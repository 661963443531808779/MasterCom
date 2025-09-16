import { useState, FC } from 'react';
import { ArrowRight, Check, Target, Palette, Share2, Calendar, Megaphone, BarChart3 } from 'lucide-react';

const Services: FC = () => {
  const [selectedService, setSelectedService] = useState(0);

  const services = [
    {
      id: 0,
      icon: <Target className="h-12 w-12" />,
      title: 'Stratégie de Communication',
      description: 'Développement de stratégies sur-mesure pour optimiser votre positionnement et votre image de marque.',
      features: [
        'Audit de communication existante',
        'Définition des objectifs et KPIs',
        'Création de la stratégie globale',
        'Plan de communication annuel',
        'Suivi et optimisation continue'
      ],
      price: 'À partir de 2 500€',
      duration: '4-6 semaines',
    },
    {
      id: 1,
      icon: <Palette className="h-12 w-12" />,
      title: 'Branding & Identité Visuelle',
      description: 'Création d\'identités visuelles impactantes et mémorables qui reflètent vos valeurs.',
      features: [
        'Création de logo professionnel',
        'Charte graphique complète',
        'Déclinaisons tous supports',
        'Guide d\'utilisation de la marque',
        'Supports de communication'
      ],
      price: 'À partir de 3 500€',
      duration: '6-8 semaines',
    },
    {
      id: 2,
      icon: <Share2 className="h-12 w-12" />,
      title: 'Réseaux Sociaux',
      description: 'Gestion complète de votre présence sur les réseaux sociaux avec une approche data-driven.',
      features: [
        'Stratégie social media personnalisée',
        'Création de contenu engageant',
        'Community management',
        'Publicité sociale ciblée',
        'Reporting et analytics détaillés'
      ],
      price: 'À partir de 1 200€/mois',
      duration: 'Contrat mensuel',
    },
    {
      id: 3,
      icon: <Calendar className="h-12 w-12" />,
      title: 'Événementiel',
      description: 'Organisation d\'événements corporates et relations publiques pour marquer les esprits.',
      features: [
        'Conception d\'événements sur-mesure',
        'Gestion logistique complète',
        'Coordination des prestataires',
        'Communication événementielle',
        'Suivi post-événement'
      ],
      price: 'À partir de 5 000€',
      duration: '8-12 semaines',
    },
    {
      id: 4,
      icon: <Megaphone className="h-12 w-12" />,
      title: 'Relations Presse',
      description: 'Optimisation de votre visibilité média et gestion de votre réputation en ligne.',
      features: [
        'Stratégie de relations presse',
        'Rédaction de communiqués',
        'Gestion des relations journalistes',
        'Veille média et e-réputation',
        'Gestion de crise'
      ],
      price: 'À partir de 2 000€/mois',
      duration: 'Contrat mensuel',
    },
    {
      id: 5,
      icon: <BarChart3 className="h-12 w-12" />,
      title: 'Marketing Digital',
      description: 'Stratégies digitales complètes pour maximiser votre ROI et votre présence en ligne.',
      features: [
        'SEO et référencement naturel',
        'Campagnes publicitaires digitales',
        'Email marketing automatisé',
        'Analytics et tracking',
        'Optimisation des conversions'
      ],
      price: 'À partir de 1 800€/mois',
      duration: 'Contrat mensuel',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Des solutions sur-mesure pour tous vos besoins en communication
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services List */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez votre service</h2>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(index)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        selectedService === index
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-900 hover:bg-gray-50 shadow'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`${selectedService === index ? 'text-white' : 'text-blue-600'}`}>
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.title}</h3>
                          <p className={`text-sm ${selectedService === index ? 'text-blue-100' : 'text-gray-600'}`}>
                            {service.price}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-blue-600">
                    {services[selectedService].icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{services[selectedService].title}</h2>
                    <p className="text-gray-600">{services[selectedService].duration}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-700 mb-8">{services[selectedService].description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ce qui est inclus :</h3>
                    <ul className="space-y-3">
                      {services[selectedService].features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Informations</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">Prix :</span>
                        <span className="text-blue-600 font-semibold ml-2">{services[selectedService].price}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Durée :</span>
                        <span className="text-gray-700 ml-2">{services[selectedService].duration}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Livrables :</span>
                        <span className="text-gray-700 ml-2">Selon cahier des charges</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                    Demander un devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="flex items-center justify-center px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Demande de Devis Personnalisé</h2>
            <p className="text-lg text-gray-600">
              Décrivez-nous votre projet pour recevoir une proposition sur-mesure
            </p>
          </div>

          <form className="bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre entreprise"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services souhaités *
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description du projet *
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Décrivez votre projet, vos objectifs et vos attentes..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Services;