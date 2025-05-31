const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SocialLinksSchema = new Schema({
  facebook: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  },
});
const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    socialLinks: SocialLinksSchema,
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

const TeamModel = mongoose.model("team", TeamSchema);
module.exports = TeamModel;
