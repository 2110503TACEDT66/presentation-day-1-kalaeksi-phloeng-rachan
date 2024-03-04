const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const dotenv = require("dotenv");
const User = require("../models/User");
const OtpData = require("../models/Otp");

dotenv.config({ path: "../config/config.env" });

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

exports.sendOtp = async (phoneNumber) => {
	try {
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
			lowerCaseAlphabets: false,
		});

		await Otp.findOneAndUpdate(
			{ phoneNumber: phoneNumber },
			{ otp: otp },
			{ upsert: true, new: true, setDefaultOnInsert: true }
		);
		await twilioClient.messages.create({
			body: `Your OTP is ${otp}`,
			to: "+66918683540",
			from: "+17572510266",
		});
	} catch (err) {
		console.log(err);
	}
};

exports.verify = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		const otp = await OtpData.findOne({
			phoneNumber: user.tel,
			otp: req.body.otp,
		});
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "Wrong Otp"
            })
        }

        await user.updateOne({role: 'user'});
		return res.status(200).json({
			success: true,
			// data: user
		});
	} catch (err) {
		return res.status(400);
	}
};
