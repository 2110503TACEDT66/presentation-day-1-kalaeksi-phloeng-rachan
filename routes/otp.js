const express = require('express');
const {sendOtp} = require('../controllers/otp');
const router = express.Router();
const {protect} = require('../middleware/auth');

router.post('/sendOtp', sendOtp);

module.exports = router;