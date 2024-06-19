const express = require("express");
const router = express.Router();
const predictionControllers = require("../controller/predictions");
const validateUser = require("../middleware/users");
const multer = require('multer')
const upload = multer()

// Regist
router.post("/", predictionControllers.predictions)
router.post("/calculate", predictionControllers.calculateSeeds)
router.post("/save", upload.single('image'),predictionControllers.saveData)

module.exports = router;
