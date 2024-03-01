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
    telephone: {
        type: String,
        require: [true, "Please add a telephone"],
    },
    open: {
        type: Date,
        require: [true, "Please add a open time"],
    },
    close: {
        type: Date,
        require: [true, "Please add a close time"],
    }
});

module.exports = mongoose.model("MassageShop", MassageShopSchema);