const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
// const {validateUser} = require("../middleware/users");

// Regist
router.post("/regist", userController.createNewUser);
router.post("/login", userController.userLogin);

module.exports = router;
