/**
 * @LapisBerry
 * 2024 MAR 3 03:29:00 AM
 * Should we add maxlength to name
 * 
 * This commit fixed
 * - fix typo
 * - turn sentence into more popular one
 */
const mongoose = require("mongoose");

const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"],
        trim: true,
        //maxlength: [50, 'Name can not be more than 50 characters']//@LapisBerry
    },
    address: {
        type: String,
        require: [true, "Please add an address"],
    },
    tel: {
        type: String,
        required: [true, "Please add a tel"],
        match: [/^\d+$/, "Tel must contain only digits"],
        minlength: [10, "Tel must have 10 digits"],
        maxlength: [10, "Tel must have 10 digits"]
        
    },
    open: {
        type: Date,
        require: [true, "Please add an opening time"],
    },
    close: {
        type: Date,
        require: [true, "Please add a closing time"],
    },
    picture: {
        type: String,
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// Cascade delete reservations when a messageShop is deleted
MassageShopSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    console.log(`Reservations being removed from massageShop ${this._id}`);
    await this.model('Reservation').deleteMany({massageShop: this._id});
    next();
});

MassageShopSchema.virtual('review', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'massageShop',
    justOne: false
});

// Reverse populate with virtuals
MassageShopSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'massageShop',
    justOne: false
});



module.exports = mongoose.model("MassageShop", MassageShopSchema);