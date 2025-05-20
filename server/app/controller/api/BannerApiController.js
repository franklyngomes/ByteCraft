const httpCodes = require("../../helper/httpServerCode");
const BannerModel = require("../../model/BannerModel");


class BannerApiController {
  async getallBanner(req, res) {
    try {  
      const data = await BannerModel.find();
      return res.status(200).json({
        status:true,
        data:data
      })
    
    } catch (error) {
      console.log("Error Adding Banner", error);
      res.status(httpCodes.internalServerError).json({
        status:false,
        message:error.message
      });
    }
  }

}
module.exports = new BannerApiController();
