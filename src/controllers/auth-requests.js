const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usersModel = require("../model");
const asyncWrapper = require("../middlewares/async-wrapper");
const { BadRequestError } = require("../errors");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const maxAge = 5 * 60 * 60 * 1000;
const cookieName = "DASHBOARD_WEB_DEV";
const createToken = id => jwt.sign({ id }, ACCESS_TOKEN_SECRET, { expiresIn: maxAge / 1000 });

const POST_SIGN_UP = asyncWrapper(async (req, res) => {
	const { username, email, password, rePassword } = req.body;
	if (password !== rePassword) throw new BadRequestError("Passwords are different");

	const user = await usersModel.create({ username, email, password });
	const token = createToken(user._id);

	res.cookie(cookieName, token, { httpOnly: true, maxAge });
	res.status(StatusCodes.CREATED).redirect("/");
});

const POST_LOGIN = asyncWrapper(async (req, res) => {
	const { username_or_email, password } = req.body;

	const user =
		(await usersModel.findOne({ username: username_or_email })) ||
		(await usersModel.findOne({ email: username_or_email }));
	if (!user) throw new BadRequestError("No user registered with such email or username");

	const passCheck = await bcrypt.compare(password, user.password);
	if (!passCheck) throw new BadRequestError("Incorrect password");

	const token = createToken(user._id);

	res.cookie(cookieName, token, { httpOnly: true, maxAge });
	res.status(StatusCodes.OK).redirect("/");
});

const LOGOUT = (_req, res) => {
	res.cookie(cookieName, "", { maxAge: 1 });
	res.status(StatusCodes.OK).redirect("/");
};

module.exports = {
	POST_SIGN_UP,
	POST_LOGIN,
	LOGOUT,
};
