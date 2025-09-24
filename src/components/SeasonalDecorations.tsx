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
    <svg width="80" height="80" viewBox="0 0 80 80" className="absolute top-20 right-4 z-20 opacity-80 animate-bounce">
      <defs>
        <linearGradient id="pumpkinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <radialGradient id="pumpkinGlow" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Corps de la citrouille */}
      <ellipse cx="40" cy="50" rx="25" ry="30" fill="url(#pumpkinGradient)" />
      <ellipse cx="40" cy="50" rx="25" ry="30" fill="url(#pumpkinGlow)" />
      {/* Tige */}
      <rect x="38" y="20" width="4" height="15" fill="#16a34a" rx="2" />
      {/* Visage */}
      <polygon points="30,45 25,50 30,55" fill="#1f2937" />
      <polygon points="50,45 55,50 50,55" fill="#1f2937" />
      <path d="M 30 60 Q 40 65 50 60" stroke="#1f2937" strokeWidth="2" fill="none" />
      {/* Dentition */}
      <rect x="35" y="58" width="2" height="4" fill="#1f2937" />
      <rect x="43" y="58" width="2" height="4" fill="#1f2937" />
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
