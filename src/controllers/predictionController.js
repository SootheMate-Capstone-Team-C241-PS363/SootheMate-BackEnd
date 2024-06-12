const { predict } = require('../services/inferenceServices')
const InputError = require('../exceptions/InputError');
// const { v4: uuidv4 } = require('uuid');
const moment = require('moment-timezone');
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
        let title, description;

        if (stressLevel <= 30) {
            title = "Excellent";
            description = "You are experiencing minimal stress and are managing any potential stressors effectively.";
        } else if (stressLevel <= 50) {
            title = "Good";
            description = "You are handling stress well and maintaining a balanced and healthy mindset.";
        } else {
            title = "Bad";
            description = "You are experiencing significant stress and may need to take steps to manage it.";
        }
        
        return ResponseFormatter.success(res, 'Prediction successful', {             
            stress_level: stressLevel,
            title: title,
            description: description});
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
    console.log('loading ... !!!');
    try {
        const inputData = req.body;
        const email = req.user.email;
        const today = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
        const existingPrediction = await getPredictionByDate(email, today);
        console.log(inputData,"Pass test 1 !!");
        const dataToSave = {
            ...inputData,
            email,
            // created_at: existingPrediction ? existingPrediction.data().created_at : today,
            update_at : today
        };
        console.log(dataToSave, "Pass Test 2 !!");
        if (existingPrediction) {
            dataToSave.created_at = existingPrediction.data().created_at;
            await storeData(existingPrediction.id, dataToSave);
        } else {
            dataToSave.created_at = today;
            dataToSave.id = crypto.randomUUID();
            await storeData(dataToSave.id, dataToSave);
        }
        console.log("Pass test 3")
        return ResponseFormatter.created(res, 'Prediction saved successfully', dataToSave);
    } catch (error) {
        console.log("Error:", error);
        return ResponseFormatter.error(res, error.message);
    }
}

module.exports = {predictHandler, savePredictHandler}