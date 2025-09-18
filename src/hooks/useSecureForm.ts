import { useState, useCallback } from 'react';
import { 
  sanitizeInput, 
  validateInput, 
  generateCSRFToken, 
  validateCSRFToken,
  isValidEmail,
  isValidPassword 
} from '../utils/security';

interface FormState {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

interface UseSecureFormOptions {
  initialValues: FormState;
  validationRules?: {
    [key: string]: (value: any) => string | null;
  };
  enableCSRF?: boolean;
}

export const useSecureForm = ({ 
  initialValues, 
  validationRules = {}, 
  enableCSRF = true 
}: UseSecureFormOptions) => {
  const [values, setValues] = useState<FormState>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken] = useState(() => enableCSRF ? generateCSRFToken() : '');

  const validateField = useCallback((name: string, value: any): string | null => {
    const rule = validationRules[name];
    if (rule) {
      return rule(value);
    }
    return null;
  }, [validationRules]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validation des champs
    for (const [name, value] of Object.entries(values)) {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Sanitisation des données d'entrée
    let sanitizedValue = sanitizeInput(value);
    
    // Validation en temps réel
    const error = validateField(name, sanitizedValue);
    
    setValues(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    setErrors(prev => ({
      ...prev,
      [name]: error || ''
    }));
  }, [validateField]);

  const handleSubmit = useCallback(async (
    onSubmit: (values: FormState, csrfToken?: string) => Promise<void>
  ) => {
    setIsSubmitting(true);
    
    try {
      // Validation du formulaire
      if (!validateForm()) {
        return;
      }
      
      // Validation CSRF si activée
      if (enableCSRF && csrfToken && !validateCSRFToken(csrfToken, csrfToken)) {
        throw new Error('Token CSRF invalide - Session expirée');
      }
      
      // Validation et sanitisation des données finales
      const sanitizedValues = validateInput(values);
      
      await onSubmit(sanitizedValues, csrfToken);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, enableCSRF, csrfToken]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name: string, value: any) => {
    const sanitizedValue = sanitizeInput(value);
    setValues(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  }, []);

  const setFieldError = useCallback((name: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  return {
    values,
    errors,
    isSubmitting,
    csrfToken,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    validateForm
  };
};

// Règles de validation prédéfinies
export const validationRules = {
  email: (value: string) => {
    if (!value) return 'L\'email est requis';
    if (!isValidEmail(value)) return 'Format d\'email invalide';
    return null;
  },
  
  password: (value: string) => {
    if (!value) return 'Le mot de passe est requis';
    if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    if (!isValidPassword(value)) return 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    return null;
  },
  
  required: (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'Ce champ est requis';
    }
    return null;
  },
  
  minLength: (min: number) => (value: string) => {
    if (value && value.length < min) {
      return `Ce champ doit contenir au moins ${min} caractères`;
    }
    return null;
  },
  
  maxLength: (max: number) => (value: string) => {
    if (value && value.length > max) {
      return `Ce champ ne peut pas dépasser ${max} caractères`;
    }
    return null;
  },
  
  phone: (value: string) => {
    if (value && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
      return 'Format de téléphone invalide';
    }
    return null;
  }
};
