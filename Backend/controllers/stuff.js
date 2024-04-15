const Book = require('../models/Book');
const fs = require ('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._usedId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });

    book.save()
    .then(() => { res.status (201).json({message: 'Objet enregistré'})})
    .catch(error => { res.status(400).json( { error })})
  };

  exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
    .then((thing) =>{
        if (thing.userId != req.auth.userId) {
          res.status(401).json({ message : 'Non-autorisé '});
        } else {
          Book.updateOne({ _id: req.param.id}, { ...bookObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
  };
   

  exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
      .then(thing => {
        if (book.userId != req.auth.userId){
          res.status(401).json({message: 'Non-autorisé' });
        } else {
          const filename = book.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
              Book.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }));
          });
      }
  })
      .catch( error => {
        res.status(500).json({ error });
      })
  };

  exports.getOneBook = (req, res, next) => {
    Book.findOne({userId: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
  };

  exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };
  