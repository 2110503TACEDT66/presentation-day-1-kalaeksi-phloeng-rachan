const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config({path: "./config/config.env"});

connectDB();

const app = express();
app.use(express.json());

const MassageShop = require("./routes/massageShop");
const reservations = require("./routes/reservations");
const Auth = require("./routes/auth");

app.use("/MassageShops", MassageShop);
app.use("/reservations", reservations)
app.use("/auth", Auth);

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