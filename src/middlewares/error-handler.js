const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, _req, res, _next) => {
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	if (err.name === "ValidationError") {
		const errors = err.errors.username || err.errors.email;
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: errors.message });
	}

	if (err.code === 11000) {
		const val = err.keyValue.username || err.keyValue.email;
		const key = () => (err.keyValue.username ? "Username" : "Email");
		const msg = `${key()} ${val} has been used`;
		return res.status(StatusCodes.BAD_REQUEST).json({ msg });
	}

	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ msg: "Something went wrong, try again later" });
};

module.exports = errorHandlerMiddleware;
