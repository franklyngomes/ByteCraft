const httpCode = require("../../helper/httpServerCode");
const CourseModel = require("../../model/CourseModel");
const fsSync = require("fs");
const fs = require("fs").promises;

class CourseController {
  async courseListPage(req, res) {
    try {
      const course = await CourseModel.find({ deleted: false });
      res.render("course/list", {
        title: "All Course",
        data: course,
        username: req.user.name,
      });
    } catch (error) {
      res.redirect("/course/list");
    }
  }
  async AddCoursePage(req, res) {
    try {
      res.render("course/add", {
        title: "Add Course",
        username: req.user.name,
      });
    } catch (error) {
      res.redirect("course/list");
    }
  }
  async AddCourse(req, res) {
    try {
      const { title, description } = req.body;
      const courseData = new CourseModel({
        title,
        description,
      });
      if (req.file) {
        courseData.image = req.file.path;
      }
      const data = await courseData.save();
      if (data) {
        res.redirect("/course/list");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async EditCoursePage(req, res) {
    try {
      const course = await CourseModel.findById(req.params.id);
      res.render("course/edit", {
        title: "Edit Course",
        data: course,
        username: req.user.name,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/course/list");
    }
  }
  async UpdateData(req, res) {
    try {
      const id = req.params.id;
      const updateData = await CourseModel.findByIdAndUpdate(id, req.body);
      if (!updateData) {
        return res.status(httpCode.badRequest).json({
          status: false,
          message: "Course not found",
        });
      }
      if (updateData.image) {
        const existingFile = updateData.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        } else {
          console.log("File not found!", existingFile);
        }
      }
      if (req.file) {
        const newImage = req.file.path;
        updateData.image = newImage;
        await updateData.save();
      }
      res.redirect("/course/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async DeleteCourse(req, res){
    try {
      const id = req.params.id
      const deleteCourse = await CourseModel.findByIdAndDelete(id)
      if(!deleteCourse){
        res.status(httpCode.badRequest).json({
          status: false,
          message: "Course not found!"
        })
      }
      if(deleteCourse.image){
        const existingImage = deleteCourse.image
        if(fsSync.existsSync(existingImage)){
          await fs.unlink(existingImage)
        }else{
          console.log("Image not found")
        }
        res.redirect("/course/list")
        return res.status(httpCode.success).json({
          status: true,
          message: 'Course deleted successfully'
        })
      }
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message
      })
    }
  }
}

module.exports = new CourseController();
