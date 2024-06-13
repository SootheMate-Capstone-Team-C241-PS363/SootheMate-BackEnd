/**
 * Preprocess input data for the mandatory model.
 *
 * @function preprocessMandatoryData
 * @param {Object} inputData - The input data to preprocess.
 * @returns {number[]} The preprocessed data.
 */
function preprocessMandatoryData(inputData) {
    const genderEncoded = inputData.gender.toLowerCase() === 'male' ? 0 : 1;
  
    const rawData = [
      inputData.age,
      inputData.sleep_duration,
      inputData.quality_of_sleep,
      inputData.physical_activity_level,    
      inputData.min_working_hours, 
      inputData.max_working_hours, 
      genderEncoded,
    ];
  
    console.log("Raw Data:", rawData);
    return rawData;
  }

/**
 * Preprocess input data for the all data model.
 *
 * @function preprocessAllData
 * @param {Object} inputData - The input data to preprocess.
 * @returns {number[]} The preprocessed data.
 */
function preprocessAllData(inputData) {
    const genderEncoded = inputData.gender.toLowerCase() === 'male' ? 0 : 1;
    // Parse blood pressure
    const [systolicPressure, diastolicPressure] = inputData.blood_pressure.split('/').map(Number);
  
    // Encode BMI categories
    const bmiCategoryNormalWeight = inputData.bmi_category.toLowerCase() === 'normal' ? 1 : 0;
    const bmiCategoryObese = inputData.bmi_category.toLowerCase() === 'obese' ? 1 : 0;
    const bmiCategoryOverweight = inputData.bmi_category.toLowerCase() === 'overweight' ? 1 : 0;
  
    const rawData = [
      inputData.age,
      inputData.sleep_duration,
      inputData.quality_of_sleep,
      inputData.physical_activity_level,    
      inputData.heart_rate,
      inputData.daily_steps,
      inputData.min_working_hours, 
      inputData.max_working_hours, 
      systolicPressure,
      diastolicPressure,
      genderEncoded,
      bmiCategoryNormalWeight,
      bmiCategoryObese,
      bmiCategoryOverweight,
    ];
    console.log(rawData)
    return rawData;
  }
  
  module.exports = { preprocessMandatoryData, preprocessAllData };