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

router.use("/:massageShopId/reservations", reservations);

router.route("/").get(getMassageShops).post(createMassageShop);
router.route("/:id").get(getMassageShop).put(updateMassageShop).delete(deleteMassageShop);

module.exports = router;
