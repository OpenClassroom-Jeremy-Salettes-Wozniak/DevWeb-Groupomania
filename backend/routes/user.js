//TODO: Routes user.js (Evenement)
// import Express
const express = require('express');
const router = express.Router();
// import controller user.js (Function)
const userCtrl = require('../controllers/user');
// importation du limiteur
const rateLimit = require('express-rate-limit');
const auth = require('../middleware/auth');

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // start blocking after 5 requests
});

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour window
	max: 1, // start blocking after 5 requests
	message:
		'Too many accounts created from this IP, please try again after an hour',
});

// Evenement CRUD User
router.post('/signup', createAccountLimiter, userCtrl.signup); // Creation utilisateur + limiteur
router.post('/login', apiLimiter, userCtrl.login); // Connexion utilisateur + limiteur
router.get('/:userId', auth, userCtrl.profil); // Affichage d'un utilisateur
router.delete('/:userId', userCtrl.delete); // Suppresion d'un utilisateur

// Export routes dans APP.JS
module.exports = router;
