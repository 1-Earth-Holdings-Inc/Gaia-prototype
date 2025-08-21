const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '7d',
  });
}

// Register
router.post('/register', async (req, res) => {
  try {
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
    } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Required: firstName, lastName, email, password' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    // Check for existing user with the same email (case-insensitive)
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);
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
      email,
      passwordHash,
    });

    const token = signToken(user._id);
    const { passwordHash: _ph, ...userObj } = user.toObject();
    return res.status(201).json({ token, user: userObj });
  } catch (err) {
    console.error(err);
    
    // Handle MongoDB duplicate key error (fallback for race conditions)
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      return res.status(409).json({ error: 'An account with this email address already exists' });
    }
    
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user._id);
    const { passwordHash: _ph, ...userObj } = user.toObject();
    return res.json({ token, user: userObj });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

// Me
router.get('/me', auth(), async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash');
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user });
});

module.exports = router;


