import React, { memo } from 'react';

interface LoadingFallbackProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const LoadingFallback: React.FC<LoadingFallbackProps> = memo(({ 
  message = 'Chargement...', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px] gpu-accelerated">
      <div className="text-center">
        <div className={`animate-spin-fast rounded-full border-b-2 border-blue-600 mx-auto mb-3 ${sizeClasses[size]}`}></div>
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
});

export default LoadingFallback;
