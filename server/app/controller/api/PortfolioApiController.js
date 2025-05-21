const httpCode = require('../../helper/httpServerCode')
const PortfolioModel = require('../../model/PortfolioModel')

class PortfolioApiController {
  async getAllPortfolio(req, res){
    try {
      const portfolio = await PortfolioModel.find({deleted: false})
      if(portfolio){
        res.status(httpCode.success).json({
          status: true,
          message: "Portfolios fetched successfully",
          data: portfolio
        })
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: true,
        message: error.message
      })
    }
  }
}
module.exports = new PortfolioApiController()