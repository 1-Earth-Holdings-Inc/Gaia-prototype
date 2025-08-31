const cors = require('cors');
const express = require('express');
const config = require('../config/environment');
const responseFormatter = require('./responseFormatter');
const { globalErrorHandler } = require('./errorHandler');

/**
 * Configure and return all middleware
 * @param {Express} app - Express application instance
 */
const setupMiddleware = (app) => {
  // CORS Configuration
  app.use(cors({ 
    origin: config.CORS_ORIGIN,
    credentials: config.CORS_ORIGIN !== '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Response formatter middleware
  app.use(responseFormatter);
};

/**
 * Setup error handling middleware (must be called after routes)
 * @param {Express} app - Express application instance
 */
const setupErrorHandling = (app) => {
  // 404 handler for unknown routes
  app.use('*', (req, res) => {
    res.notFound(`Route ${req.originalUrl} not found`);
  });

  // Global error handling middleware
  app.use(globalErrorHandler);
};

module.exports = {
  setupMiddleware,
  setupErrorHandling
};