// Système d'analytics avancé pour MasterCom

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  properties?: Record<string, any>;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

export interface PageView {
  page: string;
  title: string;
  url: string;
  referrer: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  duration?: number;
}

export interface UserMetrics {
  userId?: string;
  sessionId: string;
  pageViews: PageView[];
  events: AnalyticsEvent[];
  startTime: number;
  lastActivity: number;
  device: {
    userAgent: string;
    screen: string;
    language: string;
    timezone: string;
  };
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private sessionId: string;
  private userId?: string;
  private metrics: UserMetrics;
  private isEnabled: boolean = true;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.metrics = {
      sessionId: this.sessionId,
      pageViews: [],
      events: [],
      startTime: Date.now(),
      lastActivity: Date.now(),
      device: {
        userAgent: navigator.userAgent,
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    this.setupAutoTracking();
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupAutoTracking(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('engagement', 'page_hidden', 'visibility_change');
      } else {
        this.trackEvent('engagement', 'page_visible', 'visibility_change');
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.trackEvent('engagement', 'scroll_depth', `scroll_${scrollDepth}%`);
      }
    };

    // Throttle scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 100);
    });

    // Track clicks on external links
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.startsWith(window.location.origin)) {
        this.trackEvent('engagement', 'external_link_click', link.href);
      }
    });

    // Track form interactions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('engagement', 'form_submit', form.id || form.className);
    });

    // Track file downloads
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.download) {
        this.trackEvent('engagement', 'file_download', link.download);
      }
    });
  }

  setUserId(userId: string): void {
    this.userId = userId;
    this.metrics.userId = userId;
  }

  trackPageView(page: string, title?: string): void {
    const pageView: PageView = {
      page,
      title: title || document.title,
      url: window.location.href,
      referrer: document.referrer,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.metrics.pageViews.push(pageView);
    this.metrics.lastActivity = Date.now();

    console.log('📊 Page View:', pageView);
    this.sendToAnalytics('page_view', pageView);
  }

  trackEvent(category: string, action: string, label?: string, value?: number, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      event: `${category}_${action}`,
      category,
      action,
      label,
      value,
      properties,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
    };

    this.metrics.events.push(event);
    this.metrics.lastActivity = Date.now();

    console.log('📊 Event:', event);
    this.sendToAnalytics('event', event);
  }

  trackUserAction(action: string, details?: Record<string, any>): void {
    this.trackEvent('user_action', action, undefined, undefined, details);
  }

  trackBusinessMetric(metric: string, value: number, context?: Record<string, any>): void {
    this.trackEvent('business_metric', metric, undefined, value, context);
  }

  trackError(error: Error, context?: Record<string, any>): void {
    this.trackEvent('error', 'javascript_error', error.message, undefined, {
      stack: error.stack,
      ...context,
    });
  }

  trackPerformance(metric: string, value: number, context?: Record<string, any>): void {
    this.trackEvent('performance', metric, undefined, value, context);
  }

  private sendToAnalytics(type: string, data: any): void {
    if (!this.isEnabled) return;

    // Envoyer à Google Analytics si disponible
    if (typeof window !== 'undefined' && (window as any).gtag) {
      if (type === 'page_view') {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: data.title,
          page_location: data.url,
        });
      } else if (type === 'event') {
        (window as any).gtag('event', data.action, {
          event_category: data.category,
          event_label: data.label,
          value: data.value,
          ...data.properties,
        });
      }
    }

    // Envoyer à un endpoint personnalisé (pour stockage en base)
    this.sendToCustomEndpoint(type, data);
  }

  private async sendToCustomEndpoint(type: string, data: any): Promise<void> {
    try {
      // Dans un vrai projet, vous enverriez à votre API
      console.log('📡 Sending to analytics endpoint:', { type, data });
      
      // Simulation d'envoi - désactivé pour éviter les erreurs 404
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     type,
      //     data,
      //     timestamp: Date.now(),
      //   }),
      // });
    } catch (error) {
      console.warn('Failed to send analytics data:', error);
    }
  }

  getMetrics(): UserMetrics {
    return { ...this.metrics };
  }

  getSessionDuration(): number {
    return Date.now() - this.metrics.startTime;
  }

  getPageViewCount(): number {
    return this.metrics.pageViews.length;
  }

  getEventCount(): number {
    return this.metrics.events.length;
  }

  enable(): void {
    this.isEnabled = true;
  }

  disable(): void {
    this.isEnabled = false;
  }

  reset(): void {
    this.sessionId = this.generateSessionId();
    this.metrics = {
      sessionId: this.sessionId,
      pageViews: [],
      events: [],
      startTime: Date.now(),
      lastActivity: Date.now(),
      device: this.metrics.device,
      userId: this.userId,
    };
  }
}

// Instance globale
export const analytics = AnalyticsManager.getInstance();

// Hooks pour React
export const useAnalytics = () => {
  const trackPageView = (page: string, title?: string) => {
    analytics.trackPageView(page, title);
  };

  const trackEvent = (category: string, action: string, label?: string, value?: number, properties?: Record<string, any>) => {
    analytics.trackEvent(category, action, label, value, properties);
  };

  const trackUserAction = (action: string, details?: Record<string, any>) => {
    analytics.trackUserAction(action, details);
  };

  const trackBusinessMetric = (metric: string, value: number, context?: Record<string, any>) => {
    analytics.trackBusinessMetric(metric, value, context);
  };

  const trackError = (error: Error, context?: Record<string, any>) => {
    analytics.trackError(error, context);
  };

  const trackPerformance = (metric: string, value: number, context?: Record<string, any>) => {
    analytics.trackPerformance(metric, value, context);
  };

  return {
    trackPageView,
    trackEvent,
    trackUserAction,
    trackBusinessMetric,
    trackError,
    trackPerformance,
    getMetrics: analytics.getMetrics.bind(analytics),
    getSessionDuration: analytics.getSessionDuration.bind(analytics),
    getPageViewCount: analytics.getPageViewCount.bind(analytics),
    getEventCount: analytics.getEventCount.bind(analytics),
  };
};

// Fonctions utilitaires
export const trackPageLoad = () => {
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    analytics.trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart);
    analytics.trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.fetchStart);
    analytics.trackPerformance('first_paint', navigation.domContentLoadedEventEnd - navigation.fetchStart);
  });
};

export const trackUserEngagement = () => {
  let engagementTime = 0;
  let lastActivity = Date.now();

  const updateEngagement = () => {
    const now = Date.now();
    engagementTime += now - lastActivity;
    lastActivity = now;
  };

  // Track mouse movement, clicks, scrolls, etc.
  ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, updateEngagement, true);
  });

  // Send engagement data every 30 seconds
  setInterval(() => {
    if (engagementTime > 0) {
      analytics.trackBusinessMetric('user_engagement_time', engagementTime);
      engagementTime = 0;
    }
  }, 30000);
};
