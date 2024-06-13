const InputError = require('../exceptions/InputError');

const REQUIRED_FIELDS = ['gender', 'age', 'sleep_duration', 'quality_of_sleep', 'physical_activity_level', 'min_working_hours', 'max_working_hours'];
const OPTIONAL_FIELDS = ['blood_pressure', 'heart_rate', 'daily_steps', 'bmi_category'];

/**
 * Validate input data for required and optional fields.
 *
 * @param {Object} inputData - The input data to validate.
 * @throws {InputError} Throws an error if validation fails.
 */
const validateInputPredict = (inputData) => {
    for (const field of REQUIRED_FIELDS) {
        if (inputData[field] === undefined) {
            throw new InputError(`Missing required field: ${field}`);
        }
    }
    const allOptionalFieldsProvided = OPTIONAL_FIELDS.every(field => inputData[field] !== undefined);
    const noOptionalFieldsProvided = OPTIONAL_FIELDS.every(field => inputData[field] === undefined);
    if (!allOptionalFieldsProvided && !noOptionalFieldsProvided) {
        throw new InputError(`All optional fields must be provided together: ${OPTIONAL_FIELDS.join(', ')}`);
    }
};

module.exports = { validateInputPredict };
