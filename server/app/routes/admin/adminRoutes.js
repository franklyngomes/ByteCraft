const express = require('express')
const AdminAuthController = require('../../controller/admin/AdminController')
const { AuthCheck } = require('../../middleware/auth')
const PublicController = require('../../controller/admin/PublicController')
const BannerController = require('../../controller/admin/BannerController')
const BannerImageUpload = require('../../helper/BannerImageUpload')
const ClientController = require('../../controller/admin/ClientController')
const ClientImageUpload = require('../../helper/ClientImageUpload')
const PortfolioController = require('../../controller/admin/PortfolioController')
const PortfolioImageUpload = require('../../helper/PortfolioImageUpload')
const CourseController = require('../../controller/admin/CourseController')
const CourseImageUpload = require('../../helper/CourseImageUpload')
const TeamController = require('../../controller/admin/TeamController')
const TeamImageUpload = require('../../helper/TeamImageUpload')
const router = express.Router()
const multer = require('multer')
const upload = multer()

//Public
router.post('/signup',upload.none(), AdminAuthController.signup)
router.post('/signin',upload.none(), AdminAuthController.signin)
router.get('/signout', AdminAuthController.signout)
router.post('/send-verification-code',upload.none(), AdminAuthController.sendVerificationCode)
router.post('/verify-email',upload.none(), AdminAuthController.VerifyCode)

//Dashboard
router.get('/dashboard',AuthCheck,PublicController.dashboardPage )

//Banner
router.get('/banner/list',AuthCheck, BannerController.listPage)
router.get('/banner/add',AuthCheck, BannerController.addPage)
router.post('/banner/create',AuthCheck,BannerImageUpload.single('image'), BannerController.createPage)
router.get('/banner/edit/:id',AuthCheck, BannerController.editPage)
router.post('/banner/update/:id',AuthCheck,BannerImageUpload.single('image'), BannerController.updateBanner)
router.get('/banner/delete/:id',AuthCheck,BannerImageUpload.single('image'),BannerController.deleteBanner)

//Client
router.get('/client/list',AuthCheck, ClientController.ClientList)
router.get('/client/add',AuthCheck, ClientController.ClientAddPage)
router.post('/client/create',AuthCheck, ClientImageUpload.single('image'), ClientController.AddClient)
router.get('/client/edit/:id',AuthCheck, ClientController.EditClient)
router.post('/client/update/:id',AuthCheck, ClientImageUpload.single('image'), ClientController.UpdateClient)
router.post('/client/delete/:id',AuthCheck, ClientImageUpload.single('image'), ClientController.DeleteClient)

//Portfolio
router.get('/portfolio/list',AuthCheck, PortfolioController.getAllPortfolio)
router.get('/portfolio/add',AuthCheck, PortfolioController.AddPortfolioPage)
router.post('/portfolio/create',AuthCheck,PortfolioImageUpload.single('image'), PortfolioController.CreatePortfolio)
router.get('/portfolio/edit/:id',AuthCheck, PortfolioController.EditPortfolio)
router.post('/portfolio/update/:id',AuthCheck,PortfolioImageUpload.single('image'), PortfolioController.UpdatePortfolio)
router.post('/portfolio/delete/:id',AuthCheck,PortfolioImageUpload.single('image'), PortfolioController.DeletePortfolio)

//Course
router.get("/course/list",AuthCheck, CourseController.courseListPage)
router.get("/course/add",AuthCheck, CourseController.AddCoursePage)
router.post("/course/create",AuthCheck, CourseImageUpload.single('image'), CourseController.AddCourse)
router.get('/course/edit/:id',AuthCheck, CourseController.EditCoursePage)
router.post('/course/update/:id',AuthCheck,CourseImageUpload.single('image'), CourseController.UpdateData)
router.post('/course/delete/:id',AuthCheck, CourseImageUpload.single('image'), CourseController.DeleteCourse)

//Team
router.get('/teams/list',AuthCheck,TeamController.TeamListPage )
router.get('/teams/add',AuthCheck, TeamController.TeamAddPage)
router.post('/team/create',AuthCheck,TeamImageUpload.single('image'), TeamController.AddTeamMember)
router.get('/teams/edit/:id',AuthCheck, TeamController.EditTeamPage)
router.post('/teams/update/:id',AuthCheck, TeamImageUpload.single('image'), TeamController.UpdateTeamMember)
router.post('/teams/delete/:id',AuthCheck,TeamImageUpload.single(), TeamController.DeleteTeamMember)


module.exports = router