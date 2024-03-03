const express = require("express");
const reservations = require("./reservations");
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

router.route("/").get(getMassageShops).post(protect, authorize('admin'), createMassageShop);
router.route("/:id").get(getMassageShop).put(protect, authorize('admin'), updateMassageShop).delete(protect, authorize('admin'), deleteMassageShop);

module.exports = router;
