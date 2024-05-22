const express = require('express');
const router = express.Router();
const warehouseController = require('../controllers/warehouse-controllers');

require('dotenv').config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env

router.route('/:id').delete(warehouseController.remove);

module.exports = router;
