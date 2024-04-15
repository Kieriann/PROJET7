const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, multer, stuffCtrl.createBook);
router.put('/:id', auth, multer, stuffCtrl.modifyBook);
router.delete('/:id', auth, stuffCtrl.deleteBook);
router.get('/:id', auth, stuffCtrl.getOneBook);
router.get('/', auth, stuffCtrl.getAllBooks);

  module.exports = router; 