/**
 * Helper utility functions
 */

/**
 * Format user data for response (remove sensitive fields)
 * @param {object} user - User object
 * @returns {object} Sanitized user object
 */
const formatUserResponse = (user) => {
  if (!user) return null;
  
  const userObj = user.toObject ? user.toObject() : user;
  const { passwordHash, __v, ...sanitizedUser } = userObj;
  
  return sanitizedUser;
};

/**
 * Generate pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {object} Pagination metadata
 */
const generatePaginationMeta = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
    nextPage: page < totalPages ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null
  };
};

/**
 * Create a delay (useful for rate limiting or testing)
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Deep clone an object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Generate random string
 * @param {number} length - Length of string
 * @param {string} charset - Character set to use
 * @returns {string} Random string
 */
const generateRandomString = (length = 10, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
};

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} Is empty
 */
const isEmpty = (obj) => {
  return obj === null || obj === undefined || 
         (typeof obj === 'object' && Object.keys(obj).length === 0) ||
         (typeof obj === 'string' && obj.trim().length === 0) ||
         (Array.isArray(obj) && obj.length === 0);
};

/**
 * Pick specific fields from object
 * @param {object} obj - Source object
 * @param {array} fields - Fields to pick
 * @returns {object} Object with picked fields
 */
const pick = (obj, fields) => {
  const result = {};
  fields.forEach(field => {
    if (obj.hasOwnProperty(field)) {
      result[field] = obj[field];
    }
  });
  return result;
};

/**
 * Omit specific fields from object
 * @param {object} obj - Source object
 * @param {array} fields - Fields to omit
 * @returns {object} Object without omitted fields
 */
const omit = (obj, fields) => {
  const result = { ...obj };
  fields.forEach(field => {
    delete result[field];
  });
  return result;
};

/**
 * Format date to ISO string
 * @param {Date} date - Date to format
 * @returns {string} ISO formatted date
 */
const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString();
};

/**
 * Calculate age from birth year
 * @param {number} birthYear - Birth year
 * @returns {number} Age
 */
const calculateAge = (birthYear) => {
  if (!birthYear) return null;
  return new Date().getFullYear() - birthYear;
};

/**
 * Mask email for privacy
 * @param {string} email - Email to mask
 * @returns {string} Masked email
 */
const maskEmail = (email) => {
  if (!email || typeof email !== 'string') return '';
  
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return email;
  
  const maskedLocal = localPart.length > 2 
    ? localPart.substring(0, 2) + '*'.repeat(localPart.length - 2)
    : localPart;
    
  return `${maskedLocal}@${domain}`;
};

module.exports = {
  formatUserResponse,
  generatePaginationMeta,
  delay,
  deepClone,
  capitalize,
  generateRandomString,
  isEmpty,
  pick,
  omit,
  formatDate,
  calculateAge,
  maskEmail
};
