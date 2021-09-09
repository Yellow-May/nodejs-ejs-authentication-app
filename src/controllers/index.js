const {
	GET_HOME_PAGE,
	GET_DASHBOARD_PAGE,
	GET_SIGN_UP_PAGE,
	GET_LOGIN_PAGE,
} = require("./page-requests");
const { POST_SIGN_UP, POST_LOGIN, LOGOUT } = require("./auth-requests");

module.exports = {
	GET_HOME_PAGE,
	GET_DASHBOARD_PAGE,
	GET_SIGN_UP_PAGE,
	GET_LOGIN_PAGE,
	POST_SIGN_UP,
	POST_LOGIN,
	LOGOUT,
};
