// TODO: user.js de controllers
// Import jsonwebtoken (Créez token qui permet à l'user de rester connecter quand il effectue CRUD
const jwt = require('jsonwebtoken');
// Import le model user.js
const db = require('../models');
const User = db.user;
// Import bcrypt qui est un algorithme de cryptage
const bcrypt = require('bcrypt');
// Import les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();
const TOKEN_ENV = process.env.TOKEN_ENV;

// Inscription d'un utilisateur
exports.signup = (req, res, next) => {
	// bcrypt.hash récupere mot de passe et le hash, puis ajoute un salage(15) qui va hasher le hashe
	bcrypt
		.hash(req.body.password, 15)
		// Si il à une réponse (un mot de passe) créé un User en recupereant l'email, le hash, ...
		.then((hash) => {
			const user = new User({
				userName: req.body.userName,
				email: req.body.email,
				password: hash,
				isAdmin: false,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Connexion d'un utilisateur
exports.login = (req, res, next) => {
	User.findOne({ where: { email: req.body.email } })
		.then((user) => {
			// si il y a pas de reponse retourne "Utilisateur non trouvé !"
			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}
			// Sinon bcrypt va comparer le mot de passe saisie par l'user avec le hash server
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					// Si invalide 'Mot de passe incorrect !'
					if (!valid) {
						return res.status(401).json({ error: 'Mot de passe incorrect !' });
					}
					/* Si status est 200 envoi l'user sur son espace et crée un token qui va durer 24h
					le token devra etre verifier pour voir si c'est la même personne qui effectuer
					l'action grace au middleware auth.js */
					res.status(200).json({
						userId: user.userId,
						userName: user.userName,
						email: user.email,
						createAt: user.createAt,
						isAdmin: user.isAdmin,
						token: jwt.sign({ userId: user.userId }, TOKEN_ENV, {
							expiresIn: '24h',
						}),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

// Affichage d'un utilisateur
exports.profil = (req, res, next) => {
	//Recup de l'ID
	User.findOne({ where: { userId: req.params.userId } })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json({ error }));
};

// Suppression d'un utilisateur
exports.delete = (req, res, next) => {
	User.destroy({ where: { userId: req.params.userId } })
		.then(() => {
			res.status(200).send('Removed Success');
		})
		.catch((error) => res.status(500));
};
