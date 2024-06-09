const tf = require('@tensorflow/tfjs-node');

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
