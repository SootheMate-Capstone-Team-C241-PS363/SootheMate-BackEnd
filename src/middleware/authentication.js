const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwtConfig');
const { isTokenBlacklisted } = require('./blacklistToken');
const ResponseFormatter = require('../utils/responseFormatter');
/**
 * Authenticate user based on the provided JWT token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return ResponseFormatter.fail(res, "Unauthorized", 401);
  }

  if (isTokenBlacklisted(token)) {
    return ResponseFormatter.fail(res, "Token has been revoked", 401);
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return ResponseFormatter.fail(res, "Forbidden", 403);
    }
    req.user = user;
    next();
  });

}
module.exports = authenticate;
