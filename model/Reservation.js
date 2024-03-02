const mongoose = require('mongoose');

const ReservationSchema=new mongoose.Schema({
    reserveDate: {
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

module.exports=mongoose.model('Reservation', ReservationSchema);
