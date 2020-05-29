const { OK } = require("./statusCodes");
const log4js = require("log4js");

log4js.configure({
	appenders: {
		app: {
			type: "file",
			filename: "logs/app.log",
			maxLogSize: 10485760
		},
		errorFile: {
			type: "file",
			filename: "logs/errors.log"
		},
		errors: {
			type: "logLevelFilter",
			level: "ERROR",
			appender: "errorFile"
		}
	},
	categories: {
		default: { appenders: ["app", "errors"], level: "DEBUG" }
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

module.exports.toTitleCase = str => {
	return str
		.toLowerCase()
		.split(" ")
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

module.exports.logger = (type, funcName, message) => {
	logger = log4js.getLogger(`Logs from ${funcName} function`);

	if (type === "error") logger.error(message);
	else if (type === "fatal") logger.fatal(message);
	else if (type === "info") logger.info(message);
	else if (type === "warn") logger.warn(message);
	else if (type === "debug") logger.debug(message);
	else if (type === "trace") logger.trace(message);
};
