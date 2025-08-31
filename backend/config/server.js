const database = require('./database');
const config = require('./environment');

/**
 * Server configuration and lifecycle management
 */
class ServerManager {
  constructor() {
    this.server = null;
  }

  /**
   * Setup graceful shutdown handlers
   */
  setupGracefulShutdown() {
    process.on('SIGTERM', this.gracefulShutdown.bind(this));
    process.on('SIGINT', this.gracefulShutdown.bind(this));
  }

  /**
   * Handle graceful shutdown
   * @param {string} signal - The shutdown signal received
   */
  async gracefulShutdown(signal) {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
    
    try {
      // Close HTTP server
      if (this.server) {
        await new Promise((resolve) => {
          this.server.close(resolve);
        });
        console.log('✅ HTTP server closed');
      }

      // Disconnect from database
      await database.disconnect();
      console.log('✅ Database disconnected successfully');
      
      process.exit(0);
    } catch (error) {
      console.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }

  /**
   * Setup uncaught exception handlers
   */
  setupExceptionHandlers() {
    process.on('uncaughtException', (error) => {
      console.error('💥 Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  }

  /**
   * Handle server errors
   * @param {Error} error - Server error
   */
  handleServerError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {
      case 'EACCES':
        console.error(`❌ Port ${config.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`❌ Port ${config.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Log server startup information
   */
  logServerInfo() {
    console.log('\n🚀 Gaia Backend Server Started Successfully!');
    console.log('=====================================');
    console.log(`🌐 Server: http://localhost:${config.PORT}`);
    console.log(`🏥 Health: http://localhost:${config.PORT}/health`);
    console.log(`📊 Status: http://localhost:${config.PORT}${config.API_PREFIX}/status`);
    console.log(`🌍 Environment: ${config.NODE_ENV}`);
    console.log(`📡 API Version: ${config.API_VERSION}`);
    console.log(`🗄️  Database: ${database.isConnected() ? 'Connected' : 'Disconnected'}`);
    console.log('=====================================\n');
  }

  /**
   * Start the HTTP server
   * @param {Express} app - Express application instance
   * @returns {Promise<Server>} HTTP server instance
   */
  async startServer(app) {
    try {
      // Connect to database first
      await database.connect();
      
      // Create and start HTTP server
      this.server = app.listen(config.PORT, () => {
        this.logServerInfo();
      });

      // Handle server errors
      this.server.on('error', this.handleServerError.bind(this));

      return this.server;
    } catch (error) {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    }
  }

  /**
   * Initialize server with all configurations
   * @param {Express} app - Express application instance
   * @returns {Promise<Server>} HTTP server instance
   */
  async initialize(app) {
    // Setup exception handlers
    this.setupExceptionHandlers();
    
    // Setup graceful shutdown
    this.setupGracefulShutdown();
    
    // Start the server
    return await this.startServer(app);
  }
}

module.exports = new ServerManager();
