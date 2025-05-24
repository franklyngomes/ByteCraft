const express = require("express");
const BannerApiController = require("../../controller/api/BannerApiController");

const router = express.Router();

router.get("/banners", BannerApiController.getallBanner);
module.exports = router;
