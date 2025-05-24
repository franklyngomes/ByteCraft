const BannerModel = require("../../model/BannerModel")
const PortfolioModel = require("../../model/PortfolioModel")

class AdminController{
  async dashboardPage(req, res){
    try {
      const banners = await BannerModel.find()
      const portfolio = await PortfolioModel.find()
      await res.render('dashboard', {
        title: "Dashboard",
        banners: banners.length,
        portfolio: portfolio.length
      })
    } catch (error) {
      console.log(error)
    }
  }
  async loginPage(req, res){
    try {
      await res.render('signin', {
        title: "Signin"
      })
    } catch (error) {
      
    }
  }
}
module.exports = new AdminController()