const express = require("express");
const router = express.Router();
const predictionControllers = require("../controller/predictions");
const validateUser = require("../middleware/users");
const multer = require('multer')
const upload = multer()

// Regist
router.post("/", validateUser.accessValidation, predictionControllers.predictions)
router.post("/calculate", validateUser.accessValidation, predictionControllers.calculateSeeds)
router.post("/save", upload.single('image'),predictionControllers.saveData)

module.exports = router;
