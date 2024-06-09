const { body } = require('express-validator');
const messages = require('../constants/responseMessages');

const passwordValidation = body('password')
  .isLength({ min: 8 })
  .withMessage(messages.PASSWORD_LENGTH);

const passwordConfirmationValidation = body('password_confirmation')
  .exists()
  .withMessage(messages.PASSWORD_CONFIRMATION_REQUIRED)
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error(messages.PASSWORD_CONFIRMATION_MISMATCH);
    }
    return true;
  });

/**
 * Validator for user registration.
 *
 * @type {Array}
 */
const registerValidator = [
  body('name').exists().withMessage(messages.NAME_REQUIRED),
  body('email').isEmail().withMessage(messages.INVALID_EMAIL),
  passwordValidation,
  passwordConfirmationValidation
];

/**
 * Validator for user login.
 *
 * @type {Array}
 */
const loginValidator = [
  body('email').isEmail().withMessage(messages.INVALID_EMAIL),
  body('password').exists().withMessage(messages.PASSWORD_REQUIRED)
];

/**
 * Validator for updating user password.
 *
 * @type {Array}
 */
const updatePasswordValidator = [
  body('old_password').exists().withMessage(messages.PASSWORD_REQUIRED),
  passwordValidation,
  passwordConfirmationValidation
];

module.exports = { registerValidator, loginValidator, updatePasswordValidator };
