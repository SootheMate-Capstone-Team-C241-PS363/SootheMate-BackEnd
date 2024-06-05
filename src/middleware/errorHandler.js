/**
 * Error handler to handle errors occurring in the application.
 *
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
      status: 'error',
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
      data: {}
    });
  }
  
  module.exports = errorHandler;
  