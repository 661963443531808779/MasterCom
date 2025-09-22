// Utilitaires de performance pour MasterCom

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTimer(name: string): number {
    const startTime = this.metrics.get(name);
    if (!startTime) return 0;
    
    const duration = performance.now() - startTime;
    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(name);
    return fn().finally(() => this.endTimer(name));
  }

  getMemoryUsage(): any {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return null;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();

// Optimisations de chargement
export const preloadCriticalResources = () => {
  // Précharger les ressources critiques
  const criticalResources = [
    '/src/components/Navbar.tsx',
    '/src/components/Footer.tsx',
    '/src/pages/Home.tsx'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'script';
    document.head.appendChild(link);
  });
};

// Cache intelligent
export class SmartCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

export const smartCache = new SmartCache();

// Optimisations de rendu
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T => {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
};

// Optimisations d'images
export const optimizeImage = (src: string, width?: number, height?: number): string => {
  // Intégration future avec un service d'optimisation d'images
  let optimizedSrc = src;
  
  if (width) optimizedSrc += `?w=${width}`;
  if (height) optimizedSrc += `&h=${height}`;
  
  return optimizedSrc;
};

// Lazy loading
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Métriques de performance
export const trackPageLoad = () => {
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const metrics = {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
      largestContentfulPaint: performance.getEntriesByName('largest-contentful-paint')[0]?.startTime || 0
    };

    console.log('📊 Métriques de performance:', metrics);
    
    // Envoyer les métriques à un service d'analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_performance', metrics);
    }
  });
};

// Optimisations de bundle
export const codeSplitting = {
  // Lazy load des composants lourds
  lazyLoadComponent: (importFn: () => Promise<any>) => {
    // Implementation simplifiée sans React.lazy pour éviter les erreurs
    console.log('Lazy loading component:', importFn);
    return null;
  },

  // Précharger les routes critiques
  preloadRoute: (route: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }
};
