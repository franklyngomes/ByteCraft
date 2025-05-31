const httpCode = require("../../helper/httpServerCode");
const CourseModel = require("../../model/CourseModel");

class CourseApiController {
  async GetAllCourse(req, res) {
    try {
      const course = await CourseModel.find({ deleted: false });
      if (course) {
        return res.status(httpCode.success).json({
          status: true,
          message: "Course fetched successfully",
          data: course,
        });
      } else {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "No course found!",
        });
      }
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async CourseDetails(req, res) {
    try {
      const id = req.params.id;
      const course = await CourseModel.findById(id);
      console.log(course)
      if (!course) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "Course not found!",
        });
      }
      return res.status(httpCode.success).json({
        status: true,
        message: "Course fetched successfully",
        data: course,
      });
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new CourseApiController();
