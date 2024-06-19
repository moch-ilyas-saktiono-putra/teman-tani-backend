const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const axios = require("axios");
require("dotenv").config();
const modelPrediction = require("../modules/model");
const uploadToGcs = require("../modules/images");

// Predicitons
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

// Save= Data
const saveData = async (req, res) => {
  const image = req.file;
  const label = req.body.prediction;
  console.log(label);
  const userId = req.params.id;
  const user_id = parseInt(userId);

  if (!image) {
    return res.status(400).json({
      status: false,
      message: "Invalid input: No image uploaded",
    });
  }

  if (!user_id) {
    return res.status(400).json({
      status: false,
      message: "Invalid input: No user id",
    });
  }

  if (!label) {
    return res.status(400).json({
      status: false,
      message: "Invalid input: No label",
    });
  }

  const userData = await prisma.users.findUnique({
    where: {
      id: user_id,
    },
    select: {
      id: true,
    },
  });

  try {
    const publicUrl = await uploadToGcs.uploadToGcs(image);

    const sendData = await prisma.predictions.create({
      data: {
        user_id: userData.id,
        image: publicUrl,
        label: label,
      },
    });

    return res.status(201).json({
      message: "Prediction successfully saved",
      sendData,
    });
  } catch (error) {
    console.error("Error during uploading:", error);
    res.status(500).json({ message: "An error occurred during uploading" });
  }
};

const getHistory = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const historyData = await prisma.predictions.findMany({
      where: {
        user_id: userId,
      },
    });

    return res.status(201).json({
      message: "Successfully retreived data",
      historyData,
    });
  } catch (error) {
    console.error("Error during uploading:", error);
    res
      .status(500)
      .json({ message: "An error occurred during retreived data" });
  }
};

// Calculation Seed
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

    const result = (area * 10) / 1000;
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
  saveData,
  getHistory,
};
