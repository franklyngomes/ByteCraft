const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const database = require('./app/config/dbCon')
const ejs = require('ejs')
const path = require('path')

database()
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(__dirname + "/public"))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Admin Routing
const adminRoutes = require('./app/routes/admin/adminRoutes')
const bannerRoutes = require('./app/routes/admin/bannerRoute.js')
const portfolioRoutes = require('./app/routes/admin/portfolioRoutes.js')
app.use(adminRoutes)
app.use(bannerRoutes)
app.use(portfolioRoutes)

// Api Routing
const bannerApiRoute = require('./app/routes/api/BannerApiRoute.js')
app.use('/api',bannerApiRoute)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000/")
})