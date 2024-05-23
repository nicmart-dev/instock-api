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

module.exports = {
    index,
    findOne,
    remove,
};
