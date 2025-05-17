class AdminController{
  async dashboardPage(req, res){
    try {
      await res.render('dashboard', {
        title: "Dashboard"
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