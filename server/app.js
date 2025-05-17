const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const database = require('./app/config/dbCon')
const adminRoutes = require('./app/routes/admin/adminRoutes')
const homeRoutes = require('./app/routes/admin/homeRoutes.js')
const ejs = require('ejs')

const app = express()
database()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/public"))

app.use(adminRoutes)
app.use(homeRoutes)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000/")
})