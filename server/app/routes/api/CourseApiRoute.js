const express = require('express')
const router = express.Router()
const CourseApiController = require('../../controller/api/CourseApiController')

router.get('/course', CourseApiController.GetAllCourse)
router.get('/course/:id', CourseApiController.CourseDetails)
module.exports = router