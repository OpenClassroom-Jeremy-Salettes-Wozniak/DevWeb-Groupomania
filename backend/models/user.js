// Creation d'un model utilisateur avec validation regex
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			validate: { notNull: false },
		},
		userName: {
			type: DataTypes.STRING,
			validate: {
				is: /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/g,
				notNull: false,
			},
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				is: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
				notNull: false,
				isEmail: true,
			},
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
				notNull: false,
			},
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
			validate: { notNull: false },
		},
	});
	return User;
};
