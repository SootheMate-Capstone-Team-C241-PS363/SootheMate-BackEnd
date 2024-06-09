const { validationResult } = require('express-validator');
const ResponseFormatter = require('./responseFormatter');
const messages = require('../constants/responseMessages');

/**
 * Validate request inputs based on predefined validation rules.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array().map(error => error.msg).join('\n');
    return ResponseFormatter.fail(res, errorMessage, 400);
  }
  next();
}

module.exports = validateRequest;
