const express = require('express')
const PublicController = require('../../controller/admin/PublicController')
const router = express.Router()

router.get('/', PublicController.loginPage)
router.get('/signup', PublicController.SignUpPage)
router.get('/forgot-password', PublicController.ForgotPasswordPage)

module.exports = router