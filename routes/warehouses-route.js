// routes/warehouses-route.js
const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");

require("dotenv").config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env

router.route("/").get(warehouseController.index);

router
  .route("/:id")
  .get(warehouseController.getWarehouseById)
  .delete(warehouseController.remove);

router.route("/:id/inventory").get(warehouseController.inventory);

module.exports = router;
