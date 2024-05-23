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

// add an inventory item
const add = async (req, res) => {
  try {
    const { warehouse_id, item_name, description, category, status, quantity } =
      req.body;

    // check if fields are empty
    if (
      !warehouse_id ||
      !item_name ||
      !description ||
      !category ||
      !status ||
      quantity === undefined
    ) {
      return res.status(400).json({ message: "Missing some data in request" });
    }

    // check if warehouse id exists
    const warehouseExist = await knex("warehouses").where({ id: warehouse_id });
    if (!warehouseExist) {
      return res.status(400).json({ message: "Invalid warehouse id" });
    }

    // check if quantity is not a number
    if (isNaN(quantity)) {
      return res.status(400).json({ message: "quantity must be a number" });
    }

    const [newItemId] = await knex("inventories").insert(req.body);

    const newItem = {
      id: newItemId,
      warehouse_id,
      item_name,
      description,
      category,
      status,
      quantity,
    };

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Unable to create new item" });
  }
};

module.exports = {
  index,
  findOne,
  add,
};
