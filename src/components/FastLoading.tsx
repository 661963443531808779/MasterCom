import React, { memo } from 'react';
import { Loader2 } from 'lucide-react';

interface FastLoadingProps {
  message?: string;
  showProgress?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const FastLoading: React.FC<FastLoadingProps> = memo(({ 
  message = 'Chargement...', 
  showProgress = false,
  size = 'md',
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const containerClasses = fullScreen 
    ? 'flex items-center justify-center min-h-screen bg-white'
    : 'flex items-center justify-center min-h-[100px]';

  return (
    <div className={containerClasses} style={{ willChange: 'transform' }}>
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} style={{ animationDuration: '0.8s' }} />
        </div>
        <p className="text-gray-600 text-sm font-medium">{message}</p>
        {showProgress && (
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>
    </div>
  );
});

FastLoading.displayName = 'FastLoading';

export default FastLoading;
