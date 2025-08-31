/**
 * Validation utility functions
 */

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim().toLowerCase());
};

export const validatePassword = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const isValid = Object.values(requirements).every(Boolean);
  
  return {
    isValid,
    requirements
  };
};

export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field} is required`;
    }
  });
  
  return errors;
};
