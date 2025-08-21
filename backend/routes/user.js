const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Sign the Earth Charter
router.post('/charter/sign', auth(), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { earthCharterSigned: true },
      { new: true }
    ).select('-passwordHash');
    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to sign Earth Charter' });
  }
});

module.exports = router;


