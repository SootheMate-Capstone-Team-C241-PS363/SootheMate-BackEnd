const { predict } = require('../services/inferenceServices');
const InputError = require('../exceptions/InputError');
const moment = require('moment-timezone');
const crypto = require('crypto');
const { storeData, getPredictionByDate } = require('../services/storeData');
const ResponseFormatter = require('../utils/responseFormatter');
const { validateInputPredict } = require('../utils/validatePredict');
const { determineStressLevelDescription } = require('../utils/predictDescriptions')

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const TIMEZONE = 'Asia/Jakarta';

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
        validateInputPredict(inputData);
        
        const stressLevel = await predict(inputData);
        const { title, description } = determineStressLevelDescription(stressLevel);
        
        return ResponseFormatter.success(res, 'Prediction successful', {             
            stress_level: stressLevel,
            title,
            description
        });
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
        const today = moment().tz(TIMEZONE).format(DATE_FORMAT);
        const existingPrediction = await getPredictionByDate(email, today);

        const dataToSave = {
            ...inputData,
            email,
            update_at: today,
            created_at: existingPrediction ? existingPrediction.data().created_at : today
        };

        if (existingPrediction) {
            await storeData(existingPrediction.id, dataToSave);
        } else {
            dataToSave.id = crypto.randomUUID();
            await storeData(dataToSave.id, dataToSave);
        }

        console.log("Pass test 3");
        return ResponseFormatter.created(res, 'Prediction saved successfully', dataToSave);
    } catch (error) {
        console.log("Error:", error);
        return ResponseFormatter.error(res, error.message);
    }
}

module.exports = { predictHandler, savePredictHandler };
