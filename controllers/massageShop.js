const MassageShop = require("../models/MassageShop");

exports.getMassageShops = async (req, res, next) => {
	let query;

	const reqQuery = { ...req.query };
	const removeField = ["select", "sort", "page", "limit"];

	removeField.forEach((params) => {
		delete reqQuery[params];
	});

	let queryString = JSON.stringify(reqQuery);
	queryString = queryString.replace(
		/\b(gt|gte|lt|lte|in)\b/g,
		(match) => `$${match}`
	);

	query = MassageShop.find(JSON.parse(queryString)).populate('reservations');

	if (req.query.select) {
		const fields = req.query.select.split(",").join(" ");
		query = query.select(fields);
	}

	if (req.query.sort) {
		const sortBy = req.query.sort.split(",").join(" ");
		query = query.sort(sortBy);
	} else query = query.sort("name");

	const page = parseInt(req.query.page, 10) || 1;
	const limit = parseInt(req.query.limit, 10) || 5;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const total = await MassageShop.countDocuments();

	query = query.skip(startIndex).limit(endIndex);

	try {
		const massageShop = await query;

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

		return res
			.status(200)
			.json({
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

exports.getMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.findById(req.params.id);
		return res.status(200).json({ success: true, massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

exports.createMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.create(req.body);
		return res.status(201).json({ success: true, data: massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

exports.updateMassageShop = async (req, res, next) => {
	try {
		const massageShop = await MassageShop.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if(!massageShop){
			throw 400;
		}
		return res.status(200).json({ success: true, data: massageShop});
	} catch (err) {
		console.log(err);
		return res.status(400).json({ success: false });
	}
};

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
