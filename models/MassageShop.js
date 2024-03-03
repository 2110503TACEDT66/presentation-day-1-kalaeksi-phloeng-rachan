const mongoose = require("mongoose");

const MassageShopSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please add a name"],
        trim: true,
    },
    address: {
        type: String,
        require: [true, "Please add a address"],
    },
    tel: {
        type: String,
        required: [true, "Please add a tel"],
        match: [/^\d+$/, "Tel must only contain digits"],
        minlength: [10, "Tel must have 10 digits"],
        maxlength: [10, "Tel must have 10 digits"]
        
    },
    open: {
        type: Date,
        require: [true, "Please add a open time"],
    },
    close: {
        type: Date,
        require: [true, "Please add a close time"],
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

MassageShopSchema.pre('deleteOne', { document: true, query: false }, async function(next){
    console.log(`Reservations being removed from massageShop ${this._id}`);
    await this.model('Reservation').deleteMany({massageShop: this._id});
    next();
});

MassageShopSchema.virtual('reservations', {
    ref: 'Reservation',
    localField: '_id',
    foreignField: 'massageShop',
    justOne: false
});

module.exports = mongoose.model("MassageShop", MassageShopSchema);