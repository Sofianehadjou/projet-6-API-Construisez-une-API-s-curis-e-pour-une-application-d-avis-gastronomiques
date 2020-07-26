const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislike)

module.exports = router;