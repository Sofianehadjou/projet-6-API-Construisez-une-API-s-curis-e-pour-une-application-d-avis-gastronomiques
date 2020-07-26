 const mongoose = require('mongoose');
 
 const sauceSchema = mongoose.Schema({
   userId: { type: String, required: true },
  name: { type: String, required: true, /* validate : sauceValidation.nameValidator */ },
  manufacturer: { type: String, required: true, /* validate : sauceValidation.manufacturerValidator */},
  description: { type: String, required: true, /* validate : sauceValidation.descriptionValidator */ },
  mainPepper: { type: String, required: true, /* validate : sauceValidation.pepperValidator */  },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
 });


 
 module.exports = mongoose.model('Thing', sauceSchema);