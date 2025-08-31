const config = require('../config/environment');
const database = require('../config/database');

/**
 * Setup basic application routes
 * @param {Express} app - Express application instance
 */
const setupBasicRoutes = (app) => {
  // Root route
  app.get('/', (req, res) => {
    res.success({
      name: 'Gaia Backend API',
      version: config.API_VERSION,
      environment: config.NODE_ENV,
      status: 'running'
    }, 'Welcome to Gaia Backend API');
  });

  // Health check route
  app.get('/health', (req, res) => {
    res.success({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: database.isConnected() ? 'connected' : 'disconnected',
      environment: config.NODE_ENV,
      version: config.API_VERSION
    }, 'Health check successful');
  });

  // API status route
  app.get(`${config.API_PREFIX}/status`, (req, res) => {
    res.success({
      status: 'running',
      environment: config.NODE_ENV,
      timestamp: new Date().toISOString(),
      version: config.API_VERSION,
      database: database.isConnected() ? 'connected' : 'disconnected'
    }, 'API status retrieved successfully');
  });
};

/**
 * Setup API routes
 * @param {Express} app - Express application instance
 */
const setupApiRoutes = (app) => {
  // Authentication routes
  app.use(`${config.API_PREFIX}/auth`, require('./auth'));
  
  // User management routes
  app.use(`${config.API_PREFIX}/user`, require('./user'));
  
  // Add more route modules here as the application grows
  // app.use(`${config.API_PREFIX}/admin`, require('./admin'));
  // app.use(`${config.API_PREFIX}/analytics`, require('./analytics'));
};

/**
 * Setup all application routes
 * @param {Express} app - Express application instance
 */
const setupRoutes = (app) => {
  setupBasicRoutes(app);
  setupApiRoutes(app);
};

module.exports = {
  setupRoutes,
  setupBasicRoutes,
  setupApiRoutes
};
