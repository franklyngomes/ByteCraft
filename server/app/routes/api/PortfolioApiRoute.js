const express = require('express')
const PortfolioApiController = require('../../controller/api/PortfolioApiController')
const router = express.Router()

router.get('/portfolios', PortfolioApiController.getAllPortfolio)
module.exports = router