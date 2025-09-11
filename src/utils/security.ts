// Utilitaires de sécurité pour protéger contre XSS et CSRF

/**
 * Sanitise une chaîne de caractères pour prévenir les attaques XSS
 * @param input - La chaîne à sanitiser
 * @returns La chaîne sanitée
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/[<>]/g, '') // Supprime les balises HTML
    .replace(/javascript:/gi, '') // Supprime les liens javascript
    .replace(/on\w+=/gi, '') // Supprime les gestionnaires d'événements
    .replace(/script/gi, '') // Supprime les scripts
    .trim();
};

/**
 * Échappe les caractères HTML pour l'affichage sécurisé
 * @param input - La chaîne à échapper
 * @returns La chaîne échappée
 */
export const escapeHtml = (input: string): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };
  
  return input.replace(/[&<>"'/]/g, (s) => map[s]);
};

/**
 * Valide une adresse email
 * @param email - L'email à valider
 * @returns true si l'email est valide
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valide un mot de passe (minimum 8 caractères, au moins une majuscule, une minuscule et un chiffre)
 * @param password - Le mot de passe à valider
 * @returns true si le mot de passe est valide
 */
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Génère un token CSRF aléatoire
 * @returns Un token CSRF
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Valide un token CSRF
 * @param token - Le token à valider
 * @param sessionToken - Le token de session
 * @returns true si le token est valide
 */
export const validateCSRFToken = (token: string, sessionToken: string): boolean => {
  return token === sessionToken && token.length === 64;
};

/**
 * Valide les données d'entrée pour prévenir l'injection
 * @param data - Les données à valider
 * @returns Les données validées
 */
export const validateInput = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(validateInput);
  }
  
  if (data && typeof data === 'object') {
    const validated: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        validated[key] = validateInput(data[key]);
      }
    }
    return validated;
  }
  
  return data;
};

/**
 * Configure les en-têtes de sécurité pour les requêtes
 * @param token - Token CSRF optionnel
 * @returns Les en-têtes de sécurité
 */
export const getSecurityHeaders = (token?: string) => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
  
  if (token) {
    headers['X-CSRF-Token'] = token;
  }
  
  return headers;
};

/**
 * Vérifie si une URL est sûre (pas de javascript:, data:, etc.)
 * @param url - L'URL à vérifier
 * @returns true si l'URL est sûre
 */
export const isSafeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  const unsafeProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = url.toLowerCase();
  
  return !unsafeProtocols.some(protocol => lowerUrl.startsWith(protocol));
};

/**
 * Limite la longueur d'une chaîne pour prévenir les attaques par déni de service
 * @param input - La chaîne à limiter
 * @param maxLength - Longueur maximale (défaut: 1000)
 * @returns La chaîne tronquée si nécessaire
 */
export const limitStringLength = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input.length > maxLength ? input.substring(0, maxLength) : input;
};

/**
 * Validation spécifique pour les projets
 * @param projectData - Les données du projet à valider
 * @returns Object avec isValid et errors
 */
export const validateProjectData = (projectData: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validation du nom
  if (!projectData.name || projectData.name.trim().length === 0) {
    errors.push('Le nom du projet est requis');
  } else if (projectData.name.length > 255) {
    errors.push('Le nom du projet ne peut pas dépasser 255 caractères');
  }
  
  // Validation de la description
  if (projectData.description && projectData.description.length > 2000) {
    errors.push('La description ne peut pas dépasser 2000 caractères');
  }
  
  // Validation du statut
  const validStatuses = ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'];
  if (projectData.status && !validStatuses.includes(projectData.status)) {
    errors.push('Statut de projet invalide');
  }
  
  // Validation de la priorité
  const validPriorities = ['low', 'medium', 'high', 'urgent'];
  if (projectData.priority && !validPriorities.includes(projectData.priority)) {
    errors.push('Priorité de projet invalide');
  }
  
  // Validation des dates
  if (projectData.start_date && !isValidDate(projectData.start_date)) {
    errors.push('Date de début invalide');
  }
  
  if (projectData.end_date && !isValidDate(projectData.end_date)) {
    errors.push('Date de fin invalide');
  }
  
  if (projectData.start_date && projectData.end_date) {
    const startDate = new Date(projectData.start_date);
    const endDate = new Date(projectData.end_date);
    if (startDate >= endDate) {
      errors.push('La date de fin doit être postérieure à la date de début');
    }
  }
  
  // Validation du budget
  if (projectData.budget !== undefined && projectData.budget !== null) {
    const budget = parseFloat(projectData.budget);
    if (isNaN(budget) || budget < 0) {
      errors.push('Le budget doit être un nombre positif');
    }
    if (budget > 10000000) {
      errors.push('Le budget ne peut pas dépasser 10 000 000€');
    }
  }
  
  // Validation de la progression
  if (projectData.progress !== undefined && projectData.progress !== null) {
    const progress = parseInt(projectData.progress);
    if (isNaN(progress) || progress < 0 || progress > 100) {
      errors.push('La progression doit être un nombre entre 0 et 100');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validation des dates
 * @param dateString - La chaîne de date à valider
 * @returns true si la date est valide
 */
const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Contrôle d'accès pour les projets
 * @param userRole - Le rôle de l'utilisateur
 * @param project - Le projet à vérifier
 * @param userId - L'ID de l'utilisateur
 * @returns true si l'utilisateur peut accéder au projet
 */
export const canAccessProject = (userRole: string, project: any, userId?: string): boolean => {
  // Les masters ont accès à tout
  if (userRole === 'master') {
    return true;
  }
  
  // Les commerciaux ont accès aux projets qui leur sont assignés
  if (userRole === 'commercial') {
    return project.commercial_id === userId;
  }
  
  // Les clients ont accès aux projets qui leur sont assignés
  if (userRole === 'client') {
    return project.client_id === userId;
  }
  
  return false;
};

/**
 * Sanitisation des données de projet
 * @param projectData - Les données du projet à sanitiser
 * @returns Les données sanitizées
 */
export const sanitizeProjectData = (projectData: any): any => {
  const sanitized = { ...projectData };
  
  // Nettoyer les chaînes de caractères
  if (sanitized.name) {
    sanitized.name = sanitizeInput(sanitized.name.trim().substring(0, 255));
  }
  
  if (sanitized.description) {
    sanitized.description = sanitizeInput(sanitized.description.trim().substring(0, 2000));
  }
  
  // Nettoyer les montants
  if (sanitized.budget !== undefined && sanitized.budget !== null) {
    const budget = parseFloat(sanitized.budget);
    sanitized.budget = isNaN(budget) ? null : Math.max(0, Math.min(budget, 10000000));
  }
  
  // Nettoyer la progression
  if (sanitized.progress !== undefined && sanitized.progress !== null) {
    const progress = parseInt(sanitized.progress);
    sanitized.progress = isNaN(progress) ? 0 : Math.max(0, Math.min(progress, 100));
  }
  
  return sanitized;
};