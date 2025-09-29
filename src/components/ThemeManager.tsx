import { FC, useState, useEffect } from 'react';
import { Sparkles, Palette, Save, RefreshCw, Sun, Moon, Snowflake, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  icon: React.ReactNode;
  isActive: boolean;
  seasonalText: string;
}

const ThemeManager: FC = () => {
  const [themes, setThemes] = useState<Theme[]>([
    {
      id: 'default',
      name: 'Classique',
      description: 'Thème par défaut professionnel et épuré',
      colors: {
        primary: '#0ea5e9',
        secondary: '#6366f1',
        accent: '#f59e0b',
        background: '#f8fafc',
        text: '#0f172a'
      },
      icon: <Palette className="h-6 w-6" />,
      isActive: true,
      seasonalText: 'Bienvenue sur MasterCom, votre partenaire de confiance pour tous vos projets de communication.'
    },
    {
      id: 'summer',
      name: 'Été',
      description: 'Thème estival avec des couleurs vives et énergiques',
      colors: {
        primary: '#f59e0b',
        secondary: '#ef4444',
        accent: '#10b981',
        background: '#fef3c7',
        text: '#92400e'
      },
      icon: <Sun className="h-6 w-6" />,
      isActive: false,
      seasonalText: 'L\'été est la saison parfaite pour donner vie à vos projets ! Profitez de notre énergie créative pour booster votre communication.'
    },
    {
      id: 'winter',
      name: 'Hiver',
      description: 'Thème hivernal avec des tons froids et élégants',
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
        background: '#f0f9ff',
        text: '#1e3a8a'
      },
      icon: <Snowflake className="h-6 w-6" />,
      isActive: false,
      seasonalText: 'L\'hiver inspire la réflexion et l\'innovation. C\'est le moment idéal pour planifier vos projets de communication pour l\'année à venir.'
    },
    {
      id: 'valentine',
      name: 'Saint-Valentin',
      description: 'Thème romantique pour la Saint-Valentin',
      colors: {
        primary: '#ec4899',
        secondary: '#f43f5e',
        accent: '#f97316',
        background: '#fdf2f8',
        text: '#be185d'
      },
      icon: <Heart className="h-6 w-6" />,
      isActive: false,
      seasonalText: 'La Saint-Valentin, c\'est l\'amour ! Exprimez votre passion pour votre marque avec nos créations qui touchent le cœur.'
    }
  ]);

  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger le thème actuel depuis le localStorage
    const savedTheme = localStorage.getItem('mastercom-theme');
    if (savedTheme) {
      try {
        const themeData = JSON.parse(savedTheme);
        setThemes(prev => prev.map(theme => ({
          ...theme,
          isActive: theme.id === themeData.id
        })));
      } catch (error) {
        console.error('Erreur lors du chargement du thème:', error);
      }
    }
  }, []);

  const applyTheme = async (theme: Theme) => {
    setLoading(true);
    try {
      // Mettre à jour l'état local
      setThemes(prev => prev.map(t => ({
        ...t,
        isActive: t.id === theme.id
      })));

      // Sauvegarder dans le localStorage
      localStorage.setItem('mastercom-theme', JSON.stringify(theme));

      // Appliquer les couleurs CSS
      const root = document.documentElement;
      root.style.setProperty('--primary-500', theme.colors.primary);
      root.style.setProperty('--primary-600', theme.colors.secondary);
      root.style.setProperty('--primary-700', theme.colors.accent);
      root.style.setProperty('--gray-50', theme.colors.background);
      root.style.setProperty('--gray-900', theme.colors.text);

      // Simuler une sauvegarde sur le serveur
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert(`Thème "${theme.name}" appliqué avec succès !`);
    } catch (error) {
      console.error('Erreur lors de l\'application du thème:', error);
      alert('Erreur lors de l\'application du thème');
    } finally {
      setLoading(false);
    }
  };

  const editTheme = (theme: Theme) => {
    setEditingTheme(theme);
  };

  const saveThemeEdit = (updatedTheme: Theme) => {
    setThemes(prev => prev.map(theme => 
      theme.id === updatedTheme.id ? updatedTheme : theme
    ));
    setEditingTheme(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Gestion des Thèmes</h2>
        </div>
        <p className="text-gray-600">
          Personnalisez l'apparence de votre application avec nos thèmes saisonniers. 
          Changez les couleurs et les textes selon les périodes de l'année.
        </p>
      </div>

      {/* Thèmes disponibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <div key={theme.id} className="card group">
            <div className="card-content">
              {/* Preview des couleurs */}
              <div className="mb-4">
                <div className="flex space-x-2 mb-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                </div>
              </div>

              {/* Informations du thème */}
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-gray-600">{theme.icon}</div>
                <h3 className="font-heading text-lg text-gray-900">{theme.name}</h3>
                {theme.isActive && (
                  <span className="badge badge-success text-xs">Actif</span>
                )}
              </div>

              <p className="text-gray-600 mb-4">{theme.description}</p>

              {/* Texte saisonnier */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-700 italic">"{theme.seasonalText}"</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => applyTheme(theme)}
                  disabled={loading || theme.isActive}
                  className={`flex-1 btn-primary flex items-center justify-center space-x-2 ${
                    theme.isActive ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Application...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>{theme.isActive ? 'Actif' : 'Appliquer'}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => editTheme(theme)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Palette className="h-4 w-4" />
                  <span>Modifier</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition */}
      {editingTheme && (
        <EditThemeModal
          theme={editingTheme}
          onClose={() => setEditingTheme(null)}
          onSave={saveThemeEdit}
        />
      )}
    </div>
  );
};

// Modal d'édition de thème
interface EditThemeModalProps {
  theme: Theme;
  onClose: () => void;
  onSave: (theme: Theme) => void;
}

const EditThemeModal: FC<EditThemeModalProps> = ({ theme, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: theme.name,
    description: theme.description,
    seasonalText: theme.seasonalText,
    colors: { ...theme.colors }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...theme,
      ...formData
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Modifier le Thème</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du thème
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Texte saisonnier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texte saisonnier
            </label>
            <textarea
              value={formData.seasonalText}
              onChange={(e) => setFormData({ ...formData, seasonalText: e.target.value })}
              className="input-field h-24 resize-none"
              placeholder="Texte qui s'affichera selon la saison..."
              required
            />
          </div>

          {/* Couleurs */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Couleurs</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(formData.colors).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        colors: { ...formData.colors, [key]: e.target.value }
                      })}
                      className="w-12 h-10 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setFormData({
                        ...formData,
                        colors: { ...formData.colors, [key]: e.target.value }
                      })}
                      className="input-field flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h4>
            <div 
              className="p-6 rounded-lg border-2 border-gray-200"
              style={{ backgroundColor: formData.colors.background }}
            >
              <div className="flex space-x-2 mb-4">
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: formData.colors.primary }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: formData.colors.secondary }}
                ></div>
                <div 
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: formData.colors.accent }}
                ></div>
              </div>
              <h5 
                className="font-semibold mb-2"
                style={{ color: formData.colors.text }}
              >
                {formData.name}
              </h5>
              <p 
                className="text-sm mb-3"
                style={{ color: formData.colors.text }}
              >
                {formData.description}
              </p>
              <p 
                className="text-sm italic"
                style={{ color: formData.colors.text }}
              >
                "{formData.seasonalText}"
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThemeManager;