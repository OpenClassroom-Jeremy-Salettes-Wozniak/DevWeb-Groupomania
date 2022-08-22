//TODO: Routes stuff.js (Evenement)
// import Express
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const articleCtrl = require('../controllers/article');

// Evenement CRUD Article
router.get('/', auth, articleCtrl.getAllArticle); // Affichage des articles
router.post('/', auth, articleCtrl.createArticle);
router.get('/:id/comment', auth, articleCtrl.getAllComments); // Affichage du commentaire
router.delete('/:id', articleCtrl.deleteArticle); // Suppression de l'article

// Export routes dans APP.JS
module.exports = router;
