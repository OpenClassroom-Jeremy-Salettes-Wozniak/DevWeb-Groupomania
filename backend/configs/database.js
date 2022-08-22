// Importation des valeurs à partir du fichiers .env
const dotenv = require('dotenv');
dotenv.config();
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_DIALECT = process.env.DB_DIALECT;

// Fichier de configuration de la database
module.exports = {
	HOST: DB_HOST,
	USER: DB_USER,
	PASSWORD: DB_PASSWORD,
	DB: DB_NAME,
	dialect: DB_DIALECT,
};
