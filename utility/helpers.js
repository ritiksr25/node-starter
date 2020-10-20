const { OK } = require("./statusCodes");
const log4js = require("log4js");

log4js.configure({
	appenders: {
		server: { type: "file", filename: "logs/server.log" },
		database: { type: "file", filename: "logs/database.log" },
		app: { type: "file", filename: "logs/app.log" }
	},
	categories: {
		server: { appenders: ["server"], level: "DEBUG" },
		database: { appenders: ["database"], level: "DEBUG" },
		app: { appenders: ["app"], level: "DEBUG" },
		default: { appenders: ["app"], level: "DEBUG" }
	}
});
let logger = log4js.getLogger();
logger.level = "debug";

module.exports.sendError = (res, message, status) => {
	res.status(status).json({
		message,
		error: true,
		data: null
	});
};

module.exports.sendSuccess = (res, data, token) => {
	if (token) {
		return res.status(OK).header("x-auth-token", token).json({
			message: "success",
			error: false,
			data
		});
	}
	res.status(OK).json({
		message: "success",
		error: false,
		data
	});
};

module.exports.generateHash = length => {
	let chars =
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let code = "";
	for (let i = 0; i < length; i++) {
		code += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return code;
};

module.exports.generateOtp = length => {
	let chars = "0123456789";
	let code = "";
	for (let i = 0; i < length; i++) {
		code += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return code;
};

module.exports.toTitleCase = str => {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

module.exports.logger = (type, category, logObject, err) => {
	logger = log4js.getLogger(category);
	if (type === "error") logger.error(logObject);
	else if (type === "fatal") logger.fatal(logObject);
	else if (type === "info") logger.info(logObject);
	else if (type === "warn") logger.warn(logObject);
	else if (type === "debug") logger.debug(logObject);
	else if (type === "trace") logger.trace(logObject);
};
