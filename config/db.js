/**
 * @LapisBerry
 * 2024 MAR 3 03:23:00 AM
 * All Clear
 */
const mongoose = require("mongoose");

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host}`);
}

module.exports = connectDB;
