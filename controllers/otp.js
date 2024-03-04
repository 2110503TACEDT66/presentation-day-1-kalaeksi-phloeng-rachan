const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");
const dotenv = require("dotenv");
const User = require("../models/User");
const OtpData = require("../models/Otp");


dotenv.config({ path: "../config/config.env" });

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

const twilioClient = new twilio(accountSid, authToken, {});

//@desc		Send otp password
//@route	/otp/sendOtp
//@access	Public
exports.sendOtp = async (phoneNumber) => {
	try {
		const otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			specialChars: false,
			lowerCaseAlphabets: false,
		});
		// สร้าง OTP ในฐานข้อมูล
		await Otp.findOneAndUpdate(
			{ phoneNumber: phoneNumber }, // filter
			{ otp: otp, createdAt: Date.now()}, // update
			{ upsert: true, new: true, setDefaultOnInsert: true } // option
		);

		await twilioClient.messages.create({
			body: `Your OTP is ${otp}`,
			to: "+66918683540",
			from: "+17572510266",
		});
		
	} catch (err) {
		console.error(err);
	}
};

//@desc		Verify otp password
//@route	/otp/verify
//@access	Private
exports.verify = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		const otp = await OtpData.findOne({
			phoneNumber: user.tel,
			otp: req.body.otp
		});
		
        if(!otp){
            return res.status(400).json({
                success: false,
                message: "Wrong Otp"
            })
        }
		
		// Check createdAt time
		if (otp.createdAt < new Date(new Date().getTime() - 5 * 60 * 1)) {
			return res.status(400).json({
				success: false,
				messaeg: "Otp timed out"
			})
		}

        await user.updateOne({role: 'user'});
		return res.status(200).json({
			success: true,
			// data: user
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};
