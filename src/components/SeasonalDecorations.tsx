import React, { FC } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SeasonalDecorations: FC = () => {
  const { currentTheme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  if (currentTheme === 'none') {
    return null;
  }

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

        /* Effets de particules subtils */
        .theme-halloween::after {
          content: '🎃 👻 🦇 💀';
          position: fixed;
          top: 20px;
          left: 20px;
          font-size: 24px;
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .theme-christmas::after {
          content: '🎄 🎁 ❄️ ⭐';
          position: fixed;
          top: 20px;
          right: 20px;
          font-size: 24px;
          opacity: 0.3;
          animation: float 8s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .theme-easter::after {
          content: '🥚 🐰 🌸 🧺';
          position: fixed;
          bottom: 20px;
          left: 20px;
          font-size: 24px;
          opacity: 0.3;
          animation: float 7s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        .theme-summer::after {
          content: '☀️ 🌴 🍦 🏖️';
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-size: 24px;
          opacity: 0.3;
          animation: float 5s ease-in-out infinite;
          z-index: 2;
          pointer-events: none;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
    </>
  );
};

export default SeasonalDecorations;
