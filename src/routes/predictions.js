const express = require("express");
const router = express.Router();
const predictionControllers = require("../controller/predictions");
const validateUser = require("../middleware/users");
const multer = require('multer')
const upload = multer()

// Regist
router.post("/calculate", predictionControllers.calculateSeeds)
router.post("/save/:id", upload.single('image'),predictionControllers.saveData)
router.get("/history/:id",predictionControllers.getHistory)
router.get("/detail/:id",predictionControllers.detailHistory)

module.exports = router;
