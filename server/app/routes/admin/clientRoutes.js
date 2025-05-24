const express = require('express')
const router = express.Router()
const ClientController = require('../../controller/admin/ClientController')
const ClientImageUpload = require('../../helper/ClientImageUpload')

router.get('/client/list', ClientController.ClientList)
router.get('/client/add', ClientController.ClientAddPage)
router.post('/client/create', ClientImageUpload.single('image'), ClientController.AddClient)
router.get('/client/edit/:id', ClientController.EditClient)
router.post('/client/update/:id', ClientImageUpload.single('image'), ClientController.UpdateClient)
router.post('/client/delete/:id', ClientImageUpload.single('image'), ClientController.DeleteClient)

module.exports = router