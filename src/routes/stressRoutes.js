const express = require('express');
const { body } = require('express-validator');
const validateRequest = require('../utils/validateRequest');
const authenticate = require('../middleware/authentication');
const { predictHandler, savePredictHandler} = require('../controllers/predictionController')
const router = express.Router();

/**
 * Predict Stress Level.
 *
 * @name POST /stress/predict
 * @function
 * @memberof module:routes/stressRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/predict', authenticate,  predictHandler);


/**
 * Save Stress Level.
 *
 * @name POST /stress/save
 * @function
 * @memberof module:routes/stressRoutes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.post('/save', authenticate,  savePredictHandler);

module.exports = router;
