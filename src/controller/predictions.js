const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
require("dotenv").config();
const modelPrediction = require("../modules/model");

const predictions = async (req, res) => {
  const image = req.file;
  if (!image) {
    return res.status(400).json({
      status: false,
      message: "Invalid input",
    });
  }
  try {
    const predictedLabel = await modelPrediction.predict(image.buffer);
    res.json({
      predictedLabel,
    });
  } catch (error) {
    console.log("Error during prediction:", error);
    res.status(500).json({ message: "An error occurred during prediction" });
  }
};

const calculateSeeds = async (req, res) => {
  const { area } = req.body;

  if (!area) {
    return res.status(400).json({
      message: "Please enter the area size",
    });
  }

  try {
    if (isNaN(area)) {
      return res.status(400).json({
        message: "Area must be a number",
      });
    }

    const result = area * 10; 
    return res.status(200).json({
      message: "Seed calculation successful",
      data: {
        result: result,
        units:
          "Seeds needed for 10 square meters (assuming your area is in square meters)", 
      },
    });
  } catch (error) {
    console.error("Error during calculation:", error);
    res
      .status(500)
      .json({ message: "An error occurred during seed calculation" });
  }
};

module.exports = {
  calculateSeeds,
  predictions,
};
