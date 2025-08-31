/**
 * Validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result
 */
const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];
  
  if (!password || password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

/**
 * Calculate password strength
 * @param {string} password - Password to check
 * @returns {string} Strength level
 */
const calculatePasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  if (score < 3) return 'weak';
  if (score < 5) return 'medium';
  return 'strong';
};

/**
 * Validate required fields
 * @param {object} data - Data object to validate
 * @param {array} requiredFields - Array of required field names
 * @returns {object} Validation result
 */
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missingFields.push(field);
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields,
    message: missingFields.length > 0 ? `Missing required fields: ${missingFields.join(', ')}` : null
  };
};

/**
 * Validate coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {boolean} Are valid coordinates
 */
const isValidCoordinates = (latitude, longitude) => {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
};

/**
 * Sanitize string input
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

/**
 * Validate MongoDB ObjectId
 * @param {string} id - ID to validate
 * @returns {boolean} Is valid ObjectId
 */
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Validate age based on birth year
 * @param {number} birthYear - Birth year
 * @returns {object} Validation result
 */
const validateAge = (birthYear) => {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;
  const minAge = 13; // Minimum age requirement
  const maxAge = 120; // Maximum reasonable age

  return {
    isValid: age >= minAge && age <= maxAge,
    age,
    errors: age < minAge ? [`Must be at least ${minAge} years old`] : 
           age > maxAge ? [`Age cannot exceed ${maxAge} years`] : []
  };
};

module.exports = {
  isValidEmail,
  validatePassword,
  calculatePasswordStrength,
  validateRequiredFields,
  isValidCoordinates,
  sanitizeString,
  isValidObjectId,
  validateAge
};
