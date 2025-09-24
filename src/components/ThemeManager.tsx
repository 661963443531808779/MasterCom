import React, { FC, useState } from 'react';
import { 
  Palette, 
  TreePine, 
  Egg, 
  Ghost, 
  Sun,
  Check,
  Sparkles,
  Globe,
  Zap
} from 'lucide-react';
import { useTheme, SeasonalTheme } from '../contexts/ThemeContext';
// import { dataService } from '../services/auth';

const ThemeManager: FC = () => {
  const { currentTheme, setTheme, isThemeActive } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleThemeChange = async (themeId: SeasonalTheme) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      await setTheme(themeId);
      setMessage({ 
        type: 'success', 
        text: `Thème ${themes.find(t => t.id === themeId)?.name} activé pour tous les visiteurs !` 
      });
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: `Erreur lors de l'activation du thème: ${error.message}` 
      });
    } finally {
      setIsLoading(false);
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const themes = [
    {
      id: 'halloween' as SeasonalTheme,
      name: 'Halloween',
      description: 'Citrouilles, fantômes, chauves-souris et ambiance mystérieuse',
      icon: Ghost,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'christmas' as SeasonalTheme,
      name: 'Noël',
      description: 'Sapins, flocons de neige, cadeaux et décorations festives',
      icon: TreePine,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'easter' as SeasonalTheme,
      name: 'Pâques',
      description: 'Œufs colorés, lapins, fleurs et décorations printanières',
      icon: Egg,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'summer' as SeasonalTheme,
      name: 'Été',
      description: 'Soleil, palmiers, glaces et ambiance tropicale',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      id: 'none' as SeasonalTheme,
      name: 'Aucun thème',
      description: 'Interface standard sans décorations',
      icon: Palette,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Gestion des Thèmes Saisonniers</h2>
          <p className="text-sm text-gray-600">Activez des décorations spéciales pour TOUS les visiteurs</p>
        </div>
      </div>

      {/* Message de statut */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.type === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Thème actuel */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Thème Actuel</h3>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {React.createElement(themes.find(t => t.id === currentTheme)?.icon || Palette, {
              className: "h-5 w-5 text-blue-600"
            })}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {themes.find(t => t.id === currentTheme)?.name || 'Aucun thème'}
            </p>
            <p className="text-sm text-gray-600">
              {themes.find(t => t.id === currentTheme)?.description || 'Interface standard'}
            </p>
          </div>
        </div>
      </div>

      {/* Sélection des thèmes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = isThemeActive(theme.id);
          
          return (
            <div
              key={theme.id}
              onClick={() => !isLoading && handleThemeChange(theme.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isActive 
                  ? `${theme.borderColor} ${theme.bgColor} ring-2 ring-blue-500 ring-opacity-50` 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {/* Indicateur de sélection */}
              {isActive && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              {/* Icône du thème */}
              <div className={`p-3 rounded-lg mb-3 ${theme.bgColor}`}>
                <Icon className={`h-8 w-8 ${theme.color}`} />
              </div>

              {/* Informations du thème */}
              <div>
                <h3 className={`font-semibold mb-1 ${theme.color}`}>
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Bouton de sélection */}
              <div className="mt-4">
                <button
                  disabled={isLoading}
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : `${theme.color} border border-current hover:bg-opacity-10`
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      <span>Activation...</span>
                    </>
                  ) : (
                    <>
                      {isActive ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Thème Actif</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          <span>Activer pour Tous</span>
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Informations supplémentaires */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Conseils d'utilisation</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Les thèmes ajoutent des décorations animées sur toutes les pages</li>
          <li>• Les décorations sont non-intrusives et n'affectent pas la fonctionnalité</li>
          <li>• Le thème choisi est sauvegardé automatiquement</li>
          <li>• Parfait pour les campagnes marketing saisonnières</li>
        </ul>
      </div>
    </div>
  );
};

export default ThemeManager;
