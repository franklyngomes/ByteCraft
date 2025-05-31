const BannerModel = require("../../model/BannerModel")
const PortfolioModel = require("../../model/PortfolioModel")

class PublicController{
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
        title: "Sign in - ByteCraft"
      })
    } catch (error) {
      
    }
  }
  async SignUpPage(req, res) {
    try {
      res.render('signup', {
        title: "Sign up - ByteCraft"
      })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new PublicController()