const Sauce = require('../models/sauce'); //import du model pour les sauces.
const fs = require('fs'); // Récupér le module 'file system' de Node pour les téléchargement d'images.

//Créer une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);   //Stocker et transformer les données envoyées par le front-end 
  const sauce = new Sauce({     //Création d'une instance du modèle Sauce
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()   //Sauvegarde de la sauce dans la base de données
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))   //promise renvoi de réponse 201, réponse de réussite.
    .catch(error => res.status(400).json({ error }));                      //renvoi de réponse 400, message d'erreur.
};

//Modifier une sauce
exports.modifySauce = (req, res, next) => {
  let sauceObject = {};  
  req.file ? (
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {     //Utilisation de la méthode find.
      const filename = sauce.imageUrl.split('/images/')[1]         // supprime l'ancienne image du serveur.
      fs.unlinkSync(`images/${filename}`)
    }),
    sauceObject = {
      // On modifie les données et on ajoute la nouvelle image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    }
 ) : ( 
    // Si la modification ne contient pas de nouvelle image
    sauceObject = { ...req.body }
  )
  Sauce.updateOne(
    // On applique les paramètre de sauceObject
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))  //renvoi de réponse 200, resource validé.
    .catch((error) => res.status(400).json({ error })) //renvoi de réponse 400, error.
}

//Permet de supprimer la sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      //Supprime l'image
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        //Supprime le document correspondant de la base de données
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

//Permet de récupérer la sauce unique identifiée par son id depuis la base MongoDB
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json(error));
};

//Permet de récuperer toutes les sauces de la base MongoDB
exports.getAllSauce = (req, res, next) => {
  Sauce.find()  //utilisation de la méthode find, pour récuprer toute les sauces.
    .then(sauces => res.status(200).json(sauces))  //promise qui nous renvoie le tableau de toute les sauces retourner par la base de donnée.
    .catch(error => res.status(400).json({ error })); //renvoie une erreur 400.
};

//Permet de "liker"ou "dislaker" une sauce
exports.likeDislike = (req, res, next) => {
  // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id

  if (like === 1) { // Si il s'agit d'un like
    Sauce.updateOne(
      { _id: sauceId },
      {
        $push: { usersLiked: userId },
        $inc: { likes: +1 }, // On incrémente de 1
      }
    )
      .then(() => res.status(200).json({ message: 'Like ajouté !' }))
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === -1) {
    Sauce.updateOne( // Si il s'agit d'un dislike
      { _id: sauceId },
      {
        $push: { usersDisliked: userId },
        $inc: { dislikes: +1 }, // On incrémente de 1
      }
    )
      .then(() => {
        res.status(200).json({ message: 'Dislike ajouté !' })
      })
      .catch((error) => res.status(400).json({ error }))
  }
  if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
    Sauce.findOne({ _id: sauceId })
      .then((sauce) => {
        if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
          Sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersLiked: userId },
              $inc: { likes: -1 }, // On incrémente de -1
            }
          )
            .then(() => res.status(200).json({ message: 'Like retiré !' }))
            .catch((error) => res.status(400).json({ error }))
        }
        if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
          Sauce.updateOne(
            { _id: sauceId },
            {
              $pull: { usersDisliked: userId },
              $inc: { dislikes: -1 }, // On incrémente de -1
            }
          )
            .then(() => res.status(200).json({ message: 'Dislike retiré !' }))
            .catch((error) => res.status(400).json({ error }))
        }
      })
      .catch((error) => res.status(404).json({ error }))
  }
}