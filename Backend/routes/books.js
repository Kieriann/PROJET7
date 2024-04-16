const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const booksCtrl = require('../controllers/books');

router.post('/', auth, multer, booksCtrl.createBook);
router.put('/:id', auth, multer, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/bestrating', booksCtrl.bestRating); 
router.get('/:id', booksCtrl.getOneBook);
router.get('/', booksCtrl.getAllBooks);
router.post("/:id/rating", auth, booksCtrl.rating);

module.exports = router;
