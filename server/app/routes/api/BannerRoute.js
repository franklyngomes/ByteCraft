const express = require("express");
const BannerController = require("../../controller/api/BannerController");
const imageUpload = require('../../helper/ImageUpload')
const router = express.Router();

router.post("/banner/add",imageUpload.single('image'), BannerController.AddNewBanner);

// Edit form page
router.get("/banner/:id/edit", BannerController.ShowEditForm);
// Update student api
router.put("/banner/:id", BannerController.UpdateBanner);

module.exports = router;
