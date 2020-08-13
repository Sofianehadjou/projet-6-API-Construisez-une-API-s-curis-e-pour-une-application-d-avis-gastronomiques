const mongoose = require('mongoose');  // import du package mongoose qui facilite les interactions avec notre base de données MongoDB.

const uniqueValidator = require('mongoose-unique-validator');

//création du schema pour les Users avec la fonction 'mangoose Schema'
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);  //export du model User.