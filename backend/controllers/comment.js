// TODO: stuff.js de controllers

const db = require('../models');
const Comment = db.comment;

// Creation d'un commentaire en recupererant l'userId / content / articleId
exports.createComment = (req, res, next) => {
	const comment = new Comment({
		content: req.body.content,
		userId: req.userId,
		articleId: req.body.articleId,
	});
	comment
		.save()
		.then((comment) => res.status(201).json(comment))
		.catch((error) => res.status(400).json({ error })); // ou une erreur code 400
};

// Recuperation d'un commentaire
exports.getOneComment = (req, res, next) => {
	Comment.findOne({
		where: {
			commentId: req.params.commentId,
		},
	})
		.then((comment) => {
			res.status(200).json(comment);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
	Comment.destroy({ where: { commentId: req.params.commentId } })
		.then(() => res.status(200).json({ message: 'commentaire supprimé !' }))
		.catch((error) => res.status(400).json({ error }));
};

// Recuperation de tous les commentaires avec affichage du plus récent au plus ancient
exports.getAllComment = (req, res, next) => {
	Comment.findAll({
		order: [['createdAt', 'DESC']],
	})
		.then((comments) => {
			res.status(200).json(comments);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};
