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
        default: Date.now
    }
});

module.exports=mongoose.model('Otp', OtpSchema);

