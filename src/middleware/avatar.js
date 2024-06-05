/**
 * Middleware to handle avatar uploads using multer.
 *
 * @module middleware/avatar
 */

const multer = require('multer');

const storage = multer.memoryStorage();
const avatar = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  }
});

module.exports = avatar;
