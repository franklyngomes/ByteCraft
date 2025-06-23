const BannerModel = require("../../model/BannerModel")
const PortfolioModel = require("../../model/PortfolioModel")

class PublicController{
  async dashboardPage(req, res){
    try {
      const banners = await BannerModel.find()
      const portfolio = await PortfolioModel.find()
      return res.render('dashboard', {
        title: "Dashboard",
        banners: banners.length,
        portfolio: portfolio.length,
        username: req.user.name
      })
    } catch (error) {
      console.log(error)
    }
  }
  async loginPage(req, res){
    try {
      const message = req.flash('message')
      return res.render('signin', {
        title: "Sign in - ByteCraft",
        messages: req.flash()
      })
    } catch (error) {
      
    }
  }
  async SignUpPage(req, res) {
    try {
      return res.render('signup', {
        title: "Sign up - ByteCraft",
        messages: req.flash()
      })
    } catch (error) {
      console.log(error)
    }
  }
  async ForgotPasswordPage(req, res){
    try {
      return res.render('forgot-password', {
        title: "Forgot Password"
      })
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new PublicController()