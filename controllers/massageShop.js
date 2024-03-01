const MassageShop = require("../model/MassageShop");

exports.getMassageShops = async (req, res, next) => {
	try {
		return res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

exports.getMassageShop = async (req, res, next) => {
	try {
		return res.status(200).json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

exports.createMassageShop = async (req, res, next) => {
	try {
		return res.status(201).json({ success: true });
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

exports.updateMassageShop = async (req, res, next) => {
    try {
        return res.status(200).json({success: true});
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false});
    }
}

exports.deleteMassageShop = async (req, res, next) => {
    try {
        return res.status(200).json({success: true});
    } catch (err) {
        console.log(err);
        return res.status(400).json({success: false});
    }
}