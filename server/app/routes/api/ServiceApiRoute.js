const express = require('express')
const router = express.Router()
const ServiceApiController = require('../../controller/api/ServiceApiController')

router.get('/services', ServiceApiController.GetAllService)
module.exports = router