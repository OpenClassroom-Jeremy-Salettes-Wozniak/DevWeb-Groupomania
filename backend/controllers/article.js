// Récupération des modeles
const db = require('../models');
const Article = db.article;
const Comment = db.comment;

//TODO configuration userName [A finir]
// Creation d'un article
exports.createArticle = (req, res, next) => {
	console.log(req);
	const article = new Article({
		title: req.body.title,
		content: req.body.content,
		//userName: req.body.userName, // Ne veut pas recevoir le userName
		userId: req.userId,
	});
	article
		.save()
		.then(() => res.status(201).json({ message: 'article enregistrée !' }))
		.catch((error) => res.status(400).json({ error })); // ou une erreur code 400
};

// Suppression d'un article
exports.deleteArticle = (req, res, next) => {
	Article.destroy({ where: { id: req.params.id } })
		.then(() => res.status(200).json({ message: 'Article supprimé !' }))
		.catch((error) => res.status(400).json({ error }));
};

// Recupération des articles
exports.getAllArticle = (req, res, next) => {
	Article.findAll({
		// Classement du plus récent article au plus ancient
		order: [['createdAt', 'DESC']],
	})
		.then((articles) => {
			//si response reoutrne les articles
			res.status(200).json(articles);
		})
		.catch((error) => {
			res.status(400).json({
				error: error,
			});
		});
};

// Recupere un article auquel j'associe les commentaires ayant le meme articleId. voir association
exports.getAllComments = (req, res, next) => {
	Article.findOne({
		where: { id: req.params.id },
		// Inclure le model commentaire, que j'imbrique dans articles.
		include: { model: Comment, as: 'comment', nested: true },
	})
		.then((article) => {
			// si reponse retourne les commentaire de l'article
			res.status(200).json(article.comment);
		})
		.catch((error) => {
			res.status(404).json({
				error: error,
			});
		});
};
