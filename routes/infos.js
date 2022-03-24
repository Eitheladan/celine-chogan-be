const express = require('express');
const router = express.Router();

const infosCtrl = require('../controller/infos')


router.put('/update/:id', infosCtrl.updateInfos);
router.get('/', infosCtrl.getInfos);


module.exports = router;