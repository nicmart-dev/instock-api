const router = require("express").Router();
const warehouseController = require("../controllers/warehouse-controller");

require('dotenv').config(); 
const { PORT, BACKEND_URL, NODE_ENV } = process.env; 

router.route("/").get(warehouseController.index);

module.exports = router;
