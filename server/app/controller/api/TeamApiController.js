const httpCode = require('../../helper/httpServerCode')
const TeamModel = require('../../model/TeamModel')

class TeamApiController{
  async GetAllTeamMembers(req, res){
    try {
      const teamMember = await TeamModel.find({deleted: false})
      if(teamMember){
        return res.status(httpCode.success).json({
          status: true,
          message: "Team members fetched successfully",
          data: teamMember
        })
      }else{
        res.status(httpCode.notFound).json({
          status: false,
          message: "No teams found!"
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
module.exports = new TeamApiController()