const express = require('express');
const router = express.Router();

const commandeController = require('../controller/commande')

router.post('/', commandeController.sendCommande);

module.exports = router;