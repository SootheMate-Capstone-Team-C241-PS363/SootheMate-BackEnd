function preprocessMandatoryData(inputData) {
    const genderEncoded = inputData.gender.toLowerCase() === 'male' ? 0 : 1;
  
    // Ubah properti sesuai dengan yang ada dalam body request
    const rawData = [
      genderEncoded,
      inputData.age,
      inputData.sleep_duration,
      inputData.quality_of_sleep,
      inputData.physical_activity_level,
      inputData.min_working_hours, // Ubah menjadi min_working_hours
      inputData.max_working_hours, // Ubah menjadi max_working_hours
    ];
  
    console.log("Raw Data:", rawData);
    return rawData;
  }


function preprocessAllData(inputData) {
    const genderEncoded = inputData.gender.toLowerCase() === 'male' ? 0 : 1;
    // Parse blood pressure
    const [systolicPressure, diastolicPressure] = inputData.blood_pressure.split('/').map(Number);
  
    // Encode BMI categories
    const bmiCategoryNormalWeight = inputData.bmi_category.toLowerCase() === 'normal' ? 1 : 0;
    const bmiCategoryObese = inputData.bmi_category.toLowerCase() === 'obese' ? 1 : 0;
    const bmiCategoryOverweight = inputData.bmi_category.toLowerCase() === 'overweight' ? 1 : 0;
  
    const rawData = [
      genderEncoded,
      inputData.age,
      inputData.sleep_duration,
      inputData.quality_of_sleep,
      inputData.physical_activity_level,
      inputData.heart_rate,
      inputData.min_working_hours,
      inputData.max_working_hours,
      inputData.daily_steps,
      systolicPressure,
      diastolicPressure,
      bmiCategoryNormalWeight,
      bmiCategoryObese,
      bmiCategoryOverweight,
    ];
  
    return rawData;
  }
  
  module.exports = { preprocessMandatoryData, preprocessAllData };