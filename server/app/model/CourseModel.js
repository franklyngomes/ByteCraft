const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    image: {
      required: true,
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt :{
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

const CourseModel = mongoose.model('course', CourseSchema)
module.exports = CourseModel
