const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const database = require('./app/config/dbCon')
const ejs = require('ejs')
const path = require('path')

database()
const app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.static(__dirname + "/public"))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Admin Routing
const adminRoutes = require('./app/routes/admin/adminRoutes')
const bannerRoutes = require('./app/routes/admin/bannerRoute.js')
const portfolioRoutes = require('./app/routes/admin/portfolioRoutes.js')
const serviceRoutes = require('./app/routes/admin/serviceRoutes.js')
const clientRoutes = require('./app/routes/admin/clientRoutes.js')
app.use(adminRoutes)
app.use(bannerRoutes)
app.use(portfolioRoutes)
app.use(serviceRoutes)
app.use(clientRoutes)

// Api Routing
const bannerApiRoute = require('./app/routes/api/BannerApiRoute.js')
const portfolioApiRoute = require('./app/routes/api/PortfolioApiRoute.js')
const serviceApiRoute = require('./app/routes/api/ServiceApiRoute.js')
const clientApiRoute = require('./app/routes/api/ClientApiRoute.js')
app.use('/api',bannerApiRoute)
app.use('/api',portfolioApiRoute)
app.use('/api',serviceApiRoute)
app.use('/api',clientApiRoute)

//Auth Routing
const authRouter = require('./app/routes/auth/authRoutes.js')
app.use('/auth', authRouter)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000/")
})