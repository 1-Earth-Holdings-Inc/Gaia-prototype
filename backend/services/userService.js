const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');

class UserService {
  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<object>} User object
   */
  async getUserById(userId) {
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Promise<object>} User object
   */
  async getUserByEmail(email) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('-passwordHash');
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {object} updateData - Data to update
   * @returns {Promise<object>} Updated user
   */
  async updateProfile(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated this way
    const { passwordHash, email, _id, ...allowedUpdates } = updateData;

    const user = await User.findByIdAndUpdate(
      userId,
      allowedUpdates,
      { 
        new: true, 
        runValidators: true,
        select: '-passwordHash'
      }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Update user location
   * @param {string} userId - User ID
   * @param {object} locationData - Location data
   * @returns {Promise<object>} Updated user
   */
  async updateLocation(userId, locationData) {
    const { latitude, longitude, accuracy } = locationData;

    if (!latitude || !longitude) {
      throw new AppError('Latitude and longitude are required', 400);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          latitude,
          longitude,
          accuracy: accuracy || null,
          timestamp: new Date()
        }
      },
      { 
        new: true, 
        runValidators: true,
        select: '-passwordHash'
      }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Sign Earth Charter
   * @param {string} userId - User ID
   * @returns {Promise<object>} Updated user
   */
  async signEarthCharter(userId) {
    const user = await User.findByIdAndUpdate(
      userId,
      { earthCharterSigned: true },
      { 
        new: true, 
        runValidators: true,
        select: '-passwordHash'
      }
    );

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Get all users (admin only)
   * @param {object} filters - Query filters
   * @param {object} options - Query options (pagination, sorting)
   * @returns {Promise<object>} Users list with pagination
   */
  async getAllUsers(filters = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const users = await User.find(filters)
      .select('-passwordHash')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    return {
      users,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers: total,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  /**
   * Delete user
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
  }

  /**
   * Check if email exists
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} Email exists
   */
  async emailExists(email) {
    const user = await User.findOne({ email: email.toLowerCase() });
    return !!user;
  }

  /**
   * Get user statistics
   * @returns {Promise<object>} User statistics
   */
  async getUserStats() {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          earthCharterSigned: {
            $sum: { $cond: ['$earthCharterSigned', 1, 0] }
          },
          maleUsers: {
            $sum: { $cond: [{ $eq: ['$gender', 'Male'] }, 1, 0] }
          },
          femaleUsers: {
            $sum: { $cond: [{ $eq: ['$gender', 'Female'] }, 1, 0] }
          }
        }
      }
    ]);

    return stats[0] || {
      totalUsers: 0,
      earthCharterSigned: 0,
      maleUsers: 0,
      femaleUsers: 0
    };
  }
}

module.exports = new UserService();
