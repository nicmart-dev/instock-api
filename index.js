const express = require('express');
const app = express();

const cors = require('cors');
const inventoryRoute = require('./routes/inventory-route');
const warehousesRoute = require('./routes/warehouses-route');
require('dotenv').config(); // load environment variables from a .env file into process.env

const { PORT } = process.env; // destructuring assignment of PORT from process.env

// middleware
app.use(express.json()); // parses incoming requests specifically req.body
app.use(cors()); // allow * / all to access our api. All domains, ips, ports


app.use('/api/warehouses', warehousesRoute);
app.use('/api/inventory', inventoryRoute);

app.get('/', (_req, res) => {
    res.send('<h1>Welcome to the InStock API server!</h1>');
});

// boots up the server and listens on a specified port number
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
