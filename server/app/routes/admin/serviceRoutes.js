const express = require('express')
const router = express.Router()
const ServiceController = require('../../controller/admin/ServiceController')
const ServiceImageUpload = require('../../helper/ServiceImageUpload')

router.get("/service/list", ServiceController.serviceListPage)
router.get("/service/add", ServiceController.AddServicePage)
router.post("/service/create", ServiceImageUpload.single('image'), ServiceController.AddService)
router.get('/service/edit/:id', ServiceController.EditServicePage)
router.post('/service/update/:id',ServiceImageUpload.single('image'), ServiceController.UpdateData)
router.post('/service/delete/:id', ServiceImageUpload.single('image'), ServiceController.DeleteService)

module.exports = router