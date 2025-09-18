import { FC } from 'react';
import { Users, Target, Award, Lightbulb } from 'lucide-react';

const About: FC = () => {
  const team = [
    {
      name: 'Marie Dubois',
      role: 'Directrice de Création',
      image: '/api/placeholder/300/300',
      description: '15 ans d\'expérience en branding et design'
    },
    {
      name: 'Pierre Martin',
      role: 'Directeur Stratégie',
      image: '/api/placeholder/300/300',
      description: 'Expert en communication digitale'
    },
    {
      name: 'Sophie Laurent',
      role: 'Responsable Événementiel',
      image: '/api/placeholder/300/300',
      description: 'Spécialiste des événements corporates'
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque projet, en dépassant les attentes de nos clients.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Collaboration',
      description: 'Nous croyons en la force du travail d\'équipe et de la collaboration étroite avec nos clients.'
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Innovation',
      description: 'Nous restons à la pointe des dernières tendances et technologies de communication.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Engagement',
      description: 'Nous nous engageons pleinement dans la réussite de chaque projet qui nous est confié.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de MasterCom</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Depuis 2010, nous accompagnons les entreprises dans leur stratégie de communication 
              pour créer des connexions authentiques et durables.
            </p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <p className="text-lg text-gray-600 mb-6">
                Fondée en 2010 par une équipe de passionnés de communication, MasterCom est née 
                de la conviction que chaque entreprise mérite une stratégie de communication 
                sur-mesure et efficace.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Au fil des années, nous avons accompagné plus de 500 entreprises, de la startup 
                innovante aux grands groupes internationaux, dans la définition et la mise en 
                œuvre de leur identité de marque.
              </p>
              <p className="text-lg text-gray-600">
                Aujourd'hui, MasterCom est reconnue comme l'une des agences de communication 
                les plus créatives et performantes du marché français.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">15</div>
                  <div className="text-gray-600">Années d'expérience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Prix remportés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                  <div className="text-gray-600">Taux de satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Les valeurs qui guident notre approche et notre relation avec nos clients
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Équipe */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Une équipe de professionnels passionnés et expérimentés
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 rounded-full w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à donner une nouvelle dimension à votre communication ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Découvrez comment MasterCom peut vous accompagner dans votre stratégie de communication
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Découvrir nos services
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
