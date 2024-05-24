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
      .join("warehouses", "warehouses.id", "inventories.warehouse_id") // warehouse id from inventory table
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
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

// update an inventory item
const update = async (req, res) => {
  try {
    const updatedRows = await knex("inventories")
      .where({ id: req.params.id })
      .update({
        item_name: req.body.item_name,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        quantity: req.body.quantity,
        warehouse_id: req.body.warehouse_id
      });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select(
        "inventories.id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      )
      .where({ "inventories.id": req.params.id })
      .first();

    res.status(200).json(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error updating inventory item.");
  }
};

module.exports = {
  index,
  findOne,
  update,
};
