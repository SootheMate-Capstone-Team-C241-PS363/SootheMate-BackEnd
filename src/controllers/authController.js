/**
 * Authentication Controller
 *
 * @module controllers/authController
 */
const { registerUser, loginUser } = require('../services/authService');
const bcrypt = require('bcrypt');
const { Firestore } = require('@google-cloud/firestore');
const { addTokenToBlacklist } = require('../middleware/blacklistToken');
const ResponseFormatter = require('../utils/responseFormatter');
const firestore = new Firestore();

/**
 * Handler for user registration.
 *
 * @async
 * @function registerHandler
 * @memberof module:controllers/authController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function registerHandler(req, res) {
  try {
    const { name, email, password, password_confirmation } = req.body;
    if (password !== password_confirmation) {
      return ResponseFormatter.fail(res, 'Password confirmation does not match password');
    }

    const result = await registerUser({ name, email, password });
    return ResponseFormatter.success(res,'User registered successfully', result )
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 409)
  }
}

/**
 * Handler for user login.
 *
 * @async
 * @function loginHandler
 * @memberof module:controllers/authController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    return ResponseFormatter.success(res,'Login successful', result );
  } catch (error) {
    return ResponseFormatter.fail(res, error.message, 401);
  }
}

/**
 * Handler for updating user password.
 *
 * @async
 * @function updatePasswordHandler
 * @memberof module:controllers/authController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updatePasswordHandler(req, res) {
  try {
    const { old_password, password, password_confirmation } = req.body;
    const user = req.user;

    if (password !== password_confirmation) {
      return ResponseFormatter.fail(res,'Password confirmation does not match' )
    }

    const userRef = firestore.collection('users').doc(user.email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return ResponseFormatter.fail(res, 'User not found', 404);
    }

    const userData = doc.data();
    const match = await bcrypt.compare(old_password, userData.password);

    if (!match) {
      return ResponseFormatter.fail(res, 'Old password is incorrect', 401);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userRef.update({ password: hashedPassword });

    return ResponseFormatter.success(res, 'Password changed');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

/**
 * Handler for user logout.
 *
 * @async
 * @function logoutHandler
 * @memberof module:controllers/authController
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function logoutHandler(req, res) {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    addTokenToBlacklist(token);
    return ResponseFormatter.success(res, 'Logout successful');
  } catch (error) {
    return ResponseFormatter.error(res, error.message);
  }
}

module.exports = { registerHandler, loginHandler, updatePasswordHandler, logoutHandler };
