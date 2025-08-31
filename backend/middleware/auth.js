const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const { AppError } = require('./errorHandler');

/**
 * Authentication middleware
 * @param {boolean} required - Whether authentication is required
 * @returns {function} Express middleware function
 */
function auth(required = true) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;

      if (!token) {
        if (required) {
          return next(new AppError('Access token is required', 401));
        }
        req.userId = null;
        req.user = null;
        return next();
      }

      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.userId = decoded.id;
      req.user = decoded;
      
      next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        return next(new AppError('Invalid token', 401));
      }
      if (err.name === 'TokenExpiredError') {
        return next(new AppError('Token has expired', 401));
      }
      return next(new AppError('Authentication failed', 401));
    }
  };
}

/**
 * Authorization middleware for specific roles
 * @param {...string} roles - Allowed roles
 * @returns {function} Express middleware function
 */
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
}

module.exports = {
  auth,
  authorize
};


