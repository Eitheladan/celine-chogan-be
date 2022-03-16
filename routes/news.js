const express = require('express');
const router = express.Router();

const newsCtrl = require('../controller/news')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/create', multer, newsCtrl.createNews);
router.put('/update/:id', multer, newsCtrl.updateNews);
router.delete('/:id', newsCtrl.deleteNews);
router.get('/:id', newsCtrl.getOneNews);
router.get('/', newsCtrl.getAllNews);

module.exports = router;