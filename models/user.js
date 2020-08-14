const mongoose = require('mongoose');  // import du package mongoose qui facilite les interactions avec notre base de données MongoDB.

const uniqueValidator = require('mongoose-unique-validator'); //import du package uniqueValidator.

//création du schema pour les Users avec la fonction 'mangoose Schema'
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, //avec le mot clé Unique, deux utilisateur ne peuvent pas utiliser le même mail.
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //package de validation pour pré-valider les informations avant de les enregistrer :
module.exports = mongoose.model('User', userSchema);  //export du model User.