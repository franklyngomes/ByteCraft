const httpCode = require("../../helper/httpServerCode");
const ClientModel = require("../../model/ClientModel");
const fs = require("fs").promises;
const fsSync = require("fs");

class ClientController {
  async ClientList(req, res) {
    try {
      const clients = await ClientModel.find({ deleted: false });
      res.render("clients/list", {
        title: "All Clients",
        data: clients,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async ClientAddPage(req, res) {
    try {
      return res.render("clients/add", {
        title: "Add Client",
      });
    } catch (error) {
      console.log(error);
    }
  }
  async AddClient(req, res) {
    try {
      const { title } = req.body;
      const clientData = new ClientModel({
        title,
      });
      if (req.file) {
        clientData.image = req.file.path;
        await clientData.save();
      }
      return res.redirect("/client/list");
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async EditClient(req, res) {
    try {
      const id = req.params.id;
      const clientData = await ClientModel.findById(id);
      res.render("clients/edit", {
        title: "Edit Client",
        data: clientData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async UpdateClient(req, res) {
    try {
      const id = req.params.id;
      const updateClient = await ClientModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateClient) {
        return res.status(httpCode.notFound).json({
          status: false,
          message: "Client not found!",
        });
      }
      if (updateClient.image) {
        const existingFile = updateClient.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        } else {
          console.log(`${existingFile} not found!`);
        }
      }
      if (req.file) {
        updateClient.image = req.file.path;
        await updateClient.save();
      }
      return res.redirect("/client/list");
    } catch (error) {
      return res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
  async DeleteClient(req, res) {
    try {
      const id = req.params.id;
      const deleteClient = await ClientModel.findByIdAndDelete(id);
      if (deleteClient.image) {
        const existingFile = deleteClient.image;
        if (fsSync.existsSync(existingFile)) {
          await fs.unlink(existingFile);
        } else {
          console.log(`${existingFile} not found!`);
        }
      }
      res.redirect("/client/list");
    } catch (error) {
      res.status(httpCode.internalServerError).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ClientController();
