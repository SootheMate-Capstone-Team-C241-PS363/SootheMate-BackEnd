const express = require('express');
const { body } = require('express-validator');
const { getUserDetailHandler, updateAvatarHandler, updateProfileHandler } = require('../controllers/userController');
const validateRequest = require('../utils/validateRequest');
const { updateUserValidator } = require('../validators/userValidators');
const authenticate = require('../middleware/authentication');
const avatar = require('../middleware/avatar');
const router = express.Router();

/**
 * Get user details.
 *
 * @name GET /user/detail
 * @function
 * @memberof module:routes/userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/detail', authenticate, getUserDetailHandler);

/**
 * Update user avatar.
 *
 * @name POST /user/avatar
 * @function
 * @memberof module:routes/userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/avatar', authenticate, avatar.single('avatar'), updateAvatarHandler);

/**
 * Update user profile.
 *
 * @name PUT /user/update
 * @function
 * @memberof module:routes/userRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.put('/update', authenticate, updateUserValidator, validateRequest, updateProfileHandler);


module.exports = router;
