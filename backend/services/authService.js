const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/environment');
const { AppError } = require('../middleware/errorHandler');

class AuthService {
  /**
   * Generate JWT token
   * @param {string} userId - User ID
   * @param {object} payload - Additional payload data
   * @returns {string} JWT token
   */
  generateToken(userId, payload = {}) {
    return jwt.sign(
      { id: userId, ...payload },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );
  }

  /**
   * Hash password
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword(password) {
    return bcrypt.hash(password, config.BCRYPT_ROUNDS);
  }

  /**
   * Compare password
   * @param {string} password - Plain text password
   * @param {string} hash - Hashed password
   * @returns {Promise<boolean>} Password match result
   */
  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Register a new user
   * @param {object} userData - User registration data
   * @returns {Promise<object>} User and token
   */
  async register(userData) {
    const {
      firstName,
      middleInitial,
      lastName,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      generationalIdentity,
      citizenshipByBirth,
      birthplaceProvinceState,
      birthplaceCity,
      citizenshipByNaturalization,
      educationLevel,
      location,
      email,
      password,
    } = userData;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      throw new AppError('Required fields: firstName, lastName, email, password', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Please enter a valid email address', 400);
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError('An account with this email address already exists', 409);
    }

    // Hash password
    const passwordHash = await this.hashPassword(password);

    // Create user
    const user = await User.create({
      firstName,
      middleInitial,
      lastName,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      generationalIdentity,
      citizenshipByBirth,
      birthplaceProvinceState,
      birthplaceCity,
      citizenshipByNaturalization,
      educationLevel: educationLevel ? educationLevel.replace(/-/g, ' ') : '',
      location,
      email: email.toLowerCase(),
      passwordHash,
    });

    // Generate token
    const token = this.generateToken(user._id);

    // Return user without password hash
    const { passwordHash: _ph, ...userObj } = user.toObject();
    
    return {
      token,
      user: userObj
    };
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} User and token
   */
  async login(email, password) {
    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Check password
    const isValidPassword = await this.comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate token
    const token = this.generateToken(user._id);

    // Return user without password hash
    const { passwordHash: _ph, ...userObj } = user.toObject();
    
    return {
      token,
      user: userObj
    };
  }

  /**
   * Get user profile
   * @param {string} userId - User ID
   * @returns {Promise<object>} User profile
   */
  async getProfile(userId) {
    if (!userId) {
      throw new AppError('User ID is required', 400);
    }
    
    const user = await User.findById(userId).select('-passwordHash');
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return user;
  }

  /**
   * Verify JWT token
   * @param {string} token - JWT token
   * @returns {Promise<object>} Decoded token
   */
  async verifyToken(token) {
    try {
      return jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }
}

module.exports = new AuthService();
