const express = require("express");
const router = express.Router();
const predictionControllers = require("../controller/predictions");
const validateUser = require("../middleware/users");

// Regist
router.post("/", validateUser.accessValidation, predictionControllers.predictions)
router.post("/calculate", validateUser.accessValidation, predictionControllers.calculateSeeds)

module.exports = router;
