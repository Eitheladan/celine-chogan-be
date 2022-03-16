const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user.js');
const auth = require('../middleware/auth')

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/infos', auth, userCtrl.infos);

module.exports = router;