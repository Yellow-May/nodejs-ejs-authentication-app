const GET_HOME_PAGE = (_req, res) => {
	const locales = { active: "home", title: "Home" };
	res.render("index", locales);
};

const GET_DASHBOARD_PAGE = (_req, res) => {
	const locales = { active: "dashboard", title: "Dashboard" };
	res.render("dashboard", locales);
};

const GET_SIGN_UP_PAGE = (_req, res) => {
	const locales = { layout: "layout/auth", title: "Sign Up" };
	res.render("signup", locales);
};

const GET_LOGIN_PAGE = (_req, res) => {
	const locales = { layout: "layout/auth", title: "Log in" };
	res.render("login", locales);
};

module.exports = {
	GET_HOME_PAGE,
	GET_DASHBOARD_PAGE,
	GET_SIGN_UP_PAGE,
	GET_LOGIN_PAGE,
};
