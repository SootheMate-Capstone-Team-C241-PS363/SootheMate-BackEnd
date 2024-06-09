const { body } = require('express-validator');
const messages = require('../constants/responseMessages');

/**
 * Validator for updating user profile.
 *
 * @type {Array}
 */
const updateUserValidator = [
  body('name').notEmpty().withMessage(messages.NAME_REQUIRED),
  body('gender').notEmpty().withMessage(messages.GENDER_REQUIRED),
  body('birth_date').isDate().withMessage(messages.BIRTH_DATE_INVALID)
];

module.exports = { updateUserValidator };
