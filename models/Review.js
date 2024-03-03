const { text } = require('express');
const mongoose = require('mongoose');

const ReviewSchema=new mongoose.Schema({
    reviewPoint: {
        type: Number,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
        maxlength: 50,
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
