const validator = require("validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const predictionResults = (req, res, next) => {
  const id = req.params;
  const { label, image } = req.body;

  try {
    const saveResult = prisma.predictions.create({
      data: {
        user_id: id,
        label: label,
        image: image,
      },
    });
    return res.status(201).json({
      massege: "Prediction results successfully saved.",
    });
  } catch (error) {
    return res.status(500).json({
      massege: "Prediction results failed to save.",
    });
  }

  return;
};

module.exports = {
  predictionResults,
};
