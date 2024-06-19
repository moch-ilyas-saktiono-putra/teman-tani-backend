const express = require("express");
const router = express.Router();
const userController = require("../controller/users");
const validateUser = require("../middleware/users");
const multer = require('multer')
const upload = multer()

// Regist
router.post("/regist", upload.single('none'), userController.createNewUser);
router.post("/login", upload.single('none'), userController.userLogin);
router.get('/profile/:id', userController.userProfile)

module.exports = router;
