const express = require('express')
const PageController = require('../../controller/admin/PageController')
const router = express.Router()

router.get('/banner/list', PageController.listPage)
router.get('/banner/add', PageController.addPage)
router.get('/banner/edit/:id', PageController.editPage)

module.exports = router