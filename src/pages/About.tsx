import { useState, FC } from 'react';
import { Mail, Linkedin, Phone } from 'lucide-react';

const About: FC = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'Directrice Générale',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: '10 ans d\'expérience en communication stratégique. Diplômée HEC Paris.',
      email: 'sophie.martin@mastercom.fr',
      phone: '+33 1 23 45 67 89',
      linkedin: 'sophie-martin-mastercom',
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Directeur Créatif',
      photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Créatif passionné avec 8 ans d\'expérience en design et branding.',
      email: 'thomas.dubois@mastercom.fr',
      phone: '+33 1 23 45 67 90',
      linkedin: 'thomas-dubois-creative',
    },
    {
      id: 3,
      name: 'Marie Leroy',
      role: 'Responsable Social Media',
      photo: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Experte en stratégies digitales et gestion de communautés.',
      email: 'marie.leroy@mastercom.fr',
      phone: '+33 1 23 45 67 91',
      linkedin: 'marie-leroy-social',
    },
    {
      id: 4,
      name: 'Antoine Moreau',
      role: 'Chef de Projet',
      photo: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Organisé et méthodique, il coordonne tous nos projets avec excellence.',
      email: 'antoine.moreau@mastercom.fr',
      phone: '+33 1 23 45 67 92',
      linkedin: 'antoine-moreau-pm',
    },
    {
      id: 5,
      name: 'Emma Bernard',
      role: 'Responsable Événementiel',
      photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Spécialisée dans la création d\'événements corporate mémorables.',
      email: 'emma.bernard@mastercom.fr',
      phone: '+33 1 23 45 67 93',
      linkedin: 'emma-bernard-events',
    },
    {
      id: 6,
      name: 'Lucas Garcia',
      role: 'Développeur Web',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert en développement web et solutions digitales innovantes.',
      email: 'lucas.garcia@mastercom.fr',
      phone: '+33 1 23 45 67 94',
      linkedin: 'lucas-garcia-dev',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de Master Com</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Une équipe passionnée au service de votre réussite depuis 2018
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
            <div className="text-lg text-gray-700 space-y-4 text-left">
              <p>
                Master Com est née de la vision de jeunes diplômés en communication, convaincus qu'une approche 
                créative et data-driven pouvait révolutionner le secteur. Fondée en 2018, notre agence s'est 
                rapidement imposée comme un acteur incontournable de la communication digitale et événementielle.
              </p>
              <p>
                Aujourd'hui, nous accompagnons plus de 150 clients, des start-ups innovantes aux grandes entreprises, 
                dans leurs défis de communication les plus ambitieux. Notre secret ? Une équipe pluridisciplinaire 
                qui conjugue créativité, stratégie et innovation technologique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">C</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Créativité</h3>
              <p className="text-gray-600">
                Nous repoussons les limites de la créativité pour créer des campagnes 
                uniques et mémorables.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                La qualité est au cœur de tout ce que nous faisons, de la conception 
                à la réalisation.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">I</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Nous intégrons les dernières technologies et tendances pour rester 
                à la pointe du secteur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Équipe</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rencontrez les talents qui donnent vie à vos projets
            </p>
          </div>

          {/* Organigramme interactif */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${
                  selectedMember === member.id ? 'ring-4 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  
                  {selectedMember === member.id && (
                    <div className="border-t pt-4 space-y-2 animate-fadeIn">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Linkedin className="h-4 w-4" />
                        <span>{member.linkedin}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;