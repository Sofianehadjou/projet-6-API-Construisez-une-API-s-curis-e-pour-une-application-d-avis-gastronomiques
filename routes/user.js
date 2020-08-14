const express = require('express');  //import express
const router = express.Router(); //création du router express

const userCtrl = require('../controllers/user');  


router.post('/signup', userCtrl.signup);  // création de la route POST pour l'inscription.
router.post('/login', userCtrl.login);    // création de la route POST pour l'authentification.


module.exports = router;  //export du router

