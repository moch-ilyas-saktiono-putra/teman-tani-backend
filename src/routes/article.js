const express = require("express");
const router = express.Router();
const articleControllers = require("../controller/article");
const validateUser = require("../middleware/users");
const multer = require('multer')
const upload = multer()

// Regist
router.post("/create", upload.single("image"),articleControllers.createArticle)
router.get("/get", articleControllers.getArticles)
router.get("/detail/:id", articleControllers.detailArticle)

module.exports = router;
