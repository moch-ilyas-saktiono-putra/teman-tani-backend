const express = require("express");
const router = express.Router();
const weatherController = require('../controller/weather')
const validateUser = require("../middleware/users");

// Router
router.get("/", weatherController.getLocation);

module.exports = router;