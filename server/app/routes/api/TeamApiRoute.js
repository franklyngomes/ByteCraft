const express = require('express')
const router = express.Router()
const TeamApiController = require('../../controller/api/TeamApiController')

router.get('/teams', TeamApiController.GetAllTeamMembers)

module.exports = router