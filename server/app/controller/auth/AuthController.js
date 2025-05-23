const httpCode = require('../../helper/httpServerCode')
const UserModel = require('../../model/UserModel')
class AuthController{
  async signup(req, res){
    try {
      console.log(re.body)
      const {name, email, password, phone} = req.body
      const userData = new UserModel({
        name, email, password, phone
      })
      const data = await userData.save()
      return res.status(httpCode.create).json({
        status: true,
        message: "User Created Successfully",
        data: data
      })
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message
      })
    }
  }
}
module.exports = new AuthController