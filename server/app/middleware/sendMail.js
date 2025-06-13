const nodemailer = require('nodemailer')
const transport = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user:process.env.NODEMAILER_EMAIL_ADDRESS,
    pass:process.env.NODEMAILER_PASSWORD
  }
})
module.exports = transport