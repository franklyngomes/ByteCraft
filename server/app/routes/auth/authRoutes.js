const express = require("express");
const router = express.Router();
const AuthController = require("../../controller/auth/AuthController");
const UserImageUpload = require("../../helper/UserImageUpload");
const multer = require('multer')
const upload = multer()
router.post("/signup", UserImageUpload.single("image"), AuthController.signup);
router.post("/signin",upload.none(), AuthController.signin);

module.exports = router;
