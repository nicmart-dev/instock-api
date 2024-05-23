//WAREHOUSE CONTROLLERS

const knex = require('knex')(require('../knexfile'));

const remove = async (req, res) => {
    try {
        console.log('Finding id: ', req.params.id);
        const warehouseDeleted = await knex('warehouses')
            .where({ id: req.params.id })
            .delete();

        if (warehouseDeleted === 0) {
            console.log('not found');
            return res.status(404).json({
                message: `Warehouse with ID ${req.params.id} not found`,
            });
        }
        console.log('Deleted ID: ', req.params.id);
        // No Content response
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete user: ${error}`,
        });
    }
};

const inventories = async (req, res) => {
    try {
        const posts = await knex('warehouses')
            .join('inventories', 'inventories.warehouse_id', 'warehouses.id')
            .where({ warehouse_id: req.params.id })
            .select(
                'inventories.id',
                'inventories.item_name',
                'inventories.category',
                'inventories.status',
                'inventories.quantity'
            );

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({
            message: `Unable inventory of warehouse ID ${req.params.id}: ${error}`,
        });
    }
};

module.exports = {
    remove,
    inventories,
};
