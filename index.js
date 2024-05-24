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

app.get('/api/inventory/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const foundItem = inventory.find(item => item.id === id);
    if (foundItem) {
      res.json(foundItem);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
