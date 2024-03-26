/**
 * @LapisBerry
 * 2024 MAR 3 03:44:00 AM
 * All Clear
 */
const mongoose = require('mongoose');

const ReservationSchema=new mongoose.Schema({
    pickupDate: {
        type: String,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phoneNumber:{
        type: String,
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

module.exports=mongoose.model('Reservation', ReservationSchema);
