const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const {xss} = require('express-xss-sanitizer');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

dotenv.config({path: "./config/config.env"});

connectDB();

const app = express();

app.use(express.json());

//route file
const MassageShop = require("./routes/massageShop");
const reservations = require("./routes/reservations");
const Auth = require("./routes/auth");

//cookie parser
app.use(cookieParser());

//sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

//prevent XSS attacks
app.use(xss());

//rate limiting
const limiter = rateLimit({
    windowsMs : 10*60*1000, //10 mins
    max : 500
});
app.use(limiter);

//prevent http param pollutions
app.use(hpp());

//Enable CORS
app.use(cors());

app.use("/MassageShops", MassageShop);
app.use("/reservations", reservations)
app.use("/auth", Auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(
	PORT,console.log("Server running in ",process.env.NODE_ENV," mode on port ",PORT));

process.on("unhandledRejection", (err, promise) => {
	console.log(err.message);
	server.close(() => process.exit(1));
});