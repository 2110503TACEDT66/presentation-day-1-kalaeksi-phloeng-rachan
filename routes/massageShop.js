const express = require("express");
const {
	getMassageShops,
	getMassageShop,
	createMassageShop,
	updateMassageShop,
	deleteMassageShop,
} = require("../controllers/massageShop");

const router = express.Router();

router.route("/").get(getMassageShops).post(createMassageShop);
router.route("/:id").get(getMassageShop).put(updateMassageShop).delete(deleteMassageShop);

module.exports = router;
