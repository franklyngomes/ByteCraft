const express = require('express')
const BannerController = require('../../controller/admin/BannerController')
const imageUpload = require('../../helper/ImageUpload')
const router = express.Router()

router.get('/banner/list', BannerController.listPage)
router.get('/banner/add', BannerController.addPage)
router.post('/banner/create',imageUpload.single('image'), BannerController.createPage)
router.get('/banner/edit/:id', BannerController.editPage)

module.exports = router