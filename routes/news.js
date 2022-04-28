const express = require('express');
const router = express.Router();

const newsCtrl = require('../controller/news')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

router.post('/create', auth, multer, newsCtrl.createNews);
router.put('/update/:id', auth, multer, newsCtrl.updateNews);
router.delete('/:id', auth, newsCtrl.deleteNews);
router.get('/:id', newsCtrl.getOneNews);
router.get('/', newsCtrl.getAllNews);

module.exports = router;