const express = require('express');
const { body } = require('express-validator');
const { registerHandler, loginHandler, logoutHandler, updatePasswordHandler } = require('../controllers/authController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const router = express.Router();

router.post('/register', [
  body('name').exists().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
], validateRequest, registerHandler);

router.post('/login', [
  body('email').isEmail().withMessage('Email is invalid'),
  body('password').exists().withMessage('Password is required')
], validateRequest, loginHandler);

router.post('/logout', authenticate, logoutHandler);

router.put('/update-password', authenticate, [
  body('old_password').exists().withMessage('Old password is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('password_confirmation').exists().withMessage('Password confirmation is required').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
], validateRequest, updatePasswordHandler);

module.exports = router;
