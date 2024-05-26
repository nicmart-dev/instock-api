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
        res.status(404).send(
            `Error retrieving inventory item with id ${req.params.id}`
        );
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
                warehouse_id: req.body.warehouse_id,
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
const remove = async (req, res) => {
    try {
        console.log(`Attempting to remove id: ${req.params.id}`);
        const item = await knex("inventories")
            .where({ id: req.params.id })
            .delete();

        if (item === 0) {
            return res.status(404).json({
                message: `Inventory with ID ${req.params.id} not found`,
            });
        }

        console.log(`Successfully removed id: ${req.params.id}`);
        // No Content response
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete inventory with ID ${req.params.id}: ${error}`,
        });
    }
};

// add an inventory item
const add = async (req, res) => {
    try {
        const {
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity,
        } = req.body;

        // check if fields are empty
        if (
            !warehouse_id ||
            !item_name ||
            !description ||
            !category ||
            !status ||
            quantity === undefined
        ) {
            return res
                .status(400)
                .json({ message: "Missing some data in request" });
        }

        // check if warehouse id exists
        const warehouseExist = await knex("warehouses").where({
            id: warehouse_id,
        });
        if (warehouseExist.length === 0) {
            return res.status(400).json({ message: "Invalid warehouse id" });
        }

        // check if quantity is not a number
        if (isNaN(quantity)) {
            return res
                .status(400)
                .json({ message: "quantity must be a number" });
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
    update,
    remove,
    add,
};
