const tf = require("@tensorflow/tfjs-node");
require("dotenv").config();

const loadModel = async () => {
  return tf.loadLayersModel(process.env.MODEL_URL);
};

module.exports = {
  loadModel,
};
