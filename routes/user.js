const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.js');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos', userCtrl.infos);

module.exports = router;