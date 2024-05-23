const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controller');

require('dotenv').config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env

router.route('/').get(warehouseController.index);

router.route('/:id').delete(warehouseController.remove);

router.route('/:id/warehouses').get(warehouseController.inventory);

module.exports = router;
