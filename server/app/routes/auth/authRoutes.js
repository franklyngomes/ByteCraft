const express = require('express')
const router = express.Router()
const AuthController = require('../../controller/auth/AuthController')

router.post('/signup',AuthController.signup)
router.post('/signin', AuthController.signin)

module.exports = router