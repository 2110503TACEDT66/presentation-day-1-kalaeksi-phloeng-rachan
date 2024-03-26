/**
 * @LapisBerry
 * 2024 MAR 3 04:15:00 AM
 * All Clear
 */
const User = require('../models/User');
const {sendOtp} = require('./otp');

//@desc    Register user
//@route   POST /auth/register
//@access  Public
exports.register = async (req,res,next) => {
    try{
        let {name,tel, email, password, role} = req.body;
        
        // tel = "+66" + tel.substring(1);
        // Create User
        const user = await User.create({
            name,
            tel,
            email,
            password,
            role,
        });
        // sendOtp(tel);
        // Create token
        sendTokenResponse(user,200,res);
    } catch(err){
        res.status(400).json({success: false});
        console.log(err.stack);
    }
}

//@desc     Login user
//@route    POST /auth/login
//@access   Public
exports.login = async(req,res,next) =>{
    try{
        const {email, password} = req.body;

        // Validate email & password
        if(!email || !password){
            return res.status(400).json({success:false, msg:'Please provide an email and password'});
        }

        // Check for user
        const user = await User.findOne({email}).select('+password');
        if(!user){
            return res.status(400).json({success:false, msg: 'Invalid credentials'});
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(401).json({success:false, msg: 'Invalid credentials'});
        }

        // Create token
        sendTokenResponse(user,200,res);

    } catch(err){
        return res.status(401).json({success: false , msg: 'Cannot convert email or password to string'});
    }
}

//@desc     Get current logged in user
//@route    POST /auth/me
//@access   Private
exports.getMe = async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({success: true, data: user });
}

//@desc     Log user out / clear cookie
//@route    GET /auth/logout
//@access   Private
exports.logout = async(req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    });
    
    res.status(200).json({
        success: true,
        data: {}
    });
}

// Get token from model, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires : new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly : true
    };
    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}