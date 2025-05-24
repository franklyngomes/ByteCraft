const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const hashedPassword = (password) => {
  const salt = 10;
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

const comparePassword = (password) => {

}

const AuthCheck = (req, res, next) => {
  const token = req?.body.token || req?.headers['x-access-token']
}
module.exports = {hashedPassword, comparePassword, AuthCheck}