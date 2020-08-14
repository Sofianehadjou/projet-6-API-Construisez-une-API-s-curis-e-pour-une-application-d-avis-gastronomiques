const bcrypt = require('bcrypt'); //import du package Bcrpyt pour le cryptage des mots de passes.
const User = require('../models/user');  //import du model user.
const jwt = require('jsonwebtoken');     //import du package pour la création des tokens.
const { use } = require('../routes/user');   //appeler les routes user.

// créer un compte utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //crypter le mot de passe avec la fonction bcrypt.hash  
      .then(hash => {     //on récupere le hash du mot de passe 
        const user = new User({   //création du nouvel utilisateur avec le model mongoose. 
          email: req.body.email, 
          password: hash    
        });
        user.save()   //on enregistre le mot de passe dans la base de donnée.
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))   //promise renvoi de réponse 201, réponse de réussite.
          .catch(error => res.status(409).json({ message: 'l\'email est déja utilisé'})); //renvoi de réponse 400, message d'erreur.
      })
      .catch(error => res.status(500).json({ error })); //renvoi de réponse 500, message d'erreur.
  };

// se connecter (login).
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})   //utiliser la méthode findeOne pour trouver un seul utilisateur de la base de données.
    .then(user => {   
        if (!user){   //si on a récuprer un user ou non
            return res.status(401).json({ error: 'utilisateur non trouvé !' }); 
        }
        bcrypt.compare(req.body.password, user.password)  //utilisation de la function compare de bcrypt pour comparer le mot de passe.
        .then(valid =>{   
            if (!valid){        //si ce n'est pas valable
                return res.status(401).json({error: 'Mot de passe in correct !'});  //s'ils ne correspondent pas, nous renvoyons une erreur 401 Unauthorized
            }
            res.status(200).json({   //s'ils correspondent, les informations d'identification de notre utilisateur sont valides  
               userId: user._id,
                token: jwt.sign(   //utilisation du token d'authentification.
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',   //utilisations  d'une chaîne secrète de développement temporaire RANDOM_SECRET_KEY
                    { expiresIn: '24h' }   //la durée de validité du token à 24 heures.
                 )
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};