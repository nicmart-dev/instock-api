const knex = require("knex")(require("../knexfile"));

// get all inventory items
const index = async (_req, res) => {
  try {
    const items = await knex("inventories").join("warehouses", "warehouses.id", "inventories.warehouse_id").select("inventories.id", "warehouses.warehouse_name", "inventories.item_name", "inventories.description", "inventories.category", "inventories.status", "inventories.quantity");
    res.status(200).json(items);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error retrieving inventory items.");
  }
};



module.exports = {
  index,
};
