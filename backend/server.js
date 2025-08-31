/**
 * Gaia Backend Server Entry Point
 * 
 * This is the main entry point for the Gaia backend application.
 * All configuration, middleware, routes, and server setup is handled here.
 */

const express = require('express');
const { setupMiddleware, setupErrorHandling } = require('./middleware');
const { setupRoutes } = require('./routes');
const serverManager = require('./config/server');

/**
 * Create and configure Express application
 * @returns {Express} Configured Express app
 */
const createApp = () => {
  const app = express();

  // Setup middleware
  setupMiddleware(app);

  // Setup routes
  setupRoutes(app);

  // Setup error handling (must be last)
  setupErrorHandling(app);

  return app;
};

/**
 * Bootstrap and start the application
 */
async function bootstrap() {
  try {
    // Create Express application with all configurations
    const app = createApp();
    
    // Initialize and start server with all lifecycle management
    await serverManager.initialize(app);
    
  } catch (error) {
    console.error('💥 Failed to bootstrap application:', error.message);
    process.exit(1);
  }
}

// Start the application
bootstrap();
