const httpCode = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");
const path = require("path");
const fs = require("fs").promises;
const fsSync = require("fs");

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
      const { title, subtitle } = req.body;
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
      console.log(error);
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
  async updateBanner(req, res) {
    try {
      const id = req.params.id;
      const updateData = await BannerModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateData) {
        return res.status(httpCode.badRequest).json({
          message: "Banner not found!",
        });
      }
      if (updateData.image) {
        const existingFile = updateData.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
          console.log("File Detected: ", existingFile);
        } else {
          console.log("File not found! ", existingFile);
        }
      }
      if (req.file) {
        const newImagePath = req.file.path;
        updateData.image = newImagePath;
        await updateData.save();
      }
      return res.redirect("/banner/list")
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async deleteBanner(req, res) {
    try {
      const deletedBanner = await BannerModel.findByIdAndDelete(req.params.id);
      if (!deletedBanner) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Banner not found!",
        });
      }
      if (deletedBanner.image) {
        const absolutePath = deletedBanner.image;
        console.log("Attempting to delete:", absolutePath);
        if (fsSync.existsSync(absolutePath)) {
          await fs.unlink(absolutePath);
          console.log("File Detected: ", absolutePath);
        } else {
          console.log("File not found: ", absolutePath);
        }
      }
      return res.redirect("/banner/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new BannerController();
