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
});

module.exports=mongoose.model('Otp', OtpSchema);

