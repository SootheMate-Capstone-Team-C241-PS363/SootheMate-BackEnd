const { validationResult } = require('express-validator');

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
    // return res.status(400).json({ errors: errors.array() });
    // res.status(400).json({ status: 'engror', message: errors.message, detail: errors.array() });
    // res.status(400).json({ status: 'engror', message: errors.array() });
    // const errorMessage = errors.array().reduce((acc, error) => acc + `/n ${error.msg}`, '');
    const errorMessage = errors.array().reduce((acc, error) => `${acc ? '\n' : ''}${error.msg}`, '');
    return res.status(400).json({ status : 'fail', message: errorMessage, data : {}})

  }
  next();
}

module.exports = validateRequest;
