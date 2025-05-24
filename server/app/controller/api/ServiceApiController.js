const httpCode = require("../../helper/httpServerCode");
const ServiceModel = require("../../model/ServiceModel");

class ServiceApiController {
  async GetAllService(req, res) {
    try {
      const services = await ServiceModel.find({ deleted: false });
      if (services) {
        return res.status(httpCode.success).json({
          status: true,
          message: "Services fetched successfully",
          data: services
        });
      } else {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "No services found!",
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ServiceApiController()
