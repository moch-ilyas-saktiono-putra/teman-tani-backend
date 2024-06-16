const tf = require("@tensorflow/tfjs-node");
const loadModel = require("../modules/loadModel");
const { spawn } = require("child_process");

const predict = async (image) => {
  const model = await loadModel.loadModel();
  const tensor = tf.node
    .decodeJpeg(image)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  const prediction = model.predict(tensor);
  const classes = ["Bacterialblight", "Blast", "Brownspot", "Tungro"];
  const classResult = tf.argMax(prediction, 1).dataSync()[0];
  const label = classes[classResult];
  return res.json({
    label,
  });
};

module.exports = {
  predict,
};
