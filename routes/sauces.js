const express = require('express');
const router = express.Router();
const thingCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.get('/sauces', thingCtrl.recupThing);
router.post('/sauces', multer, thingCtrl.createThing);

module.exports = router;