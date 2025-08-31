const mongoose = require('mongoose');
const config = require('./environment');
const { AppError } = require('../middleware/errorHandler');

class Database {
  constructor() {
    this.connection = null;
    this._isConnected = false;
  }

  async connect() {
    try {
      if (!config.MONGODB_URI) {
        throw new AppError('MONGODB_URI is not configured', 500);
      }
      
      // Setup connection monitoring
      this.setupConnectionMonitoring();
      
      const options = {
        maxPoolSize: config.DB_MAX_POOL,
        minPoolSize: config.DB_MIN_POOL,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        heartbeatFrequencyMS: 10000,
        retryWrites: true,
        w: 'majority'
      };

      this.connection = await mongoose.connect(config.MONGODB_URI, options);
      this._isConnected = true;
      
      console.log(`✅ Connected to MongoDB: ${this.connection.connection.host}`);
      console.log(`   Database: ${this.connection.connection.name}`);
      console.log(`   Pool Size: ${config.DB_MIN_POOL}-${config.DB_MAX_POOL}`);
      
      return this.connection;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      this._isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        this._isConnected = false;
        console.log('📴 Disconnected from MongoDB');
      }
    } catch (error) {
      console.error('❌ MongoDB disconnection error:', error.message);
      throw error;
    }
  }

  isConnected() {
    return this._isConnected && mongoose.connection.readyState === 1;
  }

  // Get connection status details
  getConnectionStatus() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    return {
      isConnected: this.isConnected(),
      state: states[mongoose.connection.readyState] || 'unknown',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host || 'unknown',
      name: mongoose.connection.name || 'unknown'
    };
  }

  // Monitor connection events
  setupConnectionMonitoring() {
    mongoose.connection.on('connected', () => {
      console.log('🟢 MongoDB connection established');
      this._isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      console.error('🔴 MongoDB connection error:', err.message);
      this._isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🟡 MongoDB connection disconnected');
      this._isConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🟢 MongoDB connection reestablished');
      this._isConnected = true;
    });
  }
}

module.exports = new Database();
