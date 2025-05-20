const express = require("express");
const BannerController = require("../../controller/api/BannerController");

const router = express.Router();

router.get("/banner/all",BannerController.getallBanner);


module.exports = router;
