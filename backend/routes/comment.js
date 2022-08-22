//TODO: Routes stuff.js (Evenement)
// import Express
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

// Evenement CRUD Commentaire
router.get('/', commentCtrl.getAllComment); // Affichage des commentaires
router.post('/', auth, commentCtrl.createComment); // Creation de commentaire
router.get('/:commentId', auth, commentCtrl.getOneComment); // Affichage d'un commentaire
router.delete('/:commentId', auth, commentCtrl.deleteComment); // Suppression d'un commentaire

// Export routes dans APP.JS
module.exports = router;
