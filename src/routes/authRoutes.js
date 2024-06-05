const express = require('express');
const { body } = require('express-validator');
const { registerHandler, loginHandler, logoutHandler, updatePasswordHandler } = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();

/**
 * Route to register a new user.
 *
 * @name POST /auth/register
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/register', [
  body('name').exists().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
], validateRequest, registerHandler);

/**
 * Route to log in a user.
 *
 * @name POST /auth/login
 * @function
 * @memberof module:routes/authRoutes
 */
router.post('/login', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').exists().withMessage('Password is required')
], validateRequest, loginHandler);

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
router.put('/update-password', authenticate, [
  body('old_password').exists().withMessage('Old password is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('password_confirmation').exists().withMessage('Password confirmation is required').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
], validateRequest, updatePasswordHandler);

module.exports = router;
