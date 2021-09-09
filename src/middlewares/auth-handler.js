const jwt = require("jsonwebtoken");

const usersModel = require("../model");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authHandlerMiddleware = (req, res, next) => {
	const token = req.cookies.DASHBOARD_WEB_DEV;

	if (!token) return res.redirect("/");

	jwt.verify(token, ACCESS_TOKEN_SECRET, err => {
		if (err) res.redirect("/login");
		next();
	});
};

const userInfoMiddleware = (req, res, next) => {
	const token = req.cookies.DASHBOARD_WEB_DEV;

	if (!token) {
		res.locals.user = null;
		return next();
	}

	jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, decodedToken) => {
		res.locals.user = null;
		if (err) return next();

		const user = await usersModel.findById(decodedToken.id);
		res.locals.user = user;
		next();
	});
};

module.exports = { authHandlerMiddleware, userInfoMiddleware };
