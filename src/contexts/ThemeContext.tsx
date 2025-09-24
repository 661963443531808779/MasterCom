import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type SeasonalTheme = 'none' | 'christmas' | 'easter' | 'halloween' | 'summer';

interface ThemeContextType {
  currentTheme: SeasonalTheme;
  setTheme: (theme: SeasonalTheme) => void;
  isThemeActive: (theme: SeasonalTheme) => boolean;
  getThemeDecorations: () => ThemeDecorations;
}

interface ThemeDecorations {
  background: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  decorations: ReactNode[];
  animations: string[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<SeasonalTheme>('none');

  // Charger le thème depuis le localStorage au montage
  useEffect(() => {
    const savedTheme = localStorage.getItem('seasonal-theme') as SeasonalTheme;
    if (savedTheme && ['none', 'christmas', 'easter', 'halloween', 'summer'].includes(savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Sauvegarder le thème dans le localStorage
  const setTheme = (theme: SeasonalTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('seasonal-theme', theme);
  };

  const isThemeActive = (theme: SeasonalTheme) => {
    return currentTheme === theme;
  };

  const getThemeDecorations = (): ThemeDecorations => {
    switch (currentTheme) {
      case 'christmas':
        return {
          background: 'bg-gradient-to-br from-red-50 to-green-50',
          colors: {
            primary: 'text-red-600',
            secondary: 'text-green-600',
            accent: 'text-yellow-500'
          },
          decorations: [
            // Sapin principal en haut à gauche
            <div key="tree-1" className="text-green-500 text-3xl opacity-60 animate-bounce">
              🎄
            </div>,
            // Cadeau en haut à droite
            <div key="gift-1" className="text-red-500 text-2xl opacity-50 animate-pulse">
              🎁
            </div>,
            // Flocon en bas à gauche
            <div key="snow-1" className="text-white text-2xl opacity-40 animate-ping">
              ❄️
            </div>,
            // Étoile en bas à droite
            <div key="star-1" className="text-yellow-400 text-2xl opacity-60 animate-pulse">
              ⭐
            </div>
          ],
          animations: ['animate-bounce', 'animate-pulse', 'animate-ping']
        };

      case 'easter':
        return {
          background: 'bg-gradient-to-br from-pink-50 to-yellow-50',
          colors: {
            primary: 'text-pink-600',
            secondary: 'text-yellow-600',
            accent: 'text-purple-500'
          },
          decorations: [
            // Œuf coloré en haut à gauche
            <div key="egg-1" className="text-pink-500 text-3xl opacity-60 animate-bounce">
              🥚
            </div>,
            // Lapin en haut à droite
            <div key="bunny-1" className="text-gray-400 text-2xl opacity-50 animate-pulse">
              🐰
            </div>,
            // Fleur en bas à gauche
            <div key="flower-1" className="text-pink-400 text-2xl opacity-40 animate-ping">
              🌸
            </div>,
            // Panier en bas à droite
            <div key="basket-1" className="text-yellow-500 text-2xl opacity-60 animate-pulse">
              🧺
            </div>
          ],
          animations: ['animate-bounce', 'animate-pulse', 'animate-ping']
        };

      case 'halloween':
        return {
          background: 'bg-gradient-to-br from-orange-50 to-purple-50',
          colors: {
            primary: 'text-orange-600',
            secondary: 'text-purple-600',
            accent: 'text-black'
          },
          decorations: [
            // Citrouille en haut à gauche
            <div key="pumpkin-1" className="text-orange-500 text-3xl opacity-60 animate-bounce">
              🎃
            </div>,
            // Fantôme en haut à droite
            <div key="ghost-1" className="text-white text-2xl opacity-50 animate-pulse">
              👻
            </div>,
            // Chauve-souris en bas à gauche
            <div key="bat-1" className="text-purple-600 text-2xl opacity-40 animate-ping">
              🦇
            </div>,
            // Crâne en bas à droite
            <div key="skull-1" className="text-gray-600 text-2xl opacity-60 animate-pulse">
              💀
            </div>
          ],
          animations: ['animate-bounce', 'animate-pulse', 'animate-ping']
        };

      case 'summer':
        return {
          background: 'bg-gradient-to-br from-blue-50 to-yellow-50',
          colors: {
            primary: 'text-blue-600',
            secondary: 'text-yellow-600',
            accent: 'text-orange-500'
          },
          decorations: [
            // Soleil en haut à gauche
            <div key="sun-1" className="text-yellow-500 text-3xl opacity-60 animate-spin">
              ☀️
            </div>,
            // Palmier en haut à droite
            <div key="palm-1" className="text-green-500 text-2xl opacity-50 animate-pulse">
              🌴
            </div>,
            // Glace en bas à gauche
            <div key="ice-1" className="text-pink-400 text-2xl opacity-40 animate-bounce">
              🍦
            </div>,
            // Parasol en bas à droite
            <div key="umbrella-1" className="text-blue-500 text-2xl opacity-60 animate-pulse">
              🏖️
            </div>
          ],
          animations: ['animate-spin', 'animate-pulse', 'animate-bounce']
        };

      default:
        return {
          background: '',
          colors: {
            primary: '',
            secondary: '',
            accent: ''
          },
          decorations: [],
          animations: []
        };
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    isThemeActive,
    getThemeDecorations
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
