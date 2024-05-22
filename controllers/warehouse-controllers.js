//WAREHOUSE CONTROLLERS

const knex = require('knex')(require('../knexfile'));

const remove = async (req, res) => {
    try {
        console.log('deleting id: ', req.params.id);
        const rowsDeleted = await knex('warehouses')
            .where({ id: req.params.id })
            .delete();

        if (rowsDeleted === 0) {
            console.log('not found');
            return res
                .status(404)
                .json({ message: `User with ID ${req.params.id} not found` });
        }

        // No Content response
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Unable to delete user: ${error}`,
        });
    }
};

module.exports = {
    remove,
};
