/**
 * JWT configuration module.
 *
 * Provides secret key and expiration time for JWT tokens.
 *
 * @module config/jwtConfig
 */
module.exports = {
    secret: process.env.JWT_SECRET,
    expiresIn: '30d',
  };
  