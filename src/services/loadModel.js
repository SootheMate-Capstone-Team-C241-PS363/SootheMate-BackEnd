const tf = require('@tensorflow/tfjs-node');

/**
 * Load machine learning model from the specified URL.
 *
 * @async
 * @function loadModel
 * @param {string} modelType - The type of the model to load ('mandatory' or 'allData').
 * @returns {Promise<tf.GraphModel>} The loaded machine learning model.
 * @throws {Error} If an invalid model type is provided or if the model fails to load.
 */
async function loadModel(modelType) {
  let modelUrl;
  if (modelType === 'mandatory') {
    modelUrl = process.env.MODEL_URL_MANDATORY;
  } else if (modelType === 'allData') {
    modelUrl = process.env.MODEL_URL_ALL_DATA;
  } else {
    throw new Error('Invalid model type');
  }

  console.log(`Loading model from ${modelUrl}`);
  try {
    const model = await tf.loadGraphModel(modelUrl);
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error(`Failed to load model from ${modelUrl}:`, error);
    throw error;
  }
}

module.exports = loadModel;
