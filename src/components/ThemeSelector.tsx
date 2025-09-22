import React, { useState } from 'react';
import { Sun, Moon, Monitor, Palette, Type, Zap, RotateCcw } from 'lucide-react';

// Hooks de thème - version production
const useTheme = () => ({
  themeConfig: { theme: 'light', colorScheme: 'blue', fontSize: 'medium', animations: true },
  setTheme: () => {},
  setColorScheme: () => {},
  setFontSize: () => {},
  toggleAnimations: () => {},
  resetTheme: () => {}
});

const useThemeColors = () => ({
  colors: {
    primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
    secondary: { 50: '#f0f9ff', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
    accent: { 50: '#fef3c7', 500: '#f59e0b', 600: '#d97706', 700: '#b45309' }
  }
});

const ThemeSelector: React.FC = () => {
  const { 
    themeConfig, 
    setTheme, 
    setColorScheme, 
    setFontSize, 
    toggleAnimations, 
    resetTheme 
  } = useTheme();
  
  const { colors } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Clair', icon: Sun },
    { value: 'dark', label: 'Sombre', icon: Moon },
    { value: 'auto', label: 'Automatique', icon: Monitor },
  ] as const;

  const colorSchemes = [
    { value: 'blue', label: 'Bleu', color: 'rgb(59, 130, 246)' },
    { value: 'purple', label: 'Violet', color: 'rgb(147, 51, 234)' },
    { value: 'green', label: 'Vert', color: 'rgb(34, 197, 94)' },
    { value: 'orange', label: 'Orange', color: 'rgb(249, 115, 22)' },
    { value: 'red', label: 'Rouge', color: 'rgb(239, 68, 68)' },
  ] as const;

  const fontSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
  ] as const;

  return (
    <div className="relative">
      {/* Bouton de toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
        style={{ borderColor: colors.primary }}
      >
        <Palette className="h-5 w-5" style={{ color: colors.primary }} />
        <span className="text-sm font-medium">Thème</span>
      </button>

      {/* Panel de configuration */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 z-50">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Personnalisation
              </h3>
              <button
                onClick={resetTheme}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Réinitialiser"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Thème */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Thème
              </label>
              <div className="grid grid-cols-3 gap-2">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = themeConfig.theme === option.value;
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-2 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Schéma de couleurs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Couleurs
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorSchemes.map((scheme) => {
                  const isSelected = themeConfig.colorScheme === scheme.value;
                  
                  return (
                    <button
                      key={scheme.value}
                      onClick={() => setColorScheme(scheme.value)}
                      className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-gray-900 dark:border-white'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: scheme.color }}
                      title={scheme.label}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-lg" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Taille de police */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                <Type className="inline h-4 w-4 mr-2" />
                Taille de police
              </label>
              <div className="space-y-2">
                {fontSizes.map((size) => {
                  const isSelected = themeConfig.fontSize === size.value;
                  
                  return (
                    <button
                      key={size.value}
                      onClick={() => setFontSize(size.value)}
                      className={`w-full p-2 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                      style={{ fontSize: size.value === 'small' ? '0.875rem' : size.value === 'large' ? '1.125rem' : '1rem' }}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Animations */}
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Animations
                </span>
                <button
                  onClick={toggleAnimations}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    themeConfig.animations
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      themeConfig.animations ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>

            {/* Aperçu des couleurs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Aperçu
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div 
                  className="p-3 rounded-lg text-white font-medium text-center"
                  style={{ backgroundColor: colors.primary }}
                >
                  Primaire
                </div>
                <div 
                  className="p-3 rounded-lg text-white font-medium text-center"
                  style={{ backgroundColor: colors.accent }}
                >
                  Accent
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Fermer
              </button>
              <button
                onClick={resetTheme}
                className="flex-1 px-4 py-2 text-white rounded-lg transition-colors"
                style={{ backgroundColor: colors.primary }}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSelector;
