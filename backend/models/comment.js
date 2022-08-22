// Creation d'un model commentaire avec validation regex
module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('comment', {
		commentId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
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
	return Comment;
};
