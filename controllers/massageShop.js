/**
 * @LapisBerry
 * 2024 MAR 3 04:32:00 AM
 * All Clear
 * 
 * This commit fixed
 * - getMassageShops: edit try_catch to scoop whole thing
 * - updateMassageShop: change "throw 400" to proper thing
 */
const MassageShop = require("../models/MassageShop");

//@desc     Get all messageShops
//@route    GET /messageShops
//@access   Public
exports.getMassageShops = async (req, res, next) => {
	try {
		let query;

		// Copy req.query
		const reqQuery = { ...req.query };
		// Fields to exclude
		const removeField = ["select", "sort", "page", "limit"];

		// Loop over remove fields and delete them from reqQuery
		removeField.forEach((params) => {
			delete reqQuery[params];
		});

		// Create query string
		let queryString = JSON.stringify(reqQuery);

		// Create operators ($gt, $gte, etc)
		queryString = queryString.replace(
			/\b(gt|gte|lt|lte|in)\b/g,
			(match) => `$${match}`
		);

		// Finding resource
		query = MassageShop.find(JSON.parse(queryString)).populate('review').populate('reservations');

		// Select Fields
		if (req.query.select) {
			const fields = req.query.select.split(",").join(" ");
			query = query.select(fields);
		}
		// Sort
		if (req.query.sort) {
			const sortBy = req.query.sort.split(",").join(" ");
			query = query.sort(sortBy);
		} else query = query.sort("name");
		// Pagination
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 5;
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const total = await MassageShop.countDocuments();

		query = query.skip(startIndex).limit(endIndex);

		// Executing query
		const massageShop = await query;

		// Pagination result
		const pagination = {};
		if (endIndex < total) {
			pagination.next = {
				page: page + 1,
				limit,
			};
		}

		if (startIndex > 0) {
			pagination.prev = {
				page: page - 1,
				limit,
			};
		}

		return res.status(200).json({
				success: true,
				count: massageShop.length,
				pagination,
				data: massageShop,
			});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

//@desc     Get single messageShop
//@route    GET /messageShops/:id
//@access   Public
exports.getMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.findById(req.params.id);
		return res.status(200).json({ success: true, massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

//@desc     Create messageShop
//@route    POST /messageShops
//@access   Private [admin]
exports.createMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.create(req.body);
		return res.status(201).json({ success: true, data: massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

//@desc     Edit messageShop
//@route    PUT /messageShops/:id
//@access   Private [admin]
exports.updateMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if(!massageShop){
			return res.status(400).json({success:false});
		}
		return res.status(200).json({ success: true, data: massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

//@desc     Delete massageShop
//@route    DELETE /massageShops/:id
//@access   Private [admin]
exports.deleteMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.findById(req.params.id);
			if(!massageShop){
			throw 400;
		}
		await massageShop.deleteOne();
		return res.status(200).json({ success: true, data: {}});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};
