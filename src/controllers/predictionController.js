// todo : make function to predict stress
// const { predict } = require('../services/inferenceServices');
const { predict } = require('../services/inferenceServices')
const InputError = require('../exceptions/InputError');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { Result } = require('express-validator');
const {storeData} = require('../services/storeData');

async function predictHandler(req, res, next) {
    try {
        const inputData = req.body;
        console.log("test : "+inputData)
        // Validasi data input
        const requiredFields = ['gender', 'age', 'sleep_duration', 'quality_of_sleep', 'physical_activity_level', 'min_working_hours', 'max_working_hours'];
        const optionalFields = [ 'blood_pressure', 'heart_rate', 'daily_steps','bmi_category'];
    
        for (const field of requiredFields) {
          if (inputData[field] === undefined) {
            throw new InputError(`Missing required field: ${field}`);
          }
        }
        console.log("test2")
        // Periksa apakah semua field opsional ada jika salah satu dari mereka ada
        const allOptionalFieldsProvided = optionalFields.every(field => inputData[field] !== undefined);
        const noOptionalFieldsProvided = optionalFields.every(field => inputData[field] === undefined);
    
        if (!allOptionalFieldsProvided && !noOptionalFieldsProvided) {
          throw new InputError(`All optional fields must be provided together: ${optionalFields.join(', ')}`);
        }
        
        console.log("test3")
        const stressLevel = await predict(inputData);
        console.log("test 4 ")
        console.log(stressLevel)
        // res.json({ stressLevel });
        res.status(200).json({
            status : 'success',
            message : 'prediction successfully',
            data  : {
                stress_level : stressLevel
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function savePredictHandler(req, res, next) {
    try {
        const {stress_level } = req.body;
        const id = crypto.randomUUID();
        const created_at = new Date().toISOString();
        const email = req.user.email;

        const data = {
            id,
            result : stress_level,
            created_at,
            email
        }
        console.log(data)
        
        await storeData(id, data);

        console.log("Pass Test !!")
        res.status(201).json({
            status : 'success',
            message : 'prediction saved successfully',
            data
        })
    } catch (error) {
        res.status(500).json({
            status : 'fail',
            message : error.message,
            data : {}
        })
    }
}

module.exports = {predictHandler, savePredictHandler}