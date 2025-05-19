const httpCode = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");

class PageController {
  async listPage(req, res) {
    try {
      const items = await BannerModel.find({ deleted: false });
      res.render("banner/list", {
        title: "List",
        data: items,
      });
    } catch (error) {
      res.redirect("/banner/list", { message: error.message });
    }
  }
  async addPage(req, res) {
    try {
      res.render("banner/add", {
        title: "Add Banner",
      });
    } catch (error) {
      res.redirect("/banner/add", {
        message: error.message,
      });
    }
  }
  async editPage(req, res){
    try {
      const banner = await BannerModel.findById(req.params.id)
      console.log(banner)
      res.render("banner/edit", {
        title: "Edit Page",
        data: banner
      })
    } catch (error) {
      res.redirect("/banner/list",{
        message: error.message
      })
    }
  }
}
module.exports = new PageController()
