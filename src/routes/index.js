const router = require("express").Router();
const {
	GET_HOME_PAGE,
	GET_DASHBOARD_PAGE,
	GET_SIGN_UP_PAGE,
	GET_LOGIN_PAGE,
	POST_SIGN_UP,
	POST_LOGIN,
	LOGOUT,
} = require("../controllers");
const { authHandlerMiddleware } = require("../middlewares");

router.route("").get(GET_HOME_PAGE);

router.route("/dashboard").get(authHandlerMiddleware, GET_DASHBOARD_PAGE);

router.route("/signup").get(GET_SIGN_UP_PAGE).post(POST_SIGN_UP);

router.route("/login").get(GET_LOGIN_PAGE).post(POST_LOGIN);

router.route("/logout").get(LOGOUT);

module.exports = router;
