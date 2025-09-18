import { FC, useState } from 'react';
import { Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';

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
      title: 'Les 10 tendances du marketing digital en 2024',
      excerpt: 'Découvrez les tendances qui vont marquer le marketing digital cette année et comment les intégrer dans votre stratégie.',
      category: 'marketing',
      author: 'Marie Dubois',
      date: '15 Janvier 2024',
      readTime: '5 min',
      image: '/api/placeholder/600/300',
      featured: true
    },
    {
      id: 2,
      title: 'Comment créer une identité de marque forte',
      excerpt: 'Les clés pour développer une identité de marque qui marque les esprits et fidélise vos clients.',
      category: 'design',
      author: 'Pierre Martin',
      date: '12 Janvier 2024',
      readTime: '7 min',
      image: '/api/placeholder/600/300',
      featured: false
    },
    {
      id: 3,
      title: 'L\'importance du storytelling en communication',
      excerpt: 'Pourquoi raconter une histoire est essentiel pour connecter avec votre audience et renforcer votre message.',
      category: 'strategy',
      author: 'Sophie Laurent',
      date: '10 Janvier 2024',
      readTime: '6 min',
      image: '/api/placeholder/600/300',
      featured: false
    },
    {
      id: 4,
      title: 'SEO : Les bonnes pratiques pour 2024',
      excerpt: 'Les dernières évolutions du SEO et comment optimiser votre contenu pour les moteurs de recherche.',
      category: 'digital',
      author: 'Thomas Bernard',
      date: '8 Janvier 2024',
      readTime: '8 min',
      image: '/api/placeholder/600/300',
      featured: false
    },
    {
      id: 5,
      title: 'Créer un contenu engageant sur les réseaux sociaux',
      excerpt: 'Les stratégies qui fonctionnent pour créer du contenu qui génère de l\'engagement sur vos réseaux.',
      category: 'marketing',
      author: 'Marie Dubois',
      date: '5 Janvier 2024',
      readTime: '4 min',
      image: '/api/placeholder/600/300',
      featured: false
    },
    {
      id: 6,
      title: 'L\'avenir du marketing d\'influence',
      excerpt: 'Comment l\'influence marketing évolue et quelles sont les nouvelles opportunités à saisir.',
      category: 'strategy',
      author: 'Pierre Martin',
      date: '3 Janvier 2024',
      readTime: '6 min',
      image: '/api/placeholder/600/300',
      featured: false
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
