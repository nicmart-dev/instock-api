//WAREHOUSE CONTROLLERS

const knex = require("knex")(require("../knexfile"));
const { validationResult } = require("express-validator");

// get all warehouse items
const index = async (_req, res) => {
  try {
    const items = await knex("warehouses").select(
      "id",
      "warehouse_name",
      "address",
      "city",
      "country",
      "contact_name",
      "contact_position",
      "contact_phone",
      "contact_email"
    );
    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error retrieving warehouse items.");
  }
};

// get a single warehouse
const getWarehouseById = async (req, res) => {
  try {
    console.log("Finding warehouse with ID:", req.params.id);
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      console.log("Warehouse not found");
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    console.log("Found warehouse:", warehouse);
    res.status(200).json(warehouse);
  } catch (error) {
    console.error("Error fetching warehouse details:", error);
    res.status(500).json({
      message: `Unable to fetch warehouse details: ${error}`,
    });
  }
};

const remove = async (req, res) => {
  try {
    console.log("Finding id: ", req.params.id);
    const warehouseDeleted = await knex("warehouses")
      .where({ id: req.params.id })
      .delete();

    if (warehouseDeleted === 0) {
      console.log("not found");
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    console.log("Deleted ID: ", req.params.id);
    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

const inventory = async (req, res) => {
  try {
    const posts = await knex("warehouses")
      .join("inventories", "inventories.warehouse_id", "warehouses.id")
      .where({ warehouse_id: req.params.id })
      .select(
        "inventories.id",
        "inventories.item_name",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: `Unable inventory of warehouse ID ${req.params.id}: ${error}`,
    });
  }
};

// add a new warehouse
const addWarehouse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
    created_at,
    updated_at,
  } = req.body;

  try {
    const [insertId] = await knex("warehouses").insert({
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
      created_at: created_at || new Date(),
      updated_at: updated_at || new Date(),
    });
    // .returning("*");

    const newWarehouse = await knex("warehouses")
      .where({ id: insertId })
      .first();

    res.status(201).json(newWarehouse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  remove,
  inventory,
  index,
  getWarehouseById,
  addWarehouse,
};
