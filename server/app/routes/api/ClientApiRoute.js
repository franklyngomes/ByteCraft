const express = require("express");
const ClientApiController = require("../../controller/api/ClientApiController");
const router = express.Router();


router.get("/clients", ClientApiController.AllClients);
module.exports = router;
