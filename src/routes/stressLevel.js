const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const { predictHandler, savePredictHandler} = require('../controllers/predictionController')
const router = express.Router();

// router.post('/predict', authenticate,  predictHandler);
router.post('/predict', authenticate,  predictHandler);


router.post('/save', authenticate,  savePredictHandler);

module.exports = router;
