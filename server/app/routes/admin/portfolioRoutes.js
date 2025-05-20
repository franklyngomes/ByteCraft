const express = require('express')
const PortfolioController = require('../../controller/admin/PortfolioController')
const router = express.Router()
const PortfolioImageUpload = require('../../helper/PortfolioImageUpload')

router.get('/portfolio/list', PortfolioController.getAllPortfolio)
router.get('/portfolio/add', PortfolioController.AddPortfolioPage)
router.post('/portfolio/create',PortfolioImageUpload.single('image'), PortfolioController.CreatePortfolio)
router.get('/portfolio/edit/:id', PortfolioController.EditPortfolio)
router.post('/portfolio/update/:id',PortfolioImageUpload.single('image'), PortfolioController.UpdatePortfolio)
router.post('/portfolio/delete/:id',PortfolioImageUpload.single('image'), PortfolioController.DeletePortfolio)
module.exports = router