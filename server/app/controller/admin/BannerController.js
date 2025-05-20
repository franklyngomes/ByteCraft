const httpCode = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");
const path=require('path')
const fs=require('fs')

class BannerController {
  //get banner
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

  //add banner
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

  async createPage(req, res) {
    try {
      const { title, subtitle, } = req.body;
      const bannerData = new BannerModel({
        title,
        subtitle,
      });
      if (req.file) {
        bannerData.image = req.file.path;
      }
      const data = await bannerData.save();
      if (data) {
        res.redirect("/banner/list");
      }
    } catch (error) {
      console.log(error)
    }
  }
  //get single data
  async editPage(req, res) {
    try {
      const banner = await BannerModel.findById(req.params.id);
      console.log(banner);
      res.render("banner/edit", {
        title: "Edit Page",
        data: banner,
      });
    } catch (error) {
      res.redirect("/banner/list", {
        message: error.message,
      });
    }
  }
}
module.exports = new BannerController();
