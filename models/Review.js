const mongoose = require('mongoose');

const ReviewSchema=new mongoose.Schema({
    reviewPoint: {
        type: Number,
        min: 0,
        max: 5,
    },
    reviewDate: {
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    massageShop:{
        type:mongoose.Schema.ObjectId,
        ref: 'MassageShop',
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Review', ReviewSchema);
