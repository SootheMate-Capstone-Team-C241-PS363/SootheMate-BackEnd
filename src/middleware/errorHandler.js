const ResponseFormatter = require('../utils/responseFormatter');
const messages = require('../constants/responseMessages');

/**
 * Error handling middleware for the application.
 *
 * @param {Object} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || messages.INTERNAL_SERVER_ERROR;
  ResponseFormatter.fail(res, message, statusCode);
}

module.exports = errorHandler;
