import { useState, useEffect, useCallback } from 'react';

export type Theme = 'light' | 'dark' | 'auto';
export type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'red';

export interface ThemeConfig {
  theme: Theme;
  colorScheme: ColorScheme;
  fontSize: 'small' | 'medium' | 'large';
  animations: boolean;
  reducedMotion: boolean;
}

const defaultThemeConfig: ThemeConfig = {
  theme: 'auto',
  colorScheme: 'blue',
  fontSize: 'medium',
  animations: true,
  reducedMotion: false,
};

export const useTheme = () => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemeConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger la configuration depuis localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('mastercom-theme-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setThemeConfig({ ...defaultThemeConfig, ...parsedConfig });
      } catch (error) {
        console.warn('Failed to parse theme config:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Appliquer le thème au document
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;
    
    // Appliquer le thème
    if (themeConfig.theme === 'dark' || (themeConfig.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Appliquer le schéma de couleurs
    root.setAttribute('data-color-scheme', themeConfig.colorScheme);

    // Appliquer la taille de police
    root.setAttribute('data-font-size', themeConfig.fontSize);

    // Appliquer les animations
    if (themeConfig.animations && !themeConfig.reducedMotion) {
      root.classList.add('animations-enabled');
      root.classList.remove('animations-disabled');
    } else {
      root.classList.add('animations-disabled');
      root.classList.remove('animations-enabled');
    }

    // Sauvegarder dans localStorage
    localStorage.setItem('mastercom-theme-config', JSON.stringify(themeConfig));
  }, [themeConfig, isLoaded]);

  // Écouter les changements de préférence système
  useEffect(() => {
    if (themeConfig.theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = document.documentElement;
      if (mediaQuery.matches) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeConfig.theme]);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setThemeConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const setTheme = useCallback((theme: Theme) => {
    updateTheme({ theme });
  }, [updateTheme]);

  const setColorScheme = useCallback((colorScheme: ColorScheme) => {
    updateTheme({ colorScheme });
  }, [updateTheme]);

  const setFontSize = useCallback((fontSize: ThemeConfig['fontSize']) => {
    updateTheme({ fontSize });
  }, [updateTheme]);

  const toggleTheme = useCallback(() => {
    const currentTheme = themeConfig.theme;
    if (currentTheme === 'light') {
      setTheme('dark');
    } else if (currentTheme === 'dark') {
      setTheme('auto');
    } else {
      setTheme('light');
    }
  }, [themeConfig.theme, setTheme]);

  const toggleAnimations = useCallback(() => {
    updateTheme({ animations: !themeConfig.animations });
  }, [themeConfig.animations, updateTheme]);

  const resetTheme = useCallback(() => {
    setThemeConfig(defaultThemeConfig);
  }, []);

  return {
    themeConfig,
    isLoaded,
    setTheme,
    setColorScheme,
    setFontSize,
    toggleTheme,
    toggleAnimations,
    updateTheme,
    resetTheme,
  };
};

// Hook pour les couleurs dynamiques
export const useThemeColors = () => {
  const { themeConfig } = useTheme();

  const getColorScheme = useCallback(() => {
    const schemes = {
      blue: {
        primary: 'rgb(59, 130, 246)',
        primaryDark: 'rgb(37, 99, 235)',
        secondary: 'rgb(147, 197, 253)',
        accent: 'rgb(251, 191, 36)',
      },
      purple: {
        primary: 'rgb(147, 51, 234)',
        primaryDark: 'rgb(126, 34, 206)',
        secondary: 'rgb(196, 181, 253)',
        accent: 'rgb(251, 191, 36)',
      },
      green: {
        primary: 'rgb(34, 197, 94)',
        primaryDark: 'rgb(22, 163, 74)',
        secondary: 'rgb(134, 239, 172)',
        accent: 'rgb(251, 191, 36)',
      },
      orange: {
        primary: 'rgb(249, 115, 22)',
        primaryDark: 'rgb(234, 88, 12)',
        secondary: 'rgb(253, 186, 116)',
        accent: 'rgb(59, 130, 246)',
      },
      red: {
        primary: 'rgb(239, 68, 68)',
        primaryDark: 'rgb(220, 38, 38)',
        secondary: 'rgb(252, 165, 165)',
        accent: 'rgb(251, 191, 36)',
      },
    };

    return schemes[themeConfig.colorScheme];
  }, [themeConfig.colorScheme]);

  return {
    colors: getColorScheme(),
    colorScheme: themeConfig.colorScheme,
  };
};

// Hook pour les animations
export const useAnimations = () => {
  const { themeConfig } = useTheme();

  const shouldAnimate = useCallback(() => {
    return themeConfig.animations && !themeConfig.reducedMotion;
  }, [themeConfig.animations, themeConfig.reducedMotion]);

  const getAnimationClass = useCallback((animationType: string) => {
    if (!shouldAnimate()) return '';
    
    const animations = {
      fadeIn: 'animate-fade-in',
      slideIn: 'animate-slide-in',
      bounce: 'animate-bounce',
      pulse: 'animate-pulse',
      spin: 'animate-spin',
    };

    return animations[animationType as keyof typeof animations] || '';
  }, [shouldAnimate]);

  return {
    shouldAnimate,
    getAnimationClass,
    animationsEnabled: themeConfig.animations,
    reducedMotion: themeConfig.reducedMotion,
  };
};
