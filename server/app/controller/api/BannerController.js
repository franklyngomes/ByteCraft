const httpCodes = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");
const path = require("path");

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
  async EditBanner(req, res) {
    try {
      const banner = await BannerModel.findById(req.params.id);
      res.render("/banner/edit", {
        title: "Edit Banner",
        banner,
      });
      console.log(banner);
    } catch (error) {
      console.log("Error fetching edit form", error);
      res.status(httpCodes.internalServerError).send(error);
    }
  }
  // update banner
  async UpdateBanner(req, res) {
    try {
      const id = await req.params.id;
      const updateData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
      };
      if (req.file) {
        updateData.image = req.file.path;
      }
      const newBanner = await BannerModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!newBanner) {
        return res.status(httpCodes.badRequest, {
          status: false,
          message: "Banner not found",
        });
      }
      res.redirect("/banner/list");
    } catch (error) {
      console.log("Error Adding Banner:", error);
      res.status(httpCodes.internalServerError);
    }
  }
  async DeleteBanner(req, res) {
    try {
      const banner = await BannerModel.findByIdAndDelete(req.params.id);
      if (banner) {
        res.status(httpCodes.success);
        console.log("Banner Deleted Successfully");
        res.redirect("/banner/list");
      } else {
        res.status(httpCodes.badRequest);
        console.log("Banner not found!");
      }
    } catch (error) {
      console.log("Error deleting banner: ", error);
      res.status(httpCodes.internalServerError);
    }
  }
}
module.exports = new BannerController();
