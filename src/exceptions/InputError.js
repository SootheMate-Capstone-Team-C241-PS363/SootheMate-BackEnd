const ClientError = require('./ClientError');

/**
 * Custom error class for input validation errors.
 *
 * @class
 * @extends ClientError
 */
class InputError extends ClientError {
  /**
   * Create an input error.
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
    this.name = 'InputError';
  }
}

// module.exports = InputError;
// class InputError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'InputError';
//     this.status = 400;
//   }
// }

module.exports = InputError;

