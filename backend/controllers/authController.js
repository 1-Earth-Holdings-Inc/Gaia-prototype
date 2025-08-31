const authService = require('../services/authService');
const { AppError } = require('../middleware/errorHandler');

class AuthController {
  /**
   * Register a new user
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      
      res.created(result, 'User registered successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login user
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.success(result, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user profile
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.userId);
      
      res.success({ user }, 'Profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout user (client-side token removal)
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async logout(req, res, next) {
    try {
      // Since we're using stateless JWT, logout is handled client-side
      // This endpoint can be used for logging purposes or token blacklisting in the future
      
      res.success(null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify token
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async verifyToken(req, res, next) {
    try {
      const { token } = req.body;
      
      if (!token) {
        throw new AppError('Token is required', 400);
      }

      const decoded = await authService.verifyToken(token);
      
      res.success({ valid: true, decoded }, 'Token is valid');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh token (if implementing refresh token logic)
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async refreshToken(req, res, next) {
    try {
      // This is a placeholder for refresh token logic
      // You can implement refresh token functionality here
      
      throw new AppError('Refresh token functionality not implemented', 501);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
