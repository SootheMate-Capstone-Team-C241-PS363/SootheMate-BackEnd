const blacklistedTokens = new Set();

function addTokenToBlacklist(token) {
  blacklistedTokens.add(token);
}

function isTokenBlacklisted(token) {
  return Promise.resolve(blacklistedTokens.has(token));
}

module.exports = { addTokenToBlacklist, isTokenBlacklisted };
