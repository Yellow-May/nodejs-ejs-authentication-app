const { authHandlerMiddleware, userInfoMiddleware } = require("./auth-handler");
const asyncWrapperMiddleware = require("./async-wrapper");
const errorHandlerMiddleware = require("./error-handler");
const notFoundMiddleware = require("./not-found");

module.exports = {
	authHandlerMiddleware,
	asyncWrapperMiddleware,
	errorHandlerMiddleware,
	notFoundMiddleware,
	userInfoMiddleware,
};
