// Connnextion au serveur
const dbConfig = require('../configs/database.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
});

sequelize
	.authenticate()
	.then(function () {
		console.log('Connection has been established successfully.');
	})
	.catch(() => console.log('Error connection'));

// Importation sequelize et model
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize);
db.article = require('./article.js')(sequelize, Sequelize);
db.comment = require('./comment.js')(sequelize, Sequelize);

// Association des tables
db.article.belongsTo(db.user, { foreignKey: 'userId' }); // Dans article, creation d'une key userId
db.comment.belongsTo(db.user, { foreignKey: 'userId' }); // Dans comment, creation d'une key userId
db.article.hasMany(db.comment, { as: 'comment' }); // Dans article, association des comments
db.comment.belongsTo(db.article, { foreignKey: 'articleId' }); // Dans comment, creation d'une key articleId

db.article.belongsTo(db.user, { foreignKey: 'userName' }); // Dans article, creation d'une key userName

// Syncronisation de la table
sequelize
	.sync({})
	.then(() => console.log('Table créer '))
	.catch((error) => console.error('erreur', error));

module.exports = db;
