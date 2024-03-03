const express = require('express');

const {getReviews, getReview, addReview, updateReview, deleteReview} = require('../controllers/review');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/').get(protect, getReviews).post(protect, authorize('admin', 'user'), addReview);
router.route('/:id').get(protect, getReview).put(protect, authorize('admin', 'user'), updateReview).delete(protect, authorize('admin', 'user'), deleteReview);

module.exports=router;