const httpCode = require("../../helper/httpServerCode");
const TeamModel = require("../../model/TeamModel");
const fs = require("fs").promises;
const fsSync = require("fs");

class TeamController {
  async TeamListPage(req, res) {
    try {
      const teams = await TeamModel.find({ deleted: false });
      res.render("teams/list", {
        title: "Team List",
        data: teams,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async TeamAddPage(req, res) {
    try {
      res.render("teams/add", {
        title: "Add Member",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async AddTeamMember(req, res) {
    try {
      const { name, designation, facebook, twitter, linkedIn } = req.body;
      const newMember = new TeamModel({
        name,
        designation,
        socialLinks: {
          facebook,
          twitter,
          linkedIn,
        },
      });
      if (req.file) {
        newMember.image = req.file.path;
      }
      if (newMember) {
        await newMember.save();
      }
      return res.redirect("/teams/list");
    } catch (error) {
      console.log(error);
    }
  }
  async EditTeamPage(req, res) {
    try {
      const id = req.params.id;
      const team = await TeamModel.findById(id);
      if (!team) {
        return res.status(httpCode.notFound).json({
          message: "Team member not found!",
        });
      }
      res.render("teams/edit", {
        title: "Edit Member",
        data: team,
      });
    } catch (error) {
      return res.redirect("teams/list");
    }
  }
  async UpdateTeamMember(req, res) {
    try {
      const id = req.params.id;
      const { name, designation, facebook, twitter, linkedIn } = req.body;
      const updatePayload = {
        name,
        designation,
        socialLinks: {
          facebook,
          twitter,
          linkedIn,
        },
      };
      const updateData = await TeamModel.findByIdAndUpdate(id, updatePayload);
      if (updateData.image) {
        const existingFile = updateData.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        } else {
          res.status(httpCode.notFound).json({
            message: "File not found!",
          });
        }
      }
      if (req.file) {
        updateData.image = req.file.path;
        await updateData.save();
      }
      return res.redirect("/teams/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
  async DeleteTeamMember(req, res) {
    try {
      const id = req.params.id;
      const deleteData = await TeamModel.findByIdAndDelete(id);
      if (deleteData.image) {
        const existingFile = deleteData.image;
        if (fsSync.existsSync(existingFile)) {
          fs.unlink(existingFile);
        } else {
          res.status(httpCode.notFound).json({
            message: "File not found!",
          });
        }
      }
      res.redirect("/teams/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        message: error.message,
      });
    }
  }
}
module.exports = new TeamController();
