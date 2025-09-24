import { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalDecorations: FC = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'none') {
    return null;
  }

  // Système de thèmes professionnel avec effets subtils
  const ProfessionalThemeElements = () => {
    if (currentTheme === 'christmas') {
      return (
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Effet de neige subtile */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`snow-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          {/* Accent rouge et vert discret */}
          <div className="absolute top-4 left-4 w-2 h-16 bg-gradient-to-b from-red-500 to-green-500 opacity-20 rounded-full animate-pulse" />
          <div className="absolute top-4 right-4 w-2 h-16 bg-gradient-to-b from-green-500 to-red-500 opacity-20 rounded-full animate-pulse" />
        </div>
      );
    }
    
    if (currentTheme === 'halloween') {
      return (
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Effet de brume orange */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`mist-${i}`}
                className="absolute w-8 h-8 bg-orange-500 rounded-full opacity-5 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${4 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          {/* Accents orange et violet */}
          <div className="absolute top-4 left-4 w-3 h-20 bg-gradient-to-b from-orange-500 to-purple-600 opacity-15 rounded-full animate-pulse" />
          <div className="absolute top-4 right-4 w-3 h-20 bg-gradient-to-b from-purple-600 to-orange-500 opacity-15 rounded-full animate-pulse" />
        </div>
      );
    }
    
    if (currentTheme === 'easter') {
      return (
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Effet de pétales */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`petal-${i}`}
                className="absolute w-2 h-2 bg-pink-400 rounded-full opacity-20 animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          {/* Accents pastel */}
          <div className="absolute top-4 left-4 w-2 h-18 bg-gradient-to-b from-pink-400 to-yellow-300 opacity-25 rounded-full animate-pulse" />
          <div className="absolute top-4 right-4 w-2 h-18 bg-gradient-to-b from-yellow-300 to-pink-400 opacity-25 rounded-full animate-pulse" />
        </div>
      );
    }
    
    if (currentTheme === 'summer') {
      return (
        <div className="fixed inset-0 pointer-events-none z-10">
          {/* Effet de chaleur */}
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={`heat-${i}`}
                className="absolute w-6 h-6 bg-yellow-400 rounded-full opacity-10 animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          {/* Accents ensoleillés */}
          <div className="absolute top-4 left-4 w-2 h-16 bg-gradient-to-b from-yellow-400 to-blue-400 opacity-20 rounded-full animate-pulse" />
          <div className="absolute top-4 right-4 w-2 h-16 bg-gradient-to-b from-blue-400 to-yellow-400 opacity-20 rounded-full animate-pulse" />
        </div>
      );
    }
    
    return null;
  };


  return (
    <>
      {/* Thèmes professionnels avec effets subtils */}
      <ProfessionalThemeElements />

      {/* Styles CSS globaux pour les thèmes - Version minimaliste */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Thème Halloween - Subtle */
        .theme-halloween {
          background: linear-gradient(135deg, #fefbf3 0%, #fef7f0 100%);
          position: relative;
        }
        
        .theme-halloween .bg-white {
          background: linear-gradient(135deg, #fffbf5 0%, #fff8f3 100%);
          border-left: 3px solid #f97316;
        }

        /* Thème Noël - Subtle */
        .theme-christmas {
          background: linear-gradient(135deg, #fefefe 0%, #fdfdf9 100%);
          position: relative;
        }
        
        .theme-christmas .bg-white {
          background: linear-gradient(135deg, #fefefe 0%, #fdfdf9 100%);
          border-left: 3px solid #dc2626;
        }

        /* Thème Pâques - Subtle */
        .theme-easter {
          background: linear-gradient(135deg, #fefcfe 0%, #fefef9 100%);
          position: relative;
        }
        
        .theme-easter .bg-white {
          background: linear-gradient(135deg, #fefcfe 0%, #fefef9 100%);
          border-left: 3px solid #ec4899;
        }

        /* Thème Été - Subtle */
        .theme-summer {
          background: linear-gradient(135deg, #fefffe 0%, #fefef8 100%);
          position: relative;
        }
        
        .theme-summer .bg-white {
          background: linear-gradient(135deg, #fefffe 0%, #fefef8 100%);
          border-left: 3px solid #3b82f6;
        }

        /* Amélioration des boutons selon le thème */
        .theme-halloween .bg-blue-600 {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
        }
        
        .theme-christmas .bg-blue-600 {
          background: linear-gradient(135deg, #dc2626 0%, #16a34a 100%) !important;
        }
        
        .theme-easter .bg-blue-600 {
          background: linear-gradient(135deg, #ec4899 0%, #fbbf24 100%) !important;
        }
        
        .theme-summer .bg-blue-600 {
          background: linear-gradient(135deg, #3b82f6 0%, #fbbf24 100%) !important;
        }

        /* Assurer que le contenu reste au-dessus des effets */
        .theme-halloween > *,
        .theme-christmas > *,
        .theme-easter > *,
        .theme-summer > * {
          position: relative;
          z-index: 10;
        }
      `}} />
    </>
  );
};

export default SeasonalDecorations;
