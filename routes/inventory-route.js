const router = require('express').Router();
const inventoryController = require('../controllers/inventory-controller');

require("dotenv").config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env

router.route("/").get(inventoryController.index);

router.route("/:id").get(inventoryController.findOne);

router.route("/:id").put(inventoryController.update); // Add the PUT route

module.exports = router;
