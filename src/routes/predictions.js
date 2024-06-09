const express = require("express");
const router = express.Router();
const predictionControllers = require("../controller/predictions");
const validateUser = require("../middleware/users");

// Regist
router.post("/save/:id", validateUser.accessValidation, predictionControllers.predictionResults);

module.exports = router;
