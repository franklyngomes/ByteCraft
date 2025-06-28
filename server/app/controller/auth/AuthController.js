const httpCode = require("../../helper/httpServerCode");
const {
  comparePassword,
  hashedPassword,
  hmacProcess,
} = require("../../middleware/auth");
const UserModel = require("../../model/UserModel");
const jwt = require("jsonwebtoken");
const transport = require("../../middleware/sendMail");

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
      if (req.file) {
        userData.image = req.file.path;
      }

      const codeValue = Math.floor(Math.random() * 1000000).toString();
      // const htmlTemplate = await readFileAsync('D:/Typescript Projects/ByteCraft-master/server/views/verificationEmail.html', 'utf-8')
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL_ADDRESS,
        to: userData.email,
        subject: "Verify your email address",
        html: "<h1>" + codeValue + "</h1>",
      });
      if (info.accepted[0] === userData.email) {
        const hashedCodeValue = hmacProcess(
          codeValue,
          process.env.NODEMAILER_VERIFICATION_SECRET
        );
        userData.verificationCode = hashedCodeValue;
        userData.verificationCodeValidation = Date.now();
        const data = await userData.save();
        return res.status(httpCode.create).json({
          status: true,
          message: "User Created Successfully & Verification code sent!",
          data: data,
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async signin(req, res, next) {
    try {
      const { email, password, signin_remember } = req.body;
      if (!email || !password) {
        res.status(httpCode.notFound).json({
          status: false,
          message: "All fields are required",
        });
      }
      const user = await UserModel.findOne({ email }).select("+password");
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
      if (signin_remember === "true") {
        res.cookie("user_email", user.email, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        if (isMatch) {
          res.cookie("user_password", password, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
        }
      }
      if (signin_remember === "false") {
        res.clearCookie("user_email");
        res.clearCookie("user_password");
      }
      if (token) {
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged in successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
    next();
  }
  async signOut(req, res) {
    try {
      res.clearCookie("token");
      console.log(token);
      return res.status(httpCode.success).json({
        status: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return res.status(httpCode.create).json({
        status: false,
        message: error.message,
      });
    }
  }
  async userProfileDetails(req, res) {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "User details fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async verifyEmail(req, res) {
    try {
      const { email, code } = req.body;
      const codeValue = code.toString();
      const existingUser = await UserModel.findOne({ email }).select(
        "+verificationCode +verificationCodeValidation"
      );
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found",
        });
      }
      if (existingUser.verified) {
        return res.status(httpCode.conflict).json({
          status: false,
          message: "User already verified!",
        });
      }
      if (
        !existingUser.verificationCode ||
        !existingUser.verificationCodeValidation
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Something went wrong!",
        });
      }
      if (
        Date.now() - existingUser.verificationCodeValidation >
        5 * 60 * 1000
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "OTP has expired!",
        });
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.verificationCode) {
        existingUser.verified = true;
        existingUser.verificationCode = undefined;
        existingUser.verificationCodeValidation = undefined;
        await existingUser.save();
        return res.status(httpCode.success).json({
          status: true,
          message: "Email verified successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User not found!",
        });
      }
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      // const htmlTemplate = await readFileAsync('D:/Typescript Projects/ByteCraft-master/server/views/verificationEmail.html', 'utf-8')
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL_ADDRESS,
        to: existingUser.email,
        subject: "Reset your password",
        html: "<h1>" + codeValue + "</h1>",
      });
      if (info.accepted[0] === existingUser.email) {
        const hashedCodeValue = hmacProcess(
          codeValue,
          process.env.NODEMAILER_VERIFICATION_SECRET
        );
        existingUser.forgotPasswordCode = hashedCodeValue;
        existingUser.forgotPasswordCodeValidation = Date.now();
        await existingUser.save();
        return res.status(httpCode.success).json({
          status: true,
          message: "Reset password code sent!",
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;
      const codeValue = code.toString();
      const existingUser = await UserModel.findOne({ email }).select(
        "+forgotPasswordCode +forgotPasswordCodeValidation"
      );
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found!",
        });
      }
      if (
        !existingUser.forgotPasswordCode ||
        !existingUser.forgotPasswordCodeValidation
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Something went wrong!",
        });
      }
      if (
        Date.now() - existingUser.forgotPasswordCodeValidation >
        5 * 60 * 1000
      ) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Reset password code expired!",
        });
      }
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.NODEMAILER_VERIFICATION_SECRET
      );
      if (hashedCodeValue === existingUser.forgotPasswordCode) {
        const hashed = hashedPassword(newPassword);
        existingUser.password = hashed
        existingUser.forgotPasswordCode = undefined;
        existingUser.forgotPasswordCodeValidation = undefined;
        await existingUser.save();
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Password reset successful",
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AuthController();
