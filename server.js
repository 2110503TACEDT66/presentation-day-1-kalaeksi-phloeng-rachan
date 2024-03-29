/**
 * @LapisBerry
 * 2024 MAR 3 02:01:00 AM
 * Everything looks like our lab except "Swagger"
 */
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
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const bodyParser = require("body-parser");


// Load env vars
dotenv.config({path: "./config/config.env"});

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Route file
const MassageShop = require("./routes/massageShop");
const reservations = require("./routes/reservations");
const Auth = require("./routes/auth");
const Review = require("./routes/reviews");
const Otp = require("./routes/otp")

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowsMs : 10*60*1000, //10 mins
    max : 500
});
app.use(limiter);

// Prevent http param pollutions
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("/api/massageShops", MassageShop);
app.use("/api/reservations", reservations)
app.use("/api/auth", Auth);
app.use("/api/review", Review);
app.use("/api/otp", Otp);


const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(
    "Server running in "
, process.env.NODE_ENV,
 "on "+ process.env.HOST + ":" + PORT));



process.on("unhandledRejection", (err, promise) => {
	console.log(err.message);
	server.close(() => process.exit(1));
});