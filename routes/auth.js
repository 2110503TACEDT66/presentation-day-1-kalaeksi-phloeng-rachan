/**
 * @LapisBerry
 * 2024 MAR 3 02:50:00 AM
 * All Clear
 */
const express = require('express');
const {register, login, getMe, logout} = require('../controllers/auth');
const router = express.Router();
const {protect} = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;