/**
 * Custom error class for client-side errors.
 *
 * @class
 * @extends Error
 */
class ClientError extends Error {
   /**
   * Create a client error.
   * @param {string} message - Error message
   * @param {number} [statusCode=400] - HTTP status code (default is 400)
   */
    constructor(message, statusCode = 400) {
      super(message);
      this.statusCode = statusCode;
      this.name = 'ClientError';
    }
  }
  
  module.exports = ClientError;
  