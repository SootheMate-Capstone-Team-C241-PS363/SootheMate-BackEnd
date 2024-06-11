const express = require('express');
const router = express.Router();
const { getHistoryHandler } = require('../controllers/historyController');
const authenticate = require('../middleware/authentication');

/**
 * Route to get user history.
 *
 * @name GET /stress/history
 * @function
 * @memberof module:routes/historyRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.get('/history', authenticate, getHistoryHandler);

module.exports = router;
