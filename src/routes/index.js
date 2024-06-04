const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Welcome To API SootheMate V 0.0.1'});
  })

module.exports = router;
