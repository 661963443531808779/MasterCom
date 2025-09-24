import { FC, useState } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';

const Blog: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'design', name: 'Design' },
    { id: 'digital', name: 'Digital' },
    { id: 'strategy', name: 'Stratégie' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Comment optimiser votre stratégie de communication digitale en 2025',
      excerpt: 'Découvrez les techniques avancées pour maximiser l\'impact de votre communication digitale et atteindre vos objectifs business avec des résultats mesurables.',
      category: 'marketing',
      author: 'Marie Dubois',
      date: '20 Janvier 2025',
      readTime: '8 min',
      image: '/api/placeholder/600/300',
      featured: true,
      content: 'La communication digitale évolue rapidement en 2025. L\'intelligence artificielle, la personnalisation avancée et l\'omnicanalité sont devenus essentiels pour une stratégie efficace...'
    },
    {
      id: 2,
      title: 'L\'art du branding pour les PME : Guide complet 2025',
      excerpt: 'Créez une identité de marque puissante qui distingue votre PME de la concurrence et génère une reconnaissance durable auprès de vos clients.',
      category: 'design',
      author: 'Pierre Martin',
      date: '18 Janvier 2025',
      readTime: '10 min',
      image: '/api/placeholder/600/300',
      featured: false,
      content: 'Le branding pour les PME n\'est plus un luxe mais une nécessité. Voici comment développer une identité forte avec un budget optimisé...'
    },
    {
      id: 3,
      title: 'ROI Marketing : Mesurer l\'efficacité de vos campagnes',
      excerpt: 'Apprenez à calculer et optimiser le retour sur investissement de vos actions marketing pour maximiser vos profits et prendre des décisions éclairées.',
      category: 'strategy',
      author: 'Sophie Laurent',
      date: '15 Janvier 2025',
      readTime: '7 min',
      image: '/api/placeholder/600/300',
      featured: false,
      content: 'Mesurer le ROI marketing est crucial pour optimiser vos investissements. Voici les métriques clés et les outils pour y parvenir...'
    },
    {
      id: 4,
      title: 'SEO Local : Dominez votre marché géographique',
      excerpt: 'Maîtrisez les techniques de référencement local pour attirer plus de clients dans votre zone géographique et devancer vos concurrents locaux.',
      category: 'digital',
      author: 'Thomas Bernard',
      date: '12 Janvier 2025',
      readTime: '9 min',
      image: '/api/placeholder/600/300',
      featured: false,
      content: 'Le SEO local est essentiel pour les entreprises avec une présence physique. Découvrez comment optimiser votre visibilité locale...'
    },
    {
      id: 5,
      title: 'Stratégie de contenu B2B : Générer des leads qualifiés',
      excerpt: 'Développez une stratégie de contenu B2B efficace qui attire, convertit et fidélise vos prospects professionnels grâce à un contenu de valeur.',
      category: 'marketing',
      author: 'Marie Dubois',
      date: '10 Janvier 2025',
      readTime: '6 min',
      image: '/api/placeholder/600/300',
      featured: false,
      content: 'La génération de leads B2B passe par une stratégie de contenu pertinente. Voici comment créer du contenu qui convertit...'
    },
    {
      id: 6,
      title: 'Marketing Automation : Automatisez pour mieux convertir',
      excerpt: 'Implémentez des workflows d\'automatisation marketing intelligents pour nurturing vos prospects et augmenter vos taux de conversion.',
      category: 'strategy',
      author: 'Pierre Martin',
      date: '8 Janvier 2025',
      readTime: '8 min',
      image: '/api/placeholder/600/300',
      featured: false,
      content: 'L\'automatisation marketing permet de scalabiliser vos actions tout en maintenant une personnalisation. Découvrez les bonnes pratiques...'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(article => article.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog MasterCom</h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Insights, conseils et tendances du monde de la communication
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-4">
                <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  Article à la une
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-4">{featuredArticle.title}</h2>
              <p className="text-xl text-blue-100 mb-6">{featuredArticle.excerpt}</p>
              <div className="flex items-center text-blue-100 mb-6">
                <User className="h-4 w-4 mr-2" />
                <span className="mr-4">{featuredArticle.author}</span>
                <Calendar className="h-4 w-4 mr-2" />
                <span>{featuredArticle.date}</span>
                <span className="ml-4">{featuredArticle.readTime} de lecture</span>
              </div>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                Lire l'article
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.filter(article => !article.featured).map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <Calendar className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="ml-auto text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-2" />
                      <span>{article.author}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Lire
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Restez informé de nos dernières publications
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Recevez nos articles directement dans votre boîte mail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
