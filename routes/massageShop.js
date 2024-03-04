/**
 * @LapisBerry
 * 2024 MAR 3 03:12:00 AM
 * Everything looks like our lab except "Swagger"
 * 
 * >> Unnecessary things
 * 		in our lab we use require("../controllers/hospitals")
 * 		Should we use require("../controllers/massageShops") too?
 * 		(We don't have to. It's unnecessary)
 */
const express = require("express");
const reservations = require("./reservations");
const reviews = require("./reviews")
const {
	getMassageShops,
	getMassageShop,
	createMassageShop,
	updateMassageShop,
	deleteMassageShop,
} = require("../controllers/massageShop");

const router = express.Router();
const {protect, authorize} = require("../middleware/auth");

router.use("/:massageShopId/reservations", reservations);
router.use("/:massageShopId/reviews", reviews);

router.route("/").get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route("/:id").get(getMassageShop).put(protect, authorize('admin'), updateMassageShop).delete(protect, authorize('admin'), deleteMassageShop);

module.exports = router;
