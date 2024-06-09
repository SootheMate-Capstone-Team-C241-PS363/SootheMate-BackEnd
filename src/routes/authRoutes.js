const express = require('express');
const { body } = require('express-validator');
const { registerHandler, loginHandler, logoutHandler, updatePasswordHandler } = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();
const { registerValidator, loginValidator, updatePasswordValidator } = require('../validators/authValidators');
/**
 * Route to register a new user.
 *
 * @name POST /auth/register
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/register', registerValidator, validateRequest, registerHandler);


/**
 * Route to log in a user.
 *
 * @name POST /auth/login
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/login', loginValidator, validateRequest, loginHandler);

/**
 * Route for user logout.
 *
 * @name POST /auth/logout
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/logout', authenticate, logoutHandler);

/**
 * Route for updating user password.
 *
 * @name PUT /auth/update-password
 * @function
 * @memberof module:routes/authRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.put('/update-password', authenticate, updatePasswordValidator, validateRequest, updatePasswordHandler);


module.exports = router;
