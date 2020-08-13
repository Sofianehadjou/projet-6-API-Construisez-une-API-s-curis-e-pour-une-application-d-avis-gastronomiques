const mongoose = require('mongoose');  // import du package mongoose qui facilite les interactions avec notre base de données MongoDB.
 
//création du schema pour les sauces avec la fonction 'mangoose Schema'
 const sauceSchema = mongoose.Schema({
   userId: { type: String, required: true },   //définition de l'objet qui sera générer par la base de donnée. ce sont des champs requis avec le 'required'
  name: { type: String, required: true},       //définition de l'objet pour configurer le nom.
  manufacturer: { type: String, required: true }, 
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] }, 
 });

 module.exports = mongoose.model('Thing', sauceSchema); //export du model sauce.