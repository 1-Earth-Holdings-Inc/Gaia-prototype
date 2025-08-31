const express = require('express');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// Protected routes
router.get('/me', auth(), authController.getProfile);
router.post('/verify-token', authController.verifyToken);
router.post('/refresh-token', auth(), authController.refreshToken);

module.exports = router;


