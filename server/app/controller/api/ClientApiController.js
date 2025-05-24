const httpCode = require('../../helper/httpServerCode')
const ClientModel = require('../../model/ClientModel')

class ClientApiController{
  async AllClients(req, res){
    try {
      const clients = await ClientModel.find({deleted: false})
      if(clients && clients.length > 0){
        return res.status(httpCode.success).json({
          status: true,
          message: "All clients fetched successfully",
          data: clients
        })
      }else{
        return res.status(httpCode.notFound).json({
          status: false,
          message: "Failed to fetch clients"
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
module.exports = new ClientApiController()