import React, { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalDecorations: FC = () => {
  const { getThemeDecorations } = useTheme();
  const decorations = getThemeDecorations();

  if (decorations.decorations.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Décorations principales positionnées de manière stylée */}
      <div className="absolute top-4 left-4 z-20">
        {decorations.decorations.slice(0, 2)}
      </div>
      
      <div className="absolute top-4 right-4 z-20">
        {decorations.decorations.slice(2, 4)}
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        {decorations.decorations.slice(4, 6)}
      </div>

      <div className="absolute bottom-4 right-4 z-20">
        {decorations.decorations.slice(6, 8)}
      </div>

      {/* Effets de particules stylés */}
      {decorations.animations.includes('animate-bounce') && (
        <div className="absolute inset-0">
          {/* Flocons de neige pour Noël */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`snowflake-${i}`}
              className="absolute text-white opacity-40 animate-bounce"
              style={{
                left: `${10 + (i * 7)}%`,
                top: `${5 + (i * 8)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
                fontSize: `${12 + (i % 3) * 4}px`
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

      {/* Effets de particules pour Pâques */}
      {decorations.animations.includes('animate-pulse') && (
        <div className="absolute inset-0">
          {/* Pétales de fleurs pour Pâques */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`petal-${i}`}
              className="absolute text-pink-300 opacity-30 animate-pulse"
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${10 + (i * 10)}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + (i % 2)}s`,
                fontSize: `${14 + (i % 2) * 6}px`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      {/* Effets pour Halloween */}
      {decorations.animations.includes('animate-ping') && (
        <div className="absolute inset-0">
          {/* Effets fantomatiques pour Halloween */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`ghost-effect-${i}`}
              className="absolute text-orange-400 opacity-25 animate-ping"
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${15 + (i * 12)}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${2 + (i % 2)}s`,
                fontSize: `${16 + (i % 2) * 4}px`
              }}
            >
              👻
            </div>
          ))}
        </div>
      )}

      {/* Effets pour l'été */}
      {decorations.animations.includes('animate-spin') && (
        <div className="absolute inset-0">
          {/* Soleil qui tourne pour l'été */}
          <div
            className="absolute text-yellow-400 opacity-30 animate-spin"
            style={{
              left: '85%',
              top: '10%',
              animationDuration: '8s',
              fontSize: '24px'
            }}
          >
            ☀️
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalDecorations;
