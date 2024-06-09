const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const stressLevelRoutes = require('./stressLevel');

/**
 * Main application routes.
 *
 * @module routes/authRoutes
 */

/**
 * Use authentication routes.
 *
 * @name /auth
 * @memberof module:routes/authRoutes
 */
router.use('/auth', authRoutes);

/**
 * Use user routes.
 *
 * @name /user
 * @memberof module:routes/authRoutes
 */
router.use('/user', userRoutes);

/**
 * stress level route.
 * 
 * @memberof module:routes/stress
 * 
 */
router.use('/stress', stressLevelRoutes);


/**
 * Welcome route.
 *
 * @name GET /
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Welcome To API SootheMate V 0.0.1'});
  })

module.exports = router;
