require('dotenv').config();

/**
 * Get environment variable with fallback
 * @param {string} name - Environment variable name
 * @param {any} defaultValue - Default value if not set
 * @returns {any} Environment variable value or default
 */
const getEnvVar = (name, defaultValue = undefined) => {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue === undefined) {
      console.warn(`⚠️  Environment variable ${name} is not set`);
    }
    return defaultValue;
  }
  return value;
};

const config = {
  // Server Configuration
  PORT: parseInt(getEnvVar('PORT', 5001)),
  NODE_ENV: getEnvVar('NODE_ENV', 'development'),
  
  // Database Configuration
  MONGODB_URI: getEnvVar('MONGODB_URI'),
  DB_MAX_POOL: parseInt(getEnvVar('DB_MAX_POOL', 20)),
  DB_MIN_POOL: parseInt(getEnvVar('DB_MIN_POOL', 5)),
  
  // JWT Configuration
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  JWT_EXPIRES_IN: getEnvVar('JWT_EXPIRES_IN', '7d'),
  
  // CORS Configuration
  CORS_ORIGIN: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  
  // API Configuration
  API_VERSION: getEnvVar('API_VERSION', '1.0.0'),
  API_PREFIX: getEnvVar('API_PREFIX', '/api'),
  
  // Security
  BCRYPT_ROUNDS: parseInt(getEnvVar('BCRYPT_ROUNDS', 12)),
};

// Validation for required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

if (config.NODE_ENV === 'production') {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    process.exit(1);
  }
  
  // Production security checks
  if (config.CORS_ORIGIN === '*') {
    console.warn('⚠️  CORS_ORIGIN is set to * in production. Consider restricting this for security.');
  }
  
  if (config.JWT_SECRET === 'dev_secret') {
    console.error('❌ JWT_SECRET must be changed from default in production');
    process.exit(1);
  }
}

// Development warnings
if (config.NODE_ENV === 'development') {
  console.log('🔧 Development mode configuration:');
  console.log(`   Port: ${config.PORT}`);
  console.log(`   CORS Origin: ${config.CORS_ORIGIN}`);
  console.log(`   Database Pool: ${config.DB_MIN_POOL}-${config.DB_MAX_POOL}`);
  console.log(`   API Prefix: ${config.API_PREFIX}`);
}

module.exports = config;
