const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		require: true,
	},
    otp: {
        type: String,
		require: true,
    },
	createdAt: {
        type: Date,
        default: Date.now,
        expires: 120 // ข้อมูล OTP จะหมดอายุหลังจาก 2 นาที
    }
});

module.exports=mongoose.model('Otp', OtpSchema);

