const express = require('express');
const { body } = require('express-validator');
const { getUserDetailHandler, updateAvatarHandler, updateProfileHandler } = require('../controllers/userController');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const avatar = require('../middleware/avatar');
const router = express.Router();

router.get('/detail', authenticate, getUserDetailHandler);

router.post('/avatar', authenticate, avatar.single('avatar'), updateAvatarHandler);

router.put('/update', authenticate, [
  body('name').notEmpty().withMessage('Name is required'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('birth_date').isDate().withMessage('Birth date must be a valid date')
], validateRequest, updateProfileHandler);


module.exports = router;
