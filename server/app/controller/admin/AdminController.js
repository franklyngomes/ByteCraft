const httpCode = require("../../helper/httpServerCode");
const {
  comparePassword,
  hashedPassword,
  hmacProcess,
} = require("../../middleware/auth");
const transport = require("../../middleware/sendMail");
const UserModel = require("../../model/UserModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

class AdminController {
  async signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password || !phone) {
        req.flash("error", "All fields are required!");
        return res.redirect("/signup");
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        req.flash("error", "User with this email already exists");
        return res.redirect("/signup");
      }
      if (name.length < 3 || name.length > 30) {
        req.flash("error", "Name must be within 3 to 30  characters");
        return res.redirect("/signup");
      }

      if (!/^\d{10}$/.test(phone)) {
        req.flash("error", "Phone must be of 10 digits");
        return res.redirect("/signup");
      }
      const hashed = hashedPassword(password);
      const userData = new UserModel({
        name,
        email,
        password: hashed,
        phone,
      });
      const data = await userData.save();
      return res.redirect("/");
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
      console.log(email, password);
      if (!email || !password) {
        req.flash("error", "All fields are required");
        return res.redirect("/");
      }
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        req.flash("error", "User not found!");
        return res.redirect("/");
      }
      const isMatch = comparePassword(password, user.password);

      if (!isMatch) {
        req.flash("error", "Invalid Password!");
        return res.redirect("/");
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
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true if using HTTPS
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
      });
      return res.redirect("/dashboard");
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async signout(req, res) {
    try {
      return res.clearCookie("token").redirect("/");
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async sendVerificationCode(req, res) {
    try {
      const { email } = req.body;
      const existingUser = await UserModel.findOne({ email });
      if (!existingUser) {
        req.flash("error", "User not found!");
        return res.redirect("/send-verification-code");
      }
      if (existingUser.verified) {
        req.flash("error", "User is already verified!");
        return res.redirect("/send-verification-code");
      }
      const codeValue = Math.floor(Math.random() * 1000000).toString();
      // const htmlTemplate = await readFileAsync('D:/Typescript Projects/ByteCraft-master/server/views/verificationEmail.html', 'utf-8')
      let info = await transport.sendMail({
        from: process.env.NODEMAILER_EMAIL_ADDRESS,
        to: existingUser.email,
        subject: "Verify your email address",
        html: "<h1>" + codeValue + "</h1>",
      });
      if (info.accepted[0] === existingUser.email) {
        const hashedCodeValue = hmacProcess(
          codeValue,
          process.env.NODEMAILER_VERIFICATION_SECRET
        );
        existingUser.verificationCode = hashedCodeValue;
        existingUser.verificationCodeValidation = Date.now();
        await existingUser.save();
        return res.status(httpCode.success).json({
          status: true,
          message: "Verification code sent!",
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async VerifyCode(req, res) {
    try {
      const { email, providedCode } = req.body;
      const codeValue = providedCode.toString();
      const existingUser = await UserModel.findOne({ email }).select(
        "+verificationCode +verificationCodeValidation"
      );
      if (!existingUser) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "User not found!",
        });
      }
      if (existingUser.verified) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "User is already verified!",
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
          message: "Verification Code expired!",
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
          message: "Email Verified!",
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
module.exports = new AdminController();
