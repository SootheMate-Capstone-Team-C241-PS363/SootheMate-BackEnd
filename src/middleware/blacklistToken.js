const blacklistedTokens = new Set();

/**
 * Check if the token is blacklisted.
 *
 * @param {string} token - JWT token to check
 * @returns {boolean} - True if token is blacklisted, false otherwise
 */
function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

/**
 * Add a token to the blacklist.
 *
 * @param {string} token - JWT token to blacklist
 */
function addTokenToBlacklist(token) {
  blacklistedTokens.add(token);
}

module.exports = { isTokenBlacklisted, addTokenToBlacklist };

