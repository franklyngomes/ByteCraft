const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const database = require('./app/config/dbCon')

const app = express()
app.use(express.json())
database()

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000/")
})