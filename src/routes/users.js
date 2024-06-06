const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
// const {validateUser} = require("../middleware/users");

// Regist
router.post("/", userController.createNewUser);
// router.post("/", validateUser, userController.createNewUser);

module.exports = router;
