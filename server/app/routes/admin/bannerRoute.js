const express = require('express')
const BannerController = require('../../controller/admin/BannerController')
const BannerImageUpload = require('../../helper/BannerImageUpload')
const router = express.Router()

router.get('/banner/list', BannerController.listPage)
router.get('/banner/add', BannerController.addPage)
router.post('/banner/create',BannerImageUpload.single('image'), BannerController.createPage)
router.get('/banner/edit/:id', BannerController.editPage)
router.post('/banner/update/:id',BannerImageUpload.single('image'), BannerController.updateBanner)
router.get('/banner/delete/:id',BannerImageUpload.single('image'),BannerController.deleteBanner)

module.exports = router