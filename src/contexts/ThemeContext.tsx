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
            accent: 'text-gold-500'
          },
          decorations: [
            // Sapins flottants
            <div key="tree-1" className="fixed top-10 left-10 w-8 h-8 opacity-20 animate-bounce">
              <div className="text-green-500 text-2xl">🎄</div>
            </div>,
            <div key="tree-2" className="fixed top-20 right-20 w-6 h-6 opacity-30 animate-pulse">
              <div className="text-green-600 text-xl">🎄</div>
            </div>,
            // Flocons de neige
            <div key="snow-1" className="fixed top-16 left-1/4 w-4 h-4 opacity-40 animate-ping">
              <div className="text-white text-lg">❄️</div>
            </div>,
            <div key="snow-2" className="fixed top-32 right-1/3 w-3 h-3 opacity-50 animate-bounce">
              <div className="text-white text-sm">❄️</div>
            </div>,
            // Cadeaux
            <div key="gift-1" className="fixed bottom-20 left-16 w-6 h-6 opacity-25 animate-pulse">
              <div className="text-red-500 text-xl">🎁</div>
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
            // Œufs de Pâques
            <div key="egg-1" className="fixed top-12 left-12 w-6 h-6 opacity-30 animate-bounce">
              <div className="text-pink-500 text-xl">🥚</div>
            </div>,
            <div key="egg-2" className="fixed top-24 right-16 w-5 h-5 opacity-40 animate-pulse">
              <div className="text-yellow-500 text-lg">🥚</div>
            </div>,
            // Lapins
            <div key="bunny-1" className="fixed bottom-16 left-20 w-8 h-8 opacity-25 animate-bounce">
              <div className="text-gray-400 text-2xl">🐰</div>
            </div>,
            // Fleurs
            <div key="flower-1" className="fixed top-40 left-1/3 w-4 h-4 opacity-35 animate-ping">
              <div className="text-pink-400 text-lg">🌸</div>
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
            // Citrouilles
            <div key="pumpkin-1" className="fixed top-10 left-16 w-8 h-8 opacity-30 animate-bounce">
              <div className="text-orange-500 text-2xl">🎃</div>
            </div>,
            // Fantômes
            <div key="ghost-1" className="fixed top-20 right-12 w-6 h-6 opacity-25 animate-pulse">
              <div className="text-white text-xl">👻</div>
            </div>,
            // Chauves-souris
            <div key="bat-1" className="fixed bottom-20 left-12 w-5 h-5 opacity-40 animate-ping">
              <div className="text-purple-600 text-lg">🦇</div>
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
            // Soleil
            <div key="sun-1" className="fixed top-8 right-8 w-8 h-8 opacity-30 animate-spin">
              <div className="text-yellow-500 text-2xl">☀️</div>
            </div>,
            // Palmiers
            <div key="palm-1" className="fixed bottom-16 left-16 w-6 h-6 opacity-25 animate-pulse">
              <div className="text-green-500 text-xl">🌴</div>
            </div>,
            // Glaces
            <div key="ice-1" className="fixed top-24 left-20 w-4 h-4 opacity-40 animate-bounce">
              <div className="text-pink-400 text-lg">🍦</div>
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
