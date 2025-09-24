import React, { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalDecorations: FC = () => {
  const { currentTheme } = useTheme();

  if (currentTheme === 'none') {
    return null;
  }

  // Composants SVG stylés pour chaque thème
  const ChristmasTree = () => (
    <svg width="80" height="100" viewBox="0 0 80 100" className="absolute top-20 left-4 z-20 opacity-80 animate-pulse">
      <defs>
        <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Tronc */}
      <rect x="35" y="80" width="10" height="20" fill="url(#trunkGradient)" rx="2" />
      {/* Branches */}
      <polygon points="40,10 20,50 60,50" fill="url(#treeGradient)" />
      <polygon points="40,25 25,60 55,60" fill="url(#treeGradient)" />
      <polygon points="40,40 30,70 50,70" fill="url(#treeGradient)" />
      {/* Étoile */}
      <polygon points="40,5 42,12 49,12 43,17 45,24 40,19 35,24 37,17 31,12 38,12" fill="#fbbf24" />
      {/* Boules de Noël */}
      <circle cx="32" cy="35" r="3" fill="#ef4444" />
      <circle cx="48" cy="35" r="3" fill="#3b82f6" />
      <circle cx="40" cy="50" r="3" fill="#f59e0b" />
      <circle cx="28" cy="60" r="3" fill="#8b5cf6" />
      <circle cx="52" cy="60" r="3" fill="#ec4899" />
    </svg>
  );

  const HalloweenPumpkin = () => (
    <svg width="90" height="100" viewBox="0 0 90 100" className="absolute top-20 right-4 z-20 opacity-85 animate-pulse">
      <defs>
        <linearGradient id="pumpkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="30%" stopColor="#ea580c" />
          <stop offset="70%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
        <radialGradient id="pumpkinGlow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Ombre de la citrouille */}
      <ellipse cx="42" cy="75" rx="28" ry="8" fill="#000000" opacity="0.2" />
      
      {/* Corps principal de la citrouille */}
      <ellipse cx="40" cy="55" rx="28" ry="35" fill="url(#pumpkinGradient)" filter="url(#shadow)" />
      
      {/* Effet de lueur */}
      <ellipse cx="40" cy="55" rx="28" ry="35" fill="url(#pumpkinGlow)" />
      
      {/* Côtes de la citrouille */}
      <path d="M 20 25 Q 40 20 60 25" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 18 35 Q 40 30 62 35" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 16 45 Q 40 40 64 45" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 14 55 Q 40 50 66 55" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M 12 65 Q 40 60 68 65" stroke="#dc2626" strokeWidth="2" fill="none" opacity="0.6" />
      
      {/* Tige avec gradient */}
      <rect x="37" y="15" width="6" height="20" fill="url(#stemGradient)" rx="3" />
      <rect x="36" y="12" width="8" height="6" fill="url(#stemGradient)" rx="2" />
      
      {/* Visage - Yeux plus expressifs */}
      <polygon points="28,40 22,45 28,50 32,45" fill="#1f2937" />
      <polygon points="52,40 58,45 52,50 48,45" fill="#1f2937" />
      
      {/* Reflets dans les yeux */}
      <circle cx="30" cy="43" r="2" fill="#ffffff" opacity="0.8" />
      <circle cx="50" cy="43" r="2" fill="#ffffff" opacity="0.8" />
      
      {/* Bouche souriante */}
      <path d="M 30 65 Q 40 75 50 65" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
      
      {/* Dentition améliorée */}
      <rect x="32" y="63" width="3" height="6" fill="#1f2937" rx="1" />
      <rect x="37" y="63" width="3" height="6" fill="#1f2937" rx="1" />
      <rect x="42" y="63" width="3" height="6" fill="#1f2937" rx="1" />
      <rect x="47" y="63" width="3" height="6" fill="#1f2937" rx="1" />
      
      {/* Petites décorations */}
      <circle cx="25" cy="30" r="2" fill="#fbbf24" opacity="0.7" />
      <circle cx="55" cy="30" r="2" fill="#fbbf24" opacity="0.7" />
    </svg>
  );

  const EasterEgg = () => (
    <svg width="70" height="90" viewBox="0 0 70 90" className="absolute top-20 left-4 z-20 opacity-80 animate-pulse">
      <defs>
        <linearGradient id="eggGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <pattern id="eggPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="#ffffff" opacity="0.3" />
        </pattern>
      </defs>
      {/* Œuf */}
      <ellipse cx="35" cy="60" rx="20" ry="25" fill="url(#eggGradient)" />
      <ellipse cx="35" cy="60" rx="20" ry="25" fill="url(#eggPattern)" />
      {/* Décoration */}
      <circle cx="25" cy="50" r="3" fill="#ffffff" opacity="0.8" />
      <circle cx="45" cy="50" r="3" fill="#ffffff" opacity="0.8" />
      <circle cx="35" cy="70" r="3" fill="#ffffff" opacity="0.8" />
      {/* Ruban */}
      <rect x="30" y="35" width="10" height="8" fill="#8b5cf6" rx="2" />
      <rect x="32" y="33" width="6" height="2" fill="#8b5cf6" rx="1" />
    </svg>
  );

  const SummerSun = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-20 right-4 z-20 opacity-80 animate-spin">
      <defs>
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Rayons du soleil */}
      <g filter="url(#glow)">
        <rect x="48" y="10" width="4" height="15" fill="#fbbf24" rx="2" />
        <rect x="48" y="75" width="4" height="15" fill="#fbbf24" rx="2" />
        <rect x="10" y="48" width="15" height="4" fill="#fbbf24" rx="2" />
        <rect x="75" y="48" width="15" height="4" fill="#fbbf24" rx="2" />
        <rect x="20" y="20" width="4" height="15" fill="#fbbf24" rx="2" transform="rotate(45 22 27.5)" />
        <rect x="76" y="20" width="4" height="15" fill="#fbbf24" rx="2" transform="rotate(-45 78 27.5)" />
        <rect x="20" y="65" width="4" height="15" fill="#fbbf24" rx="2" transform="rotate(-45 22 72.5)" />
        <rect x="76" y="65" width="4" height="15" fill="#fbbf24" rx="2" transform="rotate(45 78 72.5)" />
      </g>
      {/* Corps du soleil */}
      <circle cx="50" cy="50" r="25" fill="url(#sunGradient)" />
      <circle cx="50" cy="50" r="20" fill="#fbbf24" opacity="0.3" />
    </svg>
  );

  return (
    <>
      {/* Styles CSS globaux pour les thèmes */}
      <style jsx global>{`
        /* Thème Halloween */
        .theme-halloween {
          background: linear-gradient(135deg, #fef3c7 0%, #f3e8ff 100%);
          position: relative;
        }
        
        .theme-halloween::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        /* Thème Noël */
        .theme-christmas {
          background: linear-gradient(135deg, #fef2f2 0%, #f0fdf4 100%);
          position: relative;
        }
        
        .theme-christmas::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        /* Thème Pâques */
        .theme-easter {
          background: linear-gradient(135deg, #fdf2f8 0%, #fefce8 100%);
          position: relative;
        }
        
        .theme-easter::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 25% 25%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(234, 179, 8, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        /* Thème Été */
        .theme-summer {
          background: linear-gradient(135deg, #eff6ff 0%, #fefce8 100%);
          position: relative;
        }
        
        .theme-summer::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(234, 179, 8, 0.1) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        /* Assurer que le contenu reste au-dessus des effets */
        .theme-halloween > *,
        .theme-christmas > *,
        .theme-easter > *,
        .theme-summer > * {
          position: relative;
          z-index: 10;
        }
      `}</style>

      {/* Décorations SVG stylées */}
      {currentTheme === 'christmas' && <ChristmasTree />}
      {currentTheme === 'halloween' && <HalloweenPumpkin />}
      {currentTheme === 'easter' && <EasterEgg />}
      {currentTheme === 'summer' && <SummerSun />}
    </>
  );
};

export default SeasonalDecorations;
