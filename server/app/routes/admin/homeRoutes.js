const express = require('express')
const HomeController = require('../../controller/admin/HomeController')
const router = express.Router()

router.get('banner/list', HomeController.listPage)
router.get('banner/add', HomeController.addPage)

module.exports = router