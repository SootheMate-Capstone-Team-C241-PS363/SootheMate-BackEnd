const { predict } = require('../services/inferenceServices')
const InputError = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { Result } = require('express-validator');
const {storeData, getPredictionByDate} = require('../services/storeData');
const { create } = require('domain');
const ResponseFormatter = require('../utils/responseFormatter');

/**
 * Handle HTTP request for predicting stress level.
 *
 * @async
 * @function predictHandler
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
async function predictHandler(req, res, next) {
    try {
        const inputData = req.body;
        const requiredFields = ['gender', 'age', 'sleep_duration', 'quality_of_sleep', 'physical_activity_level', 'min_working_hours', 'max_working_hours'];
        const optionalFields = [ 'blood_pressure', 'heart_rate', 'daily_steps','bmi_category'];
    
        for (const field of requiredFields) {
          if (inputData[field] === undefined) {
            throw new InputError(`Missing required field: ${field}`);
          }
        }
        const allOptionalFieldsProvided = optionalFields.every(field => inputData[field] !== undefined);
        const noOptionalFieldsProvided = optionalFields.every(field => inputData[field] === undefined);
    
        if (!allOptionalFieldsProvided && !noOptionalFieldsProvided) {
          throw new InputError(`All optional fields must be provided together: ${optionalFields.join(', ')}`);
        }
        
        const stressLevel = await predict(inputData);
        return ResponseFormatter.success(res, 'Prediction successful', { stress_level: stressLevel });
    } catch (error) {
        return ResponseFormatter.error(res, error.message);
    }
}

/**
 * Handle HTTP request for saving predicted stress level.
 *
 * @async
 * @function savePredictHandler
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>}
 */
async function savePredictHandler(req, res, next) {
    console.log('loading ... !!!')
    try {
        const {stress_level } = req.body;
        console.log(stress_level); // test 1
        const email = req.user.email;
        const today = new Date().toISOString().split('T')[0];
        const existingPrediction = await getPredictionByDate(email, today)
        console.log(existingPrediction); // test 2
        console.log(stress_level)
        if (existingPrediction){
            const existingId = existingPrediction.id;
            const updateData = {
                id : existingId,
                result : stress_level,
                created_at : existingPrediction.data().created_at,
                update_at : new Date().toISOString(),
                email,
            };
            console.log(existingId, " + ", updateData);
            await storeData(existingId, updateData);
            return ResponseFormatter.created(res, 'Prediction saved successfully', updateData);
        } else {
            const id = crypto.randomUUID();
            const created_at = new  Date().toISOString();
            console.log('pass tesss new predict !!')
            const data = {
                id,
                result : stress_level,
                created_at,
                update_at : created_at,
                email,
            };

            console.log('pass test', data)
            await storeData(id, data);
            console.log('success !!')
            return ResponseFormatter.created(res, 'Prediction saved successfully', data);
            
        }
    } catch (error) {
        console.log("masuk catch")
        return ResponseFormatter.error(res, error.message);
    }
}

module.exports = {predictHandler, savePredictHandler}