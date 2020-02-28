const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config/index");

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		role: {
			type: String,
			default: "user",
			required: true
		}
	},
	{ timestamps: true }
);

UserSchema.methods.generateAuthToken = function() {
	const token = jwt.sign(
		{
			id: this._id,
			name: this.name,
			email: this.email,
			role: this.role
		},
		JWT_PRIVATE_KEY
	);
	return token;
};

module.exports = User = mongoose.model("User", UserSchema);
