require("dotenv").config({ path: "config/config.env" });
const express = require("express");
const mongoose = require("mongoose");
const expressEJSLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const path = require("path");

const routes = require("./routes");
const { notFoundMiddleware, errorHandlerMiddleware, userInfoMiddleware } = require("./middlewares");

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.static(path.join(__dirname, "assets")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressEJSLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("*", userInfoMiddleware);
app.use("", routes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		app.listen(PORT, () => console.info(`Connected to Port ${PORT}`));
	} catch (err) {
		console.info(err);
		process.exit(1);
	}
};

start();
