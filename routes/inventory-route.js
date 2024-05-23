const router = require("express").Router();
const inventoryController = require("../controllers/inventory-controller");

require("dotenv").config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env

router.route("/").get(inventoryController.index).post(inventoryController.add);

router.route("/:id").get(inventoryController.findOne); // get single inventory item

module.exports = router;
