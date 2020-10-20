require("dotenv").config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGO_URI:
		process.env.NODE_ENV === "production"
			? process.env.MONGO_URI_PROD
			: process.env.NODE_ENV === "staging"
			? process.env.MONGO_URI_STAGING
			: process.env.MONGO_URI_DEV,
	JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY
};
