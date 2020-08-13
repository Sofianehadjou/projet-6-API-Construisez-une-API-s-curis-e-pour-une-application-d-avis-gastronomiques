const express = require('express');  //importer express.
const bodyParser = require('body-parser');  //impoter du package bodyParser.
const mongoose = require('mongoose');  // import du package mongoose qui facilite les interactions avec notre base de données MongoDB.


const path = require('path');

const userRoutes = require('./routes/user');    //Appeler les routes 'User'
const saucesRoutes = require('./routes/sauces');  //Appeler les routes 'Sauce'

//Connection de la base de donnée à l'API.
mongoose.connect('mongodb+srv://sofianeH:azerty@cluster0.1rk7z.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true }) 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// middleware pour eviter les ERRORS de CORS, les serveurs différents peuvent communiquer entre eux
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');   // permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    next();   // permet de transmettre le contrôle à la fonction middleware suivant.  
  });

  app.use(bodyParser.json());  //Middleware qui nous permet de transformer le corps de la requête en JSON.

// creation des middleware
app.use('/images', express.static(path.join(__dirname, 'images')));  //middleware pour le dossier image
app.use('/api/sauces', saucesRoutes);     //middleware pour route Sauce
app.use('/api/auth', userRoutes);         //middleware pour route User


module.exports = app;   //exporter l'application.