const express = require("express");
const router = express.Router();

require('dotenv').config(); // Ensure environment variables are available
const { PORT, BACKEND_URL, NODE_ENV } = process.env; // Destructure process.env


module.exports = router;
