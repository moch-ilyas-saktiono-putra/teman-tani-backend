const express = require("express");
const router = express.Router();
const weatherController = require("../controller/weathers.js");

// Geolocation

// Weather

router.get("/", weatherController.getAllWeathers);

router.post("/", weatherController.createWeather);

module.exports = router;