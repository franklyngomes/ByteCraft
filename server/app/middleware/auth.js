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

}
module.exports = {hashedPassword, comparePassword, AuthCheck}