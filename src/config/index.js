/**
 * Configuration Module
 *
 * @module config
 */
const jwtConfig = require('./jwtConfig');
const storageConfig = require('./storageConfig');

/**
 * Export configuration objects
 *
 * @type {Object}
 * @property {Object} jwtConfig - JSON Web Token configuration
 * @property {Object} storageConfig - Storage configuration
 */
module.exports = {
  jwtConfig,
  storageConfig,
};
