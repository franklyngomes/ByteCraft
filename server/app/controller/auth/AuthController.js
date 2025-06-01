const httpCode = require("../../helper/httpServerCode");
const { comparePassword, hashedPassword } = require("../../middleware/auth");
const UserModel = require("../../model/UserModel");
const jwt = require("jsonwebtoken");

class AuthController {
  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "All fields are required!",
        });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(httpCode.conflict).json({
          status: false,
          message: "User with this email already exists",
        });
      }
      if (name.length < 3 || name.length > 30) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Name must be within 3 to 30  characters",
        });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Phone must be of 10 digits",
        });
      }
      const hashed = hashedPassword(password);
      const userData = new UserModel({
        name,
        email,
        password: hashed,
        phone,
      });
      if(req.file){
        userData.image = req.file.path
      }
      const data = await userData.save();
      return res.status(httpCode.create).json({
        status: true,
        message: "User Created Successfully",
        data: data,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(httpCode.notFound).json({
          status: false,
          message: "All fields are required",
        });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "3hr" }
      );
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token:token
      });
    } catch (error) {
      console.log(error);
    }
    next()
  }
  
}
module.exports = new AuthController();
