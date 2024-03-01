const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,
	console.log(
		"Server running in ",
		process.env.NODE_ENV,
		" mode on port ",
		PORT
	)
);

process.on("unhandledRejection", (err, promise) => {
	console.log(err.message);
	server.close(() => process.exit(1));
});