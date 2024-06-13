const tf = require('@tensorflow/tfjs-node');
const loadModel = require('./loadModel');
const { preprocessMandatoryData, preprocessAllData } = require('../utils/preprocess');
let model1;
let model2;

/**
 * Load machine learning models required for prediction.
 *
 * @async
 * @function loadModels
 */
async function loadModels() {
  if (!model1) {
    console.log("Loading mandatory model...");
    model1 = await loadModel('mandatory');
    console.log("Mandatory model loaded");
  }
  if (!model2) {
    console.log("Loading all data model...");
    model2 = await loadModel('allData');
    console.log("All data model loaded");
  }
}

/**
 * Predict stress level based on input data.
 *
 * @async
 * @function predict
 * @param {Object} inputData - The input data for prediction.
 * @returns {Promise<number>} The predicted stress level.
 * @throws {Error} If there is an error during prediction.
 */
async function predict(inputData) {
  await loadModels();

  let preprocessedData;
  let modelToUse;

  if (inputData.blood_pressure && inputData.heart_rate && inputData.daily_steps) {
    console.log("Using full data model");
    preprocessedData = preprocessAllData(inputData);
    modelToUse = model2;
  } else {
    console.log("Using mandatory data model");
    preprocessedData = preprocessMandatoryData(inputData);
    modelToUse = model1;
  }

  console.log("Preprocessed Data:", preprocessedData);

  try {
    const inputTensor = tf.tensor([preprocessedData]);
    console.log("Input tensor created:", inputTensor);

    const prediction = modelToUse.predict(inputTensor);
    const stressLevel = prediction.dataSync()[0];
    const predictedStressLevel = tf.argMax(prediction, axis=1).dataSync()[0]; 

    console.log("\nHasil Prediksi stress level dalam probability:", prediction.arraySync());
    console.log("\nHasil Prediksi stress:", predictedStressLevel);
    console.log("Raw Model Output:", stressLevel);

    const stressPercentage = (predictedStressLevel / 10) * 100;

    return stressPercentage;
  } catch (error) {
    console.error("Error during prediction:", error);
    throw error;
  }
}

module.exports = { predict };
