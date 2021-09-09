const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: [true, "Username is required"],
		minlength: [3, "Username too short"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "Email is required"],
		validate: { validator: isEmail, message: props => `${props.value} is not a valid email` },
	},
	password: {
		type: String,
		required: [true, "Password required"],
		minlength: [6, "Password too short"],
	},
});

UsersSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model("Users", UsersSchema);
