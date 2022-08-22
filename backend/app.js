// TODO: APP.JS
// Permet d'utilisé le framework express(serveur standard Node)
const express = require('express');
const app = express();
// Permet de prendre en charge le JSON
const bodyParser = require('body-parser');
// Protége de certaines vulnérabilités Web connues en définissant les en-têtes HTTP de manière appropriée
// csp : Content-Security-Policy protection contre attaques cross-site scripting et autres injections
// hidePoweredBy : Supprime l’en-tête X-Powered-By qui masque le fait d'utilisé Express.
// hsts : Strict-Transport-Security qui impose des connexions (HTTP sur SSL/TLS) sécurisées au serveur.
// ieNoOpen : X-Download-Options Séfinir par défault l'enregistrement plutot que téléchargement auto.
// noCache :  Cache-Control et Pragma pour désactiver la mise en cache côté client.
// noSniff : X-Content-Type-Options pour protéger les navigateurs du reniflage du code MIME.
// frameguard : X-Frame-Options pour fournir une protection clickjacking.
// xssFilter : X-XSS-Protection afin d’activer le filtre de script intersites (XSS)
const helmet = require('helmet');

// Chemin des importation user et stuffRoutes
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

// CORS Permet à "*" tous les utilisateur de recevoir, envoyer, update, supprimer... CRUD
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	);
	next();
});

// Protéger certaines vulnérabilités Web connues en définissant les en-têtes HTTP de manière appropriée
app.use(helmet());

// Permet de prendre en charge le JSON
app.use(bodyParser.json());

// L'pplication va utilisé URI et Function importer
app.use('/api/comment', commentRoutes); // Contient sauce
app.use('/api/article', articleRoutes); // Contient sauce
app.use('/api/auth', userRoutes); // Contient user

// Exporte l'application pour le server.js
module.exports = app;
