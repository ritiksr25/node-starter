const { sendError } = require("../utility/helpers");
const { BAD_REQUEST } = require("../utility/statusCodes");

let emailRegex = /^\S+@\S+\.\S+/,
	passwordRegex = /^[\S]{8,}/;

module.exports.userValidation = (req, res, next) => {
	let { name, email, password } = req.body;

	if (!name) return sendError(res, "Name is not provided.", BAD_REQUEST);
	if (!email || !emailRegex.test(String(email).trim()))
		return sendError(res, "Email is not valid.", BAD_REQUEST);
	if (!password || !passwordRegex.test(String(password).trim()))
		return sendError(
			res,
			"Password should be atleast 8 characters long.",
			BAD_REQUEST
		);
	return next();
};
