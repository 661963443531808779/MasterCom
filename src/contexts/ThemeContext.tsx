import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService } from '../services/auth';

export type SeasonalTheme = 'none' | 'christmas' | 'easter' | 'halloween' | 'summer';

interface ThemeContextType {
  currentTheme: SeasonalTheme;
  setTheme: (theme: SeasonalTheme) => void;
  isThemeActive: (theme: SeasonalTheme) => boolean;
  getThemeStyles: () => ThemeStyles;
}

interface ThemeStyles {
  background: string;
  overlay: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  effects: string[];
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

  // Charger le thème global depuis la base de données
  useEffect(() => {
    loadGlobalTheme();
  }, []);

  const loadGlobalTheme = async () => {
    try {
      // Charger le thème global depuis la base de données
      const themeData = await dataService.getTableData('theme_preferences');
      const activeTheme = themeData.find((t: any) => t.is_active && t.theme_name !== 'none');
      
      if (activeTheme) {
        setCurrentTheme(activeTheme.theme_name as SeasonalTheme);
        // Appliquer le thème au body
        applyThemeToBody(activeTheme.theme_name as SeasonalTheme);
      }
    } catch (error) {
      console.log('Thème global non disponible, utilisation du thème local');
      // Fallback vers le localStorage
      const savedTheme = localStorage.getItem('seasonal-theme') as SeasonalTheme;
      if (savedTheme && ['none', 'christmas', 'easter', 'halloween', 'summer'].includes(savedTheme)) {
        setCurrentTheme(savedTheme);
        applyThemeToBody(savedTheme);
      }
    }
  };

  // Appliquer le thème au body pour tous les visiteurs
  const applyThemeToBody = (theme: SeasonalTheme) => {
    // Supprimer toutes les classes de thème existantes
    document.body.classList.remove('theme-christmas', 'theme-easter', 'theme-halloween', 'theme-summer');
    
    if (theme !== 'none') {
      document.body.classList.add(`theme-${theme}`);
    }
  };

  // Sauvegarder le thème globalement
  const setTheme = async (theme: SeasonalTheme) => {
    setCurrentTheme(theme);
    applyThemeToBody(theme);
    
    try {
      // Sauvegarder dans la base de données pour tous les utilisateurs
      await dataService.insertData('theme_preferences', {
        user_id: 'global-theme',
        theme_name: theme,
        is_active: true,
        activated_at: new Date().toISOString()
      });
    } catch (error) {
      console.log('Sauvegarde globale échouée, utilisation du localStorage');
      localStorage.setItem('seasonal-theme', theme);
    }
  };

  const isThemeActive = (theme: SeasonalTheme) => {
    return currentTheme === theme;
  };

  const getThemeStyles = (): ThemeStyles => {
    switch (currentTheme) {
      case 'christmas':
        return {
          background: 'bg-gradient-to-br from-red-50 to-green-50',
          overlay: 'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br before:from-red-100/20 before:to-green-100/20 before:pointer-events-none',
          colors: {
            primary: 'text-red-600',
            secondary: 'text-green-600',
            accent: 'text-yellow-500'
          },
          effects: ['snow-effect', 'sparkle-effect']
        };

      case 'easter':
        return {
          background: 'bg-gradient-to-br from-pink-50 to-yellow-50',
          overlay: 'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br before:from-pink-100/20 before:to-yellow-100/20 before:pointer-events-none',
          colors: {
            primary: 'text-pink-600',
            secondary: 'text-yellow-600',
            accent: 'text-purple-500'
          },
          effects: ['flower-effect', 'bounce-effect']
        };

      case 'halloween':
        return {
          background: 'bg-gradient-to-br from-orange-50 to-purple-50',
          overlay: 'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-100/20 before:to-purple-100/20 before:pointer-events-none',
          colors: {
            primary: 'text-orange-600',
            secondary: 'text-purple-600',
            accent: 'text-black'
          },
          effects: ['spooky-effect', 'glow-effect']
        };

      case 'summer':
        return {
          background: 'bg-gradient-to-br from-blue-50 to-yellow-50',
          overlay: 'before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-100/20 before:to-yellow-100/20 before:pointer-events-none',
          colors: {
            primary: 'text-blue-600',
            secondary: 'text-yellow-600',
            accent: 'text-orange-500'
          },
          effects: ['sunshine-effect', 'wave-effect']
        };

      default:
        return {
          background: '',
          overlay: '',
          colors: {
            primary: '',
            secondary: '',
            accent: ''
          },
          effects: []
        };
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    isThemeActive,
    getThemeStyles
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
