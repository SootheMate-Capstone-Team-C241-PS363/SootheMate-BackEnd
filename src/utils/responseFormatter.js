/**
 * Utility class for formatting HTTP responses.
 *
 * This class provides methods to send standardized JSON responses for
 * different types of outcomes, such as success, creation, failure, and errors.
 */
class ResponseFormatter {
  /**
   * Sends a 200 OK response with a success status.
   *
   * @param {Object} res - The Express response object.
   * @param {string} message - The success message.
   * @param {Object} [data={}] - The data to include in the response.
   * @returns {Object} The response object.
   */
  static success(res, message, data = {}) {
    return res.status(200).json({
      status: 'success',
      message,
      data,
    });
  }

  /**
   * Sends a 201 Created response with a success status.
   *
   * @param {Object} res - The Express response object.
   * @param {string} message - The success message.
   * @param {Object} [data={}] - The data to include in the response.
   * @returns {Object} The response object.
   */
  static created(res, message, data = {}) {
    return res.status(201).json({
      status: 'success',
      message,
      data,
    });
  }

  /**
   * Sends a response with a fail status and a custom status code.
   *
   * @param {Object} res - The Express response object.
   * @param {string} message - The failure message.
   * @param {number} [statusCode=400] - The HTTP status code to use.
   * @param {Object} [data={}] - The data to include in the response.
   * @returns {Object} The response object.
   */
  static fail(res, message, statusCode = 400, data = {}) {
    return res.status(statusCode).json({
      status: 'fail',
      message,
      data,
    });
  }

  /**
   * Sends a response with an error status and a custom status code.
   *
   * @param {Object} res - The Express response object.
   * @param {string} message - The error message.
   * @param {number} [statusCode=500] - The HTTP status code to use.
   * @returns {Object} The response object.
   */
  static error(res, message, statusCode = 500) {
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  }
}

module.exports = ResponseFormatter;
