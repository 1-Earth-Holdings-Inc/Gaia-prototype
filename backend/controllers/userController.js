const userService = require('../services/userService');
const { AppError } = require('../middleware/errorHandler');

class UserController {
  /**
   * Get user profile by ID
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      
      res.success({ user }, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user profile
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async updateProfile(req, res, next) {
    try {
      const userId = req.userId; // From auth middleware
      const user = await userService.updateProfile(userId, req.body);
      
      res.updated({ user }, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user location
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async updateLocation(req, res, next) {
    try {
      const userId = req.userId;
      const user = await userService.updateLocation(userId, req.body);
      
      res.updated({ user }, 'Location updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Sign Earth Charter
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async signEarthCharter(req, res, next) {
    try {
      const userId = req.userId;
      const user = await userService.signEarthCharter(userId);
      
      res.updated({ user }, 'Earth Charter signed successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all users (admin functionality)
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async getAllUsers(req, res, next) {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search,
        gender,
        earthCharterSigned
      } = req.query;

      // Build filters
      const filters = {};
      if (search) {
        filters.$or = [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ];
      }
      if (gender) filters.gender = gender;
      if (earthCharterSigned !== undefined) {
        filters.earthCharterSigned = earthCharterSigned === 'true';
      }

      // Build options
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        sortOrder
      };

      const result = await userService.getAllUsers(filters, options);
      
      res.success(result, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);
      
      res.deleted('User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Check if email exists
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async checkEmail(req, res, next) {
    try {
      const { email } = req.query;
      
      if (!email) {
        throw new AppError('Email parameter is required', 400);
      }

      const exists = await userService.emailExists(email);
      
      res.success({ exists }, 'Email check completed');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user statistics
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async getStats(req, res, next) {
    try {
      const stats = await userService.getUserStats();
      
      res.success({ stats }, 'Statistics retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user's profile (different from auth/me for organizational purposes)
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @param {function} next - Express next function
   */
  async getCurrentUser(req, res, next) {
    try {
      const user = await userService.getUserById(req.userId);
      
      res.success({ user }, 'Current user profile retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
