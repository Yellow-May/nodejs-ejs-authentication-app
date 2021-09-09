const { StatusCodes } = require("http-status-codes");

const notFound = (_req, res) => res.status(StatusCodes.NOT_FOUND).send("Route does not exist");

module.exports = notFound;
