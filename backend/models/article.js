// Creation d'un model article avec validation regex
module.exports = (sequelize, DataTypes) => {
	const Article = sequelize.define('article', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: true,
		},
		title: {
			type: DataTypes.STRING,
			validate: {
				notNull: false,
			},
		},
		content: {
			type: DataTypes.STRING,
			validate: {
				notNull: false,
			},
		},
	});
	return Article;
};
