const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const stressLevelRoutes = require('./stressRoutes');
const responseFormatter = require('../utils/responseFormatter');
const messages = require('../constants/responseMessages');

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
 * @memberof module:routes/userRoutes
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
 */
router.get('/', (req, res) => {
    return responseFormatter.success(res, messages.WELCOME_MESSAGE  )
  })

module.exports = router;
