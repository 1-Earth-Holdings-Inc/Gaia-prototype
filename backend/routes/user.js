const express = require('express');
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// User profile routes
router.get('/profile', auth(), userController.getCurrentUser);
router.put('/profile', auth(), userController.updateProfile);
router.patch('/location', auth(), userController.updateLocation);

// Earth Charter
router.post('/sign-earth-charter', auth(), userController.signEarthCharter);
router.post('/charter/sign', auth(), userController.signEarthCharter); // Legacy route

// User management (could be admin-only in the future)
router.get('/', auth(), userController.getAllUsers);
router.get('/stats', auth(), userController.getStats);
router.get('/check-email', userController.checkEmail);
router.get('/:id', auth(), userController.getUser);
router.delete('/:id', auth(), userController.deleteUser);

module.exports = router;


