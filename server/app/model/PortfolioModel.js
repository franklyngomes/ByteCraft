const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
const PortfolioModel = mongoose.model("portfolio", PortfolioSchema);
module.exports = PortfolioModel;
