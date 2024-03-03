/**
 * @LapisBerry
 * 2024 MAR 3 03:16:00
 * All Clear
 */
const express = require('express');

const {
    getReservations,
    getReservation,
    addReservation,
    updateReservation,
    deleteReservation
} = require('../controllers/reservations');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getReservations).post(protect, authorize('admin', 'user'), addReservation);
router.route('/:id').get(protect, getReservation).put(protect, authorize('admin', 'user'), updateReservation).delete(protect, authorize('admin', 'user'), deleteReservation);

module.exports=router;