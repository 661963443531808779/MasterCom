import { FC } from 'react';
import { Linkedin, Mail, Phone, Users, Award, Calendar, MapPin } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  linkedin?: string;
  bio: string;
  skills: string[];
  image: string;
  hireDate: string;
  reportsTo?: string;
}

interface TeamSectionProps {
  showStats?: boolean;
  showCTA?: boolean;
}

const TeamSection: FC<TeamSectionProps> = ({ showStats = true, showCTA = true }) => {
  const teamMembers: TeamMember[] = [
    {
      id: 'dorian-f',
      name: 'Dorian F',
      role: 'Chef de Projet',
      department: 'Direction',
      email: 'dorian.f@mastercom.fr',
      phone: '+33 1 23 45 67 01',
      linkedin: 'https://linkedin.com/in/dorian-f',
      bio: 'Chef de projet expérimenté avec plus de 8 ans d\'expérience dans la gestion de projets complexes et l\'encadrement d\'équipes.',
      skills: ['Gestion de projet', 'Leadership', 'Stratégie', 'Management'],
      image: '/images/team/dorian-f.jpg',
      hireDate: '2018-03-15',
      reportsTo: null
    },
    {
      id: 'florian-s',
      name: 'Florian S',
      role: 'Responsable Technique',
      department: 'Technique',
      email: 'florian.s@mastercom.fr',
      phone: '+33 1 23 45 67 02',
      linkedin: 'https://linkedin.com/in/florian-s',
      bio: 'Expert technique spécialisé dans le développement web et l\'architecture de solutions digitales innovantes.',
      skills: ['Développement Web', 'Architecture', 'DevOps', 'Innovation'],
      image: '/images/team/florian-s.jpg',
      hireDate: '2019-06-01',
      reportsTo: 'dorian-f'
    },
    {
      id: 'nelson-t',
      name: 'Nelson T',
      role: 'Responsable Commercial',
      department: 'Commercial',
      email: 'nelson.t@mastercom.fr',
      phone: '+33 1 23 45 67 03',
      linkedin: 'https://linkedin.com/in/nelson-t',
      bio: 'Responsable commercial dynamique avec une expertise solide dans la prospection et la fidélisation client.',
      skills: ['Vente', 'Prospection', 'Relation Client', 'Négociation'],
      image: '/images/team/nelson-t.jpg',
      hireDate: '2019-09-15',
      reportsTo: 'dorian-f'
    },
    {
      id: 'oriane-d',
      name: 'Oriane D',
      role: 'Responsable Créatif',
      department: 'Créatif',
      email: 'oriane.d@mastercom.fr',
      phone: '+33 1 23 45 67 04',
      linkedin: 'https://linkedin.com/in/oriane-d',
      bio: 'Directrice artistique créative avec une vision unique du design et de l\'identité visuelle.',
      skills: ['Design', 'Direction Artistique', 'Branding', 'Créativité'],
      image: '/images/team/oriane-d.jpg',
      hireDate: '2020-01-10',
      reportsTo: 'dorian-f'
    },
    {
      id: 'mael-b',
      name: 'Mael B',
      role: 'Développeur Frontend',
      department: 'Technique',
      email: 'mael.b@mastercom.fr',
      phone: '+33 1 23 45 67 05',
      linkedin: 'https://linkedin.com/in/mael-b',
      bio: 'Développeuse frontend passionnée par les interfaces utilisateur modernes et l\'expérience utilisateur.',
      skills: ['React', 'TypeScript', 'UI/UX', 'Frontend'],
      image: '/images/team/mael-b.jpg',
      hireDate: '2021-03-01',
      reportsTo: 'florian-s'
    },
    {
      id: 'sandro-n',
      name: 'Sandro N',
      role: 'Développeur Backend',
      department: 'Technique',
      email: 'sandro.n@mastercom.fr',
      phone: '+33 1 23 45 67 06',
      linkedin: 'https://linkedin.com/in/sandro-n',
      bio: 'Développeur backend spécialisé dans les architectures scalables et les bases de données.',
      skills: ['Node.js', 'PostgreSQL', 'API', 'Backend'],
      image: '/images/team/sandro-n.jpg',
      hireDate: '2021-05-15',
      reportsTo: 'florian-s'
    },
    {
      id: 'ethan-k',
      name: 'Ethan K',
      role: 'Commercial',
      department: 'Commercial',
      email: 'ethan.k@mastercom.fr',
      phone: '+33 1 23 45 67 07',
      linkedin: 'https://linkedin.com/in/ethan-k',
      bio: 'Commercial junior motivé avec un excellent relationnel et une forte capacité d\'écoute.',
      skills: ['Vente', 'Communication', 'Prospection', 'CRM'],
      image: '/images/team/ethan-k.jpg',
      hireDate: '2022-09-01',
      reportsTo: 'nelson-t'
    },
    {
      id: 'aylana-f',
      name: 'Aylana F',
      role: 'Graphiste',
      department: 'Créatif',
      email: 'aylana.f@mastercom.fr',
      phone: '+33 1 23 45 67 08',
      linkedin: 'https://linkedin.com/in/aylana-f',
      bio: 'Graphiste talentueuse spécialisée dans l\'identité visuelle et le design print.',
      skills: ['Photoshop', 'Illustrator', 'Branding', 'Print'],
      image: '/images/team/aylana-f.jpg',
      hireDate: '2022-11-15',
      reportsTo: 'oriane-d'
    },
    {
      id: 'ines-c',
      name: 'Ines C',
      role: 'UX/UI Designer',
      department: 'Créatif',
      email: 'ines.c@mastercom.fr',
      phone: '+33 1 23 45 67 09',
      linkedin: 'https://linkedin.com/in/ines-c',
      bio: 'UX/UI Designer passionnée par l\'expérience utilisateur et les interfaces intuitives.',
      skills: ['Figma', 'Prototypage', 'UX Research', 'UI Design'],
      image: '/images/team/ines-c.jpg',
      hireDate: '2023-02-01',
      reportsTo: 'oriane-d'
    }
  ];

  const getDepartmentStats = () => {
    const departments = teamMembers.reduce((acc, member) => {
      acc[member.department] = (acc[member.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return departments;
  };

  const departmentStats = getDepartmentStats();

  return (
    <div className="space-y-16">
      {/* Statistiques */}
      {showStats && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="stat-card text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">{teamMembers.length}</h3>
                <p className="text-gray-600">Membres de l'équipe</p>
              </div>
              <div className="stat-card text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">{Object.keys(departmentStats).length}</h3>
                <p className="text-gray-600">Départements</p>
              </div>
              <div className="stat-card text-center">
                <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">5+</h3>
                <p className="text-gray-600">Années d'expérience moyenne</p>
              </div>
              <div className="stat-card text-center">
                <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">100%</h3>
                <p className="text-gray-600">Taux de satisfaction client</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grille des membres */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-2 text-center mb-12">Rencontrez Notre Équipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="card group hover:shadow-xl transition-all duration-300">
                <div className="card-content">
                  {/* Photo */}
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-blue-500 transition-colors">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name}&size=96&background=0ea5e9&color=fff`;
                      }}
                    />
                  </div>

                  {/* Informations */}
                  <div className="text-center mb-4">
                    <h3 className="font-heading text-xl text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-500">{member.department}</p>
                  </div>

                  {/* Bio */}
                  <p className="body-medium text-center mb-4">{member.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.skills.map((skill, index) => (
                      <span key={index} className="badge badge-info text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="flex justify-center space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="h-4 w-4 text-gray-600" />
                    </a>
                    {member.linkedin && (
                      <a 
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-4 w-4 text-gray-600" />
                      </a>
                    )}
                    {member.phone && (
                      <a 
                        href={`tel:${member.phone}`}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors"
                        aria-label="Téléphone"
                      >
                        <Phone className="h-4 w-4 text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {showCTA && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="heading-2 text-white mb-6">Prêt à Travailler Avec Nous ?</h2>
            <p className="body-large text-blue-100 mb-8">
              Notre équipe passionnée est prête à transformer vos idées en réalité. 
              Contactez-nous pour discuter de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                Nous Contacter
              </a>
              <a 
                href="/portfolio" 
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600"
              >
                Voir Nos Réalisations
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TeamSection;
