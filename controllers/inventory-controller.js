const knex = require("knex")(require("../knexfile"));

// get all inventory items
const index = async (_req, res) => {
  try {
    const items = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error retrieving inventory items.");
  }
};

// get an inventory item
const findOne = async (req, res) => {
  try {
    // call for item
    const item = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select("inventories.*", "warehouses.warehouse_name")
      .where({ "inventories.id": req.params.id })
      .first();

    // check if item exists
    if (!item) {
      return res.send("error getting the item:", req.params.id);
    }

    // successful response call
    res.status(200).json(item);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send(`Error retrieving inventory item with id ${req.params.id}`);
  }
};

module.exports = {
  index,
  findOne,
};
