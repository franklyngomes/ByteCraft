const express = require('express')
const AdminController = require('../../controller/admin/AdminController')
const router = express.Router()

router.get('/', AdminController.loginPage)
router.get('/dashboard', AdminController.dashboardPage)

module.exports = router