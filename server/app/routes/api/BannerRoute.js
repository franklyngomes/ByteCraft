const express = require("express");
const BannerController = require("../../controller/api/BannerController");
const imageUpload = require('../../helper/ImageUpload')
const router = express.Router();

router.post("/banner/add",imageUpload.single('image'), BannerController.AddNewBanner);
router.get("/banner/edit/:id", BannerController.EditBanner);
router.post("/banner/edit/:id",imageUpload.single('image'), BannerController.UpdateBanner);
router.post('/banner/delete/:id', BannerController.DeleteBanner)

module.exports = router;
