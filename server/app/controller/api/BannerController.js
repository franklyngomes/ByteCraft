const httpCodes = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");

class BannerController {

  async AddNewBanner(req, res) {
    try {
      const { title, subtitle, image } = req.body;
      const bannerData = new BannerModel({
        title,
        subtitle,
        image,
      });
      if (req.file) {
        bannerData.image = req.file.path;
      }
      const data = await bannerData.save();
      if (data) {
        res.redirect("/banner/list");
      } else {
        res.redirect("/banner/add");
      }
    } catch (error) {
      console.log("Error Adding Banner", error);
      res.status(httpCodes.internalServerError);
    }
  }
  //show edit form
  async ShowEditForm(req, res) {
    try {
      const banner = await BannerModel.findById(req.params.id);
      res.render("/banner/edit", {
        title: "Edit Banner",
        banner,
      });
    } catch (error) {
      console.log("Error fetching edit form", error);
      res.status(httpCodes.internalServerError).send(error);
    }
  }
  //update banner
  async UpdateBanner(req, res) {
    try {
      const banner = await BannerModel.findByIdAndUpdate(req.body);
      res.redirect("/list");
    } catch (error) {
      console.log("Error Updating Banner", error);
      res.status(httpCodes.internalServerError).send(error);
    }
  }
}
module.exports = new BannerController();
