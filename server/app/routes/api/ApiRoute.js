const express = require("express");
const BannerApiController = require("../../controller/api/BannerApiController");
const ClientApiController = require("../../controller/api/ClientApiController");
const PortfolioApiController = require('../../controller/api/PortfolioApiController');
const CourseApiController = require('../../controller/api/CourseApiController')
const TeamApiController = require('../../controller/api/TeamApiController')

const ApiRouter = express.Router();

ApiRouter.get("/banners", BannerApiController.getallBanner);
ApiRouter.get("/clients", ClientApiController.AllClients);
ApiRouter.get('/portfolios', PortfolioApiController.getAllPortfolio);
ApiRouter.get('/course', CourseApiController.GetAllCourse);
ApiRouter.get('/course/:id', CourseApiController.CourseDetails)
ApiRouter.get('/teams', TeamApiController.GetAllTeamMembers)
module.exports = ApiRouter;
