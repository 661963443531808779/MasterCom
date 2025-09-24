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
      {decorations.decorations}
      
      {/* Effets de particules pour Noël */}
      {decorations.animations.includes('animate-bounce') && (
        <div className="absolute inset-0">
          {/* Flocons de neige animés */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`snowflake-${i}`}
              className="absolute text-white opacity-30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
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
          {/* Pétales de fleurs flottants */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`petal-${i}`}
              className="absolute text-pink-300 opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonalDecorations;
