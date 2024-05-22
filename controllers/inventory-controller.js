const knex = require("knex")(require("../knexfile"));

// get all inventory items
const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (err) {
    console.log(err)
    res.status(400).send("Error retrieving inventory items.");
  }
};

module.exports = {
  index,
};
