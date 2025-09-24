import { FC } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Tag, Share2 } from 'lucide-react';

const BlogArticle: FC = () => {
  const { id } = useParams();

  // Articles détaillés pour le SEO
  const articles = {
    '1': {
      title: 'Comment optimiser votre stratégie de communication digitale en 2025',
      content: `
        <div class="prose prose-lg max-w-none">
          <h2>L'évolution de la communication digitale</h2>
          <p>En 2025, la communication digitale connaît une transformation majeure. Les entreprises qui réussissent sont celles qui adoptent une approche holistique, intégrant intelligence artificielle, personnalisation avancée et stratégie omnicanale.</p>
          
          <h3>1. L'Intelligence Artificielle au service de votre communication</h3>
          <p>L'IA révolutionne la façon dont nous communiquons avec nos audiences. Des chatbots conversationnels aux outils de génération de contenu, l'IA permet de :</p>
          <ul>
            <li>Personnaliser les messages en temps réel</li>
            <li>Analyser les sentiments et adapter la tonalité</li>
            <li>Optimiser les moments d'envoi pour maximiser l'engagement</li>
            <li>Créer du contenu à l'échelle avec une qualité constante</li>
          </ul>
          
          <h3>2. La personnalisation avancée</h3>
          <p>Plus qu'un simple prénom dans l'email, la personnalisation 2025 implique :</p>
          <ul>
            <li>Segmentation comportementale précise</li>
            <li>Contenu dynamique basé sur l'historique d'interaction</li>
            <li>Recommandations prédictives</li>
            <li>Expériences utilisateur adaptatives</li>
          </ul>
          
          <h3>3. L'omnicanalité maîtrisée</h3>
          <p>Une stratégie omnicanale efficace nécessite :</p>
          <ul>
            <li>Cohérence du message sur tous les points de contact</li>
            <li>Données unifiées pour une vue client 360°</li>
            <li>Orchestration automatisée des parcours clients</li>
            <li>Attribution marketing multi-touch</li>
          </ul>
          
          <h3>4. Mesurer pour optimiser</h3>
          <p>Les KPIs essentiels à suivre en 2025 :</p>
          <ul>
            <li>Customer Lifetime Value (CLV)</li>
            <li>Net Promoter Score (NPS) en temps réel</li>
            <li>Taux d'engagement cross-canal</li>
            <li>ROI par canal et campagne</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>L'optimisation de votre stratégie de communication digitale en 2025 passe par l'adoption de technologies avancées, une approche data-driven et une obsession de l'expérience client. Les entreprises qui maîtriseront ces enjeux prendront une avance décisive sur leurs concurrents.</p>
        </div>
      `,
      author: 'Marie Dubois',
      date: '20 Janvier 2025',
      readTime: '8 min',
      category: 'Marketing Digital',
      tags: ['Communication', 'Digital', 'IA', 'Stratégie', '2025'],
      seo: {
        metaTitle: 'Stratégie Communication Digitale 2025 | Guide Expert MasterCom',
        metaDescription: 'Découvrez comment optimiser votre stratégie de communication digitale en 2025. IA, personnalisation, omnicanalité : tous nos conseils d\'experts.',
        keywords: 'communication digitale, stratégie marketing 2025, intelligence artificielle, personnalisation, omnicanalité'
      }
    },
    '2': {
      title: 'L\'art du branding pour les PME : Guide complet 2025',
      content: `
        <div class="prose prose-lg max-w-none">
          <h2>Pourquoi le branding est crucial pour les PME</h2>
          <p>Dans un marché saturé, le branding n'est plus un luxe réservé aux grandes entreprises. Pour les PME, une identité de marque forte est un avantage concurrentiel déterminant qui permet de se différencier et de créer une connexion émotionnelle avec les clients.</p>
          
          <h3>1. Les fondamentaux du branding PME</h3>
          <p>Construire une marque forte pour une PME nécessite une approche structurée :</p>
          <ul>
            <li><strong>Mission claire</strong> : Définir pourquoi votre entreprise existe</li>
            <li><strong>Valeurs authentiques</strong> : Ce en quoi vous croyez vraiment</li>
            <li><strong>Positionnement unique</strong> : Votre place distinctive sur le marché</li>
            <li><strong>Personnalité de marque</strong> : Comment votre marque s'exprime</li>
          </ul>
          
          <h3>2. Créer une identité visuelle impactante</h3>
          <p>L'identité visuelle est le premier contact avec votre marque :</p>
          <ul>
            <li>Logo mémorable et adaptable</li>
            <li>Palette de couleurs cohérente</li>
            <li>Typographies professionnelles</li>
            <li>Iconographie distinctive</li>
            <li>Guidelines d'utilisation claires</li>
          </ul>
          
          <h3>3. Développer votre voix de marque</h3>
          <p>Votre ton de communication doit être :</p>
          <ul>
            <li>Authentique et cohérent</li>
            <li>Adapté à votre audience cible</li>
            <li>Différenciant de la concurrence</li>
            <li>Applicable sur tous les canaux</li>
          </ul>
          
          <h3>4. Stratégie de déploiement avec budget optimisé</h3>
          <p>Pour les PME, il faut prioriser :</p>
          <ul>
            <li>Site web professionnel responsive</li>
            <li>Présence réseaux sociaux stratégique</li>
            <li>Supports print essentiels</li>
            <li>Signalétique cohérente</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Un branding réussi pour une PME combine authenticité, cohérence et déploiement intelligent. C'est un investissement qui génère des retours durables : reconnaissance, fidélisation et croissance.</p>
        </div>
      `,
      author: 'Pierre Martin',
      date: '18 Janvier 2025',
      readTime: '10 min',
      category: 'Branding',
      tags: ['Branding', 'PME', 'Identité', 'Design', 'Stratégie'],
      seo: {
        metaTitle: 'Branding PME 2025 : Guide Complet pour Créer une Marque Forte',
        metaDescription: 'Guide expert pour créer un branding impactant pour votre PME. Identité visuelle, positionnement, stratégie de déploiement avec budget optimisé.',
        keywords: 'branding PME, identité de marque, logo entreprise, stratégie marque, design PME'
      }
    },
    '3': {
      title: 'ROI Marketing : Mesurer l\'efficacité de vos campagnes',
      content: `
        <div class="prose prose-lg max-w-none">
          <h2>L'importance cruciale du ROI marketing</h2>
          <p>Mesurer le retour sur investissement (ROI) de vos actions marketing n'est plus optionnel. C'est la clé pour optimiser vos budgets, justifier vos investissements et prendre des décisions stratégiques éclairées.</p>
          
          <h3>1. Comprendre les métriques essentielles</h3>
          <p>Pour calculer efficacement votre ROI marketing, maîtrisez ces KPIs :</p>
          <ul>
            <li><strong>CAC (Customer Acquisition Cost)</strong> : Coût d'acquisition client</li>
            <li><strong>LTV (Lifetime Value)</strong> : Valeur vie client</li>
            <li><strong>ROAS (Return on Ad Spend)</strong> : Retour sur investissement publicitaire</li>
            <li><strong>CPL (Cost Per Lead)</strong> : Coût par lead généré</li>
            <li><strong>Taux de conversion</strong> : Pourcentage de prospects convertis</li>
          </ul>
          
          <h3>2. Outils de mesure et attribution</h3>
          <p>Les solutions indispensables pour tracker votre ROI :</p>
          <ul>
            <li>Google Analytics 4 avec Enhanced Ecommerce</li>
            <li>Pixels de conversion (Facebook, LinkedIn, Google)</li>
            <li>CRM intégré avec scoring de leads</li>
            <li>Outils d'attribution multi-touch</li>
            <li>Dashboards de reporting en temps réel</li>
          </ul>
          
          <h3>3. Méthodologie de calcul du ROI</h3>
          <p>Formule de base : ROI = (Revenus générés - Coûts marketing) / Coûts marketing × 100</p>
          <p>Mais attention aux subtilités :</p>
          <ul>
            <li>Inclure tous les coûts (création, diffusion, temps homme)</li>
            <li>Considérer la fenêtre d'attribution appropriée</li>
            <li>Différencier ROI court terme vs long terme</li>
            <li>Prendre en compte la valeur vie client</li>
          </ul>
          
          <h3>4. Optimisation continue</h3>
          <p>Utilisez vos données pour :</p>
          <ul>
            <li>Réallouer les budgets vers les canaux performants</li>
            <li>Optimiser les messages et créatifs</li>
            <li>Affiner le ciblage audience</li>
            <li>Tester de nouveaux canaux avec méthode</li>
          </ul>
          
          <h3>Conclusion</h3>
          <p>Un ROI marketing bien mesuré transforme vos investissements marketing en moteur de croissance prévisible. C'est la différence entre dépenser et investir intelligemment.</p>
        </div>
      `,
      author: 'Sophie Laurent',
      date: '15 Janvier 2025',
      readTime: '7 min',
      category: 'Stratégie',
      tags: ['ROI', 'Marketing', 'Métriques', 'Analytics', 'Performance'],
      seo: {
        metaTitle: 'ROI Marketing 2025 : Comment Mesurer et Optimiser vos Campagnes',
        metaDescription: 'Apprenez à calculer et optimiser le ROI de vos campagnes marketing. Métriques, outils et stratégies pour maximiser vos investissements.',
        keywords: 'ROI marketing, mesure performance marketing, KPI marketing, analytics marketing, optimisation campagnes'
      }
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
          <Link to="/blog" className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags - À implémenter avec React Helmet */}
      
      {/* Header Article */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au blog
          </Link>
          
          <div className="mb-6">
            <span className="badge badge-info text-white bg-blue-600">
              {article.category}
            </span>
          </div>
          
          <h1 className="heading-1 text-white mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white">
          {/* Tags */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Tag className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">Mots-clés :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span key={index} className="badge bg-gray-100 text-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Partager cet article
              </h3>
              <div className="flex space-x-4">
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Articles connexes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(articles)
                .filter(([key]) => key !== id)
                .slice(0, 2)
                .map(([key, relatedArticle]) => (
                <Link 
                  key={key}
                  to={`/blog/${key}`}
                  className="card hover:shadow-lg transition-all duration-200"
                >
                  <div className="card-content">
                    <span className="badge badge-info mb-3">
                      {relatedArticle.category}
                    </span>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{relatedArticle.author}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogArticle;
