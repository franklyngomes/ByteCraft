const PortfolioModel = require("../../model/PortfolioModel");
const httpCode = require("../../helper/httpServerCode");
const fsSync = require("fs");
const fs = require("fs").promises;

class PortfolioController {
  async getAllPortfolio(req, res) {
    try {
      const items = await PortfolioModel.find({ deleted: false });
      res.render("portfolio/list", {
        title: "Portfolio",
        data: items,
      });
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async AddPortfolioPage(req, res) {
    try {
      res.render("portfolio/add", {
        title: "Add Portfolio",
      });
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async CreatePortfolio(req, res) {
    try {
      const { title } = req.body;
      const data = new PortfolioModel({
        title,
      });
      if (req.file) {
        data.image = req.file.path;
      }
      const portfolio = await data.save();
      if (portfolio) {
        res.redirect("/portfolio/list");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async EditPortfolio(req, res) {
    try {
      const portfolio = await PortfolioModel.findById(req.params.id);
      res.render("portfolio/edit", {
        title: "Edit Portfolio",
        data: portfolio,
      });
    } catch (error) {
      res.status(httpCode.badRequest).json({
        message: "Portfolio not found!",
      });
    }
  }
  async UpdatePortfolio(req, res) {
    try {
      const id = req.params.id;
      const updatedData = await PortfolioModel.findByIdAndUpdate(id, req.body);
      if (!updatedData) {
        res.status(httpCode.badRequest).json({
          message: "Failed to update portfolio!",
        });
      }
      if (updatedData.image) {
        const existingFile = updatedData.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        }
      }
      if (req.file) {
        const newImagePath = req.file.path;
        updatedData.image = newImagePath;
        await updatedData.save();
      }
      res.redirect("/portfolio/list");
      return res.status(httpCode.success).json({
        message: "Portfolio Updated Successfully",
        data: updatedData,
      });
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async DeletePortfolio(req, res){
    try {
      const deleteData = await PortfolioModel.findByIdAndDelete(req.params.id)
      if(deleteData.image){
        const existingData = deleteData.image
        if(fsSync.existsSync(existingData)){
          await fs.unlink(existingData)
        }
      }
      res.redirect('/portfolio/list')
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message
      })
    }
  }
}
module.exports = new PortfolioController();
