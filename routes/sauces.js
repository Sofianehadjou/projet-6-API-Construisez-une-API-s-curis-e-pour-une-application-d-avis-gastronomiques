const express = require('express'); //import express
const router = express.Router();  //création du router express

const saucesCtrl = require('../controllers/sauces');   //import du controllers sauce
const multer = require('../middleware/multer-config'); //import du multer.
const auth = require('../middleware/auth'); 

router.post('/', auth, multer, saucesCtrl.createSauce);     // création de la route POST pour ajouter une sauce.
router.put('/:id', auth, multer, saucesCtrl.modifySauce);   // création de la route PUT pour modifier une sauce.
router.delete('/:id', auth, saucesCtrl.deleteSauce);       // création de la route DELETE pour supprimer une sauce.
router.get('/:id', auth, saucesCtrl.getOneSauce);          // création de la route GET pour afficher une sauce.
router.get('/', auth, saucesCtrl.getAllSauce);            // création de la route GET pour afficher toutes  les sauces.
router.post('/:id/like', auth, saucesCtrl.likeDislike)    // création de la route post pour les likes et dislikes

module.exports = router; //export du router