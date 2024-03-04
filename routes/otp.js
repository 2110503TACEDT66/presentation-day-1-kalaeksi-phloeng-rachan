const express = require('express');
const {sendOtp, verify} = require('../controllers/otp');
const router = express.Router();
const {protect} = require('../middleware/auth');

router.post('/sendOtp', sendOtp);
router.post('/verify', protect, verify);

module.exports = router;