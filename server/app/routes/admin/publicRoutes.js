const express = require('express')
const PublicController = require('../../controller/admin/PublicController')
const router = express.Router()

router.get('/', PublicController.loginPage)
router.get('/signup', PublicController.SignUpPage)

module.exports = router