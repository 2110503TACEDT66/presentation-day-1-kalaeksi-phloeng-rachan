const Review = require('../models/Review');
const MassageShop = require('../models/MassageShop');

//@desc    Get all reviews
//@route   GET /reviews
//@access  Public
exports.getReviews=async (req,res,next)=>{
    let query;
    if (req.params.massageShopId){  
        console.log(req.params.massageShopId);
        query = Review.find({massageShop: req.params.massageShopId }).populate({
            path: 'massageShop',
            select: 'name address telephone'
        }).populate({
            path: 'user',
            select: 'name'
        });
    } else if(req.user.role !== 'admin'){
        query = Review.find({user: req.user.id}).populate({
            path: 'massageShop',
            select: 'name address telephone'
        }).populate({
            path: 'user',
            select: 'name'
        });
    } else {
        query = Review.find().populate({
            path: 'massageShop',
            select: 'name address telephone'
        }).populate({
            path: 'user',
            select: 'name'
        });
    }


    try {
        const reviews= await query;
        res.status(200).json({
            success:true,
            count:reviews.length,
            data:reviews
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot find Review"});
    }
};

//@desc    Get single review
//@route   GET /reviews/:id
//@access  Public
exports.getReview = async (req, res, next) => {
    try {
        const review= await Review.findById(req.params.id).populate({
            path: 'massageShop',
            select: 'name description telephone'
        });

        if(!review) {
            return res.status(404).json({success:false,message:`No review with the id of ${req.params.id}`});
        }

        res.status(200).json({
            success:true,
            data: review
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot find Review"});
    }
};

//desc    Add review
//route   POST /massageShops/:massageShopId/review
//access  Private
exports.addReview=async (req,res,next)=>{
    try {
        req.body.massageShop=req.params.massageShopId;
        
        const massageShop= await MassageShop.findById(req.params.massageShopId);
        
        if(!massageShop){
            return res.status(404).json({success:false,message:`No massageShop with the id of ${req.params.massageShopId}`});
        }
        
		// add user Id to req.body
		req.body.user = req.user.id;

		// Check for existed review
		const existedReviews = await Review.find({user:req.user.id});

		// If the user is not an admin, they can only create 3 reviews.
		if (existedReviews.length >= 3 && req.user.role !== 'admin') {
			return res.status(400).json({success: false, message: `The user with ID ${req.user.id} has already made 3 reviews`});
		}

        const review = await Review.create(req.body);
        
        res.status(200).json({
            success:true,
            data: review
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot create Review"});
    }
}

//@desc    Update review
//@route   PUT /reviews/:id
//@access  Private
exports.updateReview = async (req, res, next) => {
    try {
        let review = await Review.findById(req.params.id);

        if(!review){
            return res.status(404).json({success: false, message: `No review with the id of ${req.params.id}`});
        }

		// Make sure user is the review owner
		if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
			return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to update this  review`});
		}

        review = await Review.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({success:false,message:"Cannot update Review"});
    }
}

//@desc		Delete review
//@route	DELETE /reviews/:id
//@access	Private
exports.deleteReview=async (req,res,next)=>{
    try {
        const review= await Review.findById(req.params.id);
        
        if(!review){
            return res.status(404).json({success:false,message: `No review with the id of ${req.params.id}`});
        }

		// Make sure user is the review owner
		if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
			return res.status(401).json({success: false, message: `User ${req.user.id} is not authorized to delete this review`});
		}

        await review.deleteOne();
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot delete Review"})
    }
}
