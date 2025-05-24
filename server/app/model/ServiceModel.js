const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
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

const ServiceModel = mongoose.model('service', ServiceSchema)
module.exports = ServiceModel
