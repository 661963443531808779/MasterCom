import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Clock, Tag, Share2, BookOpen } from 'lucide-react';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'strategy', name: 'Stratégie' },
    { id: 'trends', name: 'Tendances' },
    { id: 'case-studies', name: 'Études de cas' },
    { id: 'tips', name: 'Conseils' },
    { id: 'digital', name: 'Digital' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const articles = [
    {
      id: 1,
      title: 'Les tendances communication 2025 : ce qui va changer',
      category: 'trends',
      author: 'Sophie Martin',
      date: '2024-12-15',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Découvrez les principales tendances qui vont révolutionner le monde de la communication en 2025 : IA générative, authenticité, durabilité...',
      tags: ['Innovation', 'Digital', 'Futur'],
      content: `
        <h2>L'Intelligence Artificielle au cœur de la communication</h2>
        <p>L'IA générative transforme radicalement la façon dont nous créons du contenu. Les outils comme ChatGPT, Midjourney ou DALL-E permettent de générer du contenu personnalisé à grande échelle, mais l'enjeu reste l'authenticité et la créativité humaine.</p>
        
        <h3>Les 5 tendances clés à retenir :</h3>
        <ul>
          <li><strong>Personnalisation extrême :</strong> Chaque message doit être adapté à son destinataire</li>
          <li><strong>Vidéo courte :</strong> TikTok, Instagram Reels, YouTube Shorts dominent</li>
          <li><strong>Authenticité :</strong> Les consommateurs privilégient les marques transparentes</li>
          <li><strong>Durabilité :</strong> L'engagement environnemental devient un facteur différenciant</li>
          <li><strong>Interactivité :</strong> Les contenus interactifs génèrent plus d'engagement</li>
        </ul>
        
        <h3>Comment s'adapter ?</h3>
        <p>Pour rester compétitif, les entreprises doivent investir dans la formation de leurs équipes aux nouveaux outils, tout en conservant leur identité de marque unique. L'équilibre entre automatisation et créativité humaine sera la clé du succès.</p>
      `,
      seo: {
        metaTitle: 'Tendances Communication 2025 : IA, Authenticité et Durabilité',
        metaDescription: 'Découvrez les 5 tendances qui vont révolutionner la communication en 2025. IA générative, personnalisation, vidéo courte et durabilité.',
        keywords: 'tendances communication 2025, IA générative, marketing digital, stratégie communication'
      }
    },
    {
      id: 2,
      title: 'Comment mesurer le ROI de votre stratégie de communication ?',
      category: 'strategy',
      author: 'Thomas Dubois',
      date: '2024-12-10',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Méthodes et outils pour quantifier l\'impact de vos actions de communication et démontrer leur valeur ajoutée.',
      tags: ['ROI', 'Analytics', 'Stratégie'],
      content: `
        <h2>Pourquoi mesurer le ROI de la communication ?</h2>
        <p>Dans un contexte économique incertain, les dirigeants exigent de plus en plus de preuves concrètes de l'efficacité des investissements en communication. Mesurer le ROI permet de justifier les budgets et d'optimiser les stratégies.</p>
        
        <h3>Les métriques clés à suivre :</h3>
        <ul>
          <li><strong>Notoriété de marque :</strong> Enquêtes de notoriété, mentions sur les réseaux sociaux</li>
          <li><strong>Engagement :</strong> Taux d'interaction, partages, commentaires</li>
          <li><strong>Conversion :</strong> Leads générés, ventes attribuables</li>
          <li><strong>Coût par acquisition :</strong> CAC vs LTV (Customer Lifetime Value)</li>
          <li><strong>Sentiment :</strong> Analyse des mentions positives/négatives</li>
        </ul>
        
        <h3>Outils recommandés :</h3>
        <p>Google Analytics, Facebook Insights, Hootsuite, Brandwatch, et des outils spécialisés comme Mention ou Brand24 pour l'écoute sociale.</p>
        
        <h3>Calcul du ROI :</h3>
        <p>ROI = (Bénéfices - Coûts) / Coûts × 100</p>
        <p>Exemple : Si une campagne coûte 10 000€ et génère 25 000€ de ventes, le ROI est de 150%.</p>
      `,
      seo: {
        metaTitle: 'ROI Communication : Comment Mesurer et Optimiser vos Campagnes',
        metaDescription: 'Guide complet pour mesurer le ROI de vos stratégies de communication. Métriques clés, outils et méthodes de calcul.',
        keywords: 'ROI communication, mesure performance marketing, analytics communication, KPIs marketing'
      }
    },
    {
      id: 3,
      title: 'Étude de cas : Le rebranding réussi de TechStart',
      category: 'case-studies',
      author: 'Marie Leroy',
      date: '2024-12-05',
      readTime: '6 min',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Retour sur la refonte complète de l\'identité de TechStart : stratégie, mise en œuvre et résultats obtenus.',
      tags: ['Branding', 'Cas client', 'Startup'],
      content: `
        <h2>Le défi : Moderniser l'image d'une startup tech</h2>
        <p>TechStart, une startup spécialisée dans l'IA, avait besoin de moderniser son image pour attirer les talents et convaincre les investisseurs. Leur ancienne identité visuelle ne reflétait plus leur innovation.</p>
        
        <h3>La stratégie adoptée :</h3>
        <ul>
          <li><strong>Audit complet :</strong> Analyse de l'existant et benchmark concurrentiel</li>
          <li><strong>Positionnement :</strong> "L'IA accessible à tous"</li>
          <li><strong>Identité visuelle :</strong> Palette de couleurs modernes, typographie tech</li>
          <li><strong>Ton de voix :</strong> Expert mais accessible, innovant mais rassurant</li>
        </ul>
        
        <h3>Résultats obtenus :</h3>
        <ul>
          <li>+40% de candidatures spontanées</li>
          <li>+25% d'engagement sur les réseaux sociaux</li>
          <li>+60% de mentions positives dans la presse</li>
          <li>Levée de fonds de 5M€ facilitée</li>
        </ul>
        
        <h3>Leçons apprises :</h3>
        <p>Un rebranding réussi nécessite une approche holistique : identité visuelle, communication interne, formation des équipes et déploiement progressif.</p>
      `,
      seo: {
        metaTitle: 'Cas Client : Rebranding TechStart - Stratégie et Résultats',
        metaDescription: 'Étude de cas complète du rebranding de TechStart. Stratégie, mise en œuvre et résultats : +40% candidatures, +25% engagement.',
        keywords: 'rebranding startup, cas client communication, identité visuelle, stratégie branding'
      }
    },
    {
      id: 4,
      title: '5 erreurs à éviter dans votre stratégie de contenu',
      category: 'tips',
      author: 'Alexandre Petit',
      date: '2024-11-28',
      readTime: '4 min',
      image: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Les pièges les plus courants dans la création de contenu et comment les éviter pour maximiser votre impact.',
      tags: ['Contenu', 'Erreurs', 'Conseils'],
      content: `
        <h2>Les erreurs qui tuent votre stratégie de contenu</h2>
        <p>Malgré les bonnes intentions, de nombreuses entreprises tombent dans des pièges classiques qui limitent l'efficacité de leur stratégie de contenu.</p>
        
        <h3>1. Publier sans stratégie claire</h3>
        <p>Publier du contenu "au feeling" sans objectifs précis est la première erreur. Définissez vos KPIs avant de créer.</p>
        
        <h3>2. Ignorer votre audience</h3>
        <p>Créer du contenu sans connaître votre cible, c'est comme parler dans le vide. Utilisez les personas et l'écoute sociale.</p>
        
        <h3>3. Négliger la qualité au profit de la quantité</h3>
        <p>Mieux vaut 1 excellent article par semaine que 7 articles médiocres. La qualité prime toujours.</p>
        
        <h3>4. Oublier l'optimisation SEO</h3>
        <p>Un contenu non optimisé ne sera jamais trouvé. Mots-clés, balises, structure : ne négligez rien.</p>
        
        <h3>5. Ne pas mesurer les performances</h3>
        <p>Sans mesure, impossible d'améliorer. Mettez en place des tableaux de bord et analysez régulièrement.</p>
        
        <h3>Bonus : La solution MasterCom</h3>
        <p>Notre plateforme intègre toutes ces bonnes pratiques pour vous accompagner dans votre stratégie de contenu.</p>
      `,
      seo: {
        metaTitle: '5 Erreurs Stratégie Contenu : Comment les Éviter',
        metaDescription: 'Découvrez les 5 erreurs les plus courantes en stratégie de contenu et comment les éviter pour maximiser votre impact.',
        keywords: 'stratégie contenu, erreurs marketing, conseils communication, création contenu'
      }
    },
    {
      id: 5,
      title: 'L\'avenir du marketing digital : prédictions 2025-2030',
      category: 'digital',
      author: 'Sarah Chen',
      date: '2024-11-20',
      readTime: '7 min',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Exploration des évolutions majeures qui attendent le marketing digital dans les 5 prochaines années.',
      tags: ['Digital', 'Futur', 'Prédictions'],
      content: `
        <h2>Le marketing digital en mutation</h2>
        <p>Le paysage du marketing digital évolue à vitesse grand V. Voici les tendances qui vont redéfinir notre approche dans les années à venir.</p>
        
        <h3>1. L'IA conversationnelle omniprésente</h3>
        <p>Les chatbots et assistants vocaux vont devenir le premier point de contact client. L'enjeu : créer des expériences naturelles et utiles.</p>
        
        <h3>2. La réalité augmentée mainstream</h3>
        <p>AR et VR vont transformer l'e-commerce et l'expérience client. Essayage virtuel, visites immersives, formation à distance...</p>
        
        <h3>3. La fin des cookies tiers</h3>
        <p>Avec la disparition des cookies, les marques devront développer leurs propres données first-party et créer de la valeur pour les consommateurs.</p>
        
        <h3>4. Le marketing prédictif</h3>
        <p>L'IA va permettre d'anticiper les besoins clients et de proposer des offres personnalisées en temps réel.</p>
        
        <h3>5. L'économie de l'attention</h3>
        <p>Dans un monde saturé de contenu, la capacité à capter et retenir l'attention deviendra le facteur différenciant clé.</p>
        
        <h3>Comment se préparer ?</h3>
        <p>Investissez dans la data, formez vos équipes aux nouvelles technologies, et privilégiez l'expérience client sur tous les points de contact.</p>
      `,
      seo: {
        metaTitle: 'Marketing Digital 2025-2030 : Prédictions et Tendances',
        metaDescription: 'Découvrez les 5 évolutions majeures du marketing digital pour 2025-2030. IA, AR/VR, fin des cookies, marketing prédictif.',
        keywords: 'marketing digital 2025, tendances digital, IA marketing, réalité augmentée, prédictions marketing'
      }
    },
    {
      id: 6,
      title: 'Comment créer une campagne virale sur les réseaux sociaux',
      category: 'marketing',
      author: 'Julien Moreau',
      date: '2024-11-15',
      readTime: '6 min',
      image: 'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Les secrets des campagnes qui cartonnent : mécanismes psychologiques, timing, et techniques éprouvées.',
      tags: ['Réseaux sociaux', 'Viral', 'Campagne'],
      content: `
        <h2>La recette du contenu viral</h2>
        <p>Bien qu'imprévisible, le viral suit des mécanismes psychologiques et techniques que l'on peut maîtriser.</p>
        
        <h3>Les 6 émotions qui font le viral :</h3>
        <ul>
          <li><strong>La surprise :</strong> Contenu inattendu qui casse les codes</li>
          <li><strong>L'émotion :</strong> Rire, larmes, colère... Les émotions fortes se partagent</li>
          <li><strong>L'utilité :</strong> Contenu pratique et actionnable</li>
          <li><strong>L'identification :</strong> "C'est exactement moi !"</li>
          <li><strong>La controverse :</strong> Débats et prises de position</li>
          <li><strong>L'humour :</strong> Le rire est universel et partageable</li>
        </ul>
        
        <h3>Techniques éprouvées :</h3>
        <ul>
          <li><strong>Le hook en 3 secondes :</strong> Captiver dès les premières secondes</li>
          <li><strong>Le storytelling :</strong> Raconter une histoire qui touche</li>
          <li><strong>L'interactivité :</strong> Sondages, questions, défis</li>
          <li><strong>Le timing :</strong> Publier aux heures de forte audience</li>
          <li><strong>L'engagement :</strong> Répondre rapidement aux commentaires</li>
        </ul>
        
        <h3>Exemples de succès :</h3>
        <p>La campagne "Ice Bucket Challenge" d'ALS, les vidéos TikTok de @charlidamelio, ou les mèmes de @therock montrent la puissance du viral bien orchestré.</p>
        
        <h3>Attention aux pièges :</h3>
        <p>Le viral peut être éphémère. Construisez une stratégie durable qui s'appuie sur votre communauté plutôt que sur des coups d'éclat ponctuels.</p>
      `,
      seo: {
        metaTitle: 'Comment Créer une Campagne Virale : Guide Complet',
        metaDescription: 'Découvrez les secrets des campagnes virales sur les réseaux sociaux. Émotions, techniques et exemples de succès.',
        keywords: 'campagne virale, réseaux sociaux, contenu viral, marketing social media, viral marketing'
      }
    },
    {
      id: 7,
      title: 'L\'importance du storytelling dans la communication d\'entreprise',
      category: 'strategy',
      author: 'Camille Rousseau',
      date: '2024-11-10',
      readTime: '5 min',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Comment raconter l\'histoire de votre marque pour créer une connexion émotionnelle avec vos clients.',
      tags: ['Storytelling', 'Marque', 'Émotion'],
      content: `
        <h2>Pourquoi le storytelling est-il si puissant ?</h2>
        <p>Le storytelling n'est pas qu'une mode marketing. C'est un mécanisme ancestral qui permet de créer des connexions émotionnelles durables avec votre audience.</p>
        
        <h3>Les neurosciences du storytelling :</h3>
        <p>Quand nous écoutons une histoire, notre cerveau libère de l'ocytocine, l'hormone de la confiance. C'est pourquoi les histoires sont 22 fois plus mémorables que les faits bruts.</p>
        
        <h3>Les éléments d'une bonne histoire d'entreprise :</h3>
        <ul>
          <li><strong>Le héros :</strong> Votre client, pas votre entreprise</li>
          <li><strong>Le conflit :</strong> Le problème que vous résolvez</li>
          <li><strong>Le mentor :</strong> Votre marque qui guide</li>
          <li><strong>La transformation :</strong> Le changement positif apporté</li>
          <li><strong>L'appel à l'action :</strong> L'étape suivante claire</li>
        </ul>
        
        <h3>Exemples de storytelling réussi :</h3>
        <p><strong>Nike :</strong> "Just Do It" - L'histoire de la persévérance et du dépassement de soi.</p>
        <p><strong>Airbnb :</strong> "Belong Anywhere" - L'histoire de l'appartenance et de la communauté.</p>
        <p><strong>Patagonia :</strong> L'histoire de la protection de l'environnement.</p>
        
        <h3>Comment appliquer le storytelling :</h3>
        <ol>
          <li>Identifiez les valeurs de votre marque</li>
          <li>Trouvez les histoires authentiques de vos clients</li>
          <li>Créez un arc narratif cohérent</li>
          <li>Adaptez le ton à votre audience</li>
          <li>Mesurez l'impact émotionnel</li>
        </ol>
      `,
      seo: {
        metaTitle: 'Storytelling Entreprise : Comment Raconter l\'Histoire de Votre Marque',
        metaDescription: 'Guide complet du storytelling d\'entreprise. Créez des connexions émotionnelles avec vos clients grâce à des histoires authentiques.',
        keywords: 'storytelling entreprise, communication émotionnelle, histoire de marque, marketing narratif'
      }
    },
    {
      id: 8,
      title: 'Les métriques essentielles pour mesurer l\'engagement sur LinkedIn',
      category: 'digital',
      author: 'Pierre Martin',
      date: '2024-11-05',
      readTime: '4 min',
      image: 'https://images.pexels.com/photos/1181395/pexels-photo-1181395.jpeg?auto=compress&cs=tinysrgb&w=800',
      excerpt: 'Focus sur les KPIs LinkedIn qui comptent vraiment pour évaluer la performance de votre stratégie B2B.',
      tags: ['LinkedIn', 'B2B', 'Métriques'],
      content: `
        <h2>LinkedIn : la plateforme B2B par excellence</h2>
        <p>Avec 900 millions d'utilisateurs, LinkedIn est devenu incontournable pour le marketing B2B. Mais quelles métriques suivre pour mesurer le succès ?</p>
        
        <h3>Les métriques de visibilité :</h3>
        <ul>
          <li><strong>Impressions :</strong> Nombre de fois où votre contenu est affiché</li>
          <li><strong>Portée unique :</strong> Nombre de personnes ayant vu votre contenu</li>
          <li><strong>Fréquence :</strong> Nombre moyen d'impressions par personne</li>
        </ul>
        
        <h3>Les métriques d'engagement :</h3>
        <ul>
          <li><strong>Taux d'engagement :</strong> (Likes + Commentaires + Partages + Clics) / Impressions × 100</li>
          <li><strong>Partage social :</strong> Nombre de partages de votre contenu</li>
          <li><strong>Commentaires :</strong> Qualité et quantité des interactions</li>
          <li><strong>Mentions :</strong> Références à votre marque</li>
        </ul>
        
        <h3>Les métriques de conversion :</h3>
        <ul>
          <li><strong>Clics sur le site web :</strong> Trafic généré vers votre site</li>
          <li><strong>Leads générés :</strong> Contacts qualifiés obtenus</li>
          <li><strong>Coût par lead :</strong> Investissement / Nombre de leads</li>
          <li><strong>ROI :</strong> Retour sur investissement des campagnes</li>
        </ul>
        
        <h3>Outils recommandés :</h3>
        <p>LinkedIn Analytics, Hootsuite, Sprout Social, ou des outils spécialisés comme LinkedIn Sales Navigator pour le B2B.</p>
        
        <h3>Objectifs réalistes :</h3>
        <p>Un bon taux d'engagement LinkedIn se situe entre 2-5%. Au-delà de 5%, vous êtes dans le top 1% des créateurs de contenu.</p>
      `,
      seo: {
        metaTitle: 'Métriques LinkedIn : KPIs Essentiels pour le Marketing B2B',
        metaDescription: 'Guide complet des métriques LinkedIn pour mesurer l\'engagement B2B. Visibilité, engagement, conversion et outils recommandés.',
        keywords: 'métriques LinkedIn, KPIs B2B, engagement LinkedIn, marketing professionnel, analytics LinkedIn'
      }
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'strategy': 'bg-blue-100 text-blue-800',
      'trends': 'bg-purple-100 text-purple-800',
      'case-studies': 'bg-green-100 text-green-800',
      'tips': 'bg-yellow-100 text-yellow-800',
      'digital': 'bg-indigo-100 text-indigo-800',
      'marketing': 'bg-pink-100 text-pink-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog MasterCom
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Découvrez les dernières tendances en communication, marketing digital et stratégie d'entreprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative max-w-md mx-auto sm:mx-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {categories.find(c => c.id === article.category)?.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{article.author}</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-4">{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      <Tag className="h-3 w-3 inline mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center group">
                    Lire la suite
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <BookOpen className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Restez informé des dernières tendances
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Recevez nos meilleurs articles directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;