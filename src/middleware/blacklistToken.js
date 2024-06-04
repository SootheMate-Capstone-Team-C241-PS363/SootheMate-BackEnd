// const blacklistedTokens = new Set();

// function addTokenToBlacklist(token) {
//   blacklistedTokens.add(token);
// }

// function isTokenBlacklisted(token) {
//   return Promise.resolve(blacklistedTokens.has(token));
// }

// module.exports = { addTokenToBlacklist, isTokenBlacklisted };

const blacklistedTokens = new Set();

function isTokenBlacklisted(token) {
  return blacklistedTokens.has(token);
}

function addTokenToBlacklist(token) {
  blacklistedTokens.add(token);
}

module.exports = { isTokenBlacklisted, addTokenToBlacklist };

