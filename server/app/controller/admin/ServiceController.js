const httpCode = require("../../helper/httpServerCode");
const ServiceModel = require("../../model/ServiceModel");
const fsSync = require("fs");
const fs = require("fs").promises;

class ServiceController {
  async serviceListPage(req, res) {
    try {
      const services = await ServiceModel.find({ deleted: false });
      res.render("service/list", {
        title: "All Services",
        data: services,
      });
    } catch (error) {
      res.redirect("/service/list");
    }
  }
  async AddServicePage(req, res) {
    try {
      res.render("service/add", {
        title: "Add Service",
      });
    } catch (error) {
      res.redirect("service/list");
    }
  }
  async AddService(req, res) {
    try {
      const { title, description } = req.body;
      const serviceData = new ServiceModel({
        title,
        description,
      });
      if (req.file) {
        serviceData.image = req.file.path;
      }
      const data = await serviceData.save();
      if (data) {
        res.redirect("/service/list");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async EditServicePage(req, res) {
    try {
      const service = await ServiceModel.findById(req.params.id);
      res.render("service/edit", {
        title: "Edit Service",
        data: service,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/service/list");
    }
  }
  async UpdateData(req, res) {
    try {
      const id = req.params.id;
      const updateData = await ServiceModel.findByIdAndUpdate(id, req.body);
      if (!updateData) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Service not found",
        });
      }
      if (updateData.image) {
        const existingFile = updateData.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        } else {
          console.log("File not found!", existingFile);
        }
      }
      if (req.file) {
        const newImage = req.file.path;
        updateData.image = newImage;
        await updateData.save();
      }
      res.redirect("/service/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async DeleteService(req, res){
    try {
      const id = req.params.id
      const deleteService = await ServiceModel.findByIdAndDelete(id)
      if(!deleteService){
        res.status(httpCode.badRequest).json({
          status: false,
          message: "Service not found"
        })
      }
      if(deleteService.image){
        const existingImage = deleteService.image
        if(fsSync.existsSync(existingImage)){
          await fs.unlink(existingImage)
        }else{
          console.log("Image not found")
        }
        res.redirect("/service/list")
        return res.status(httpCode.success).json({
          status: true,
          message: 'Service deleted successfully'
        })
      }
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message
      })
    }
  }
}

module.exports = new ServiceController();
