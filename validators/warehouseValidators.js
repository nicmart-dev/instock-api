const { body } = require("express-validator");

const warehouseValidationRules = [
  body("warehouse_name").notEmpty().withMessage("Warehouse name is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("contact_name").notEmpty().withMessage("Contact name is required"),
  body("contact_position")
    .notEmpty()
    .withMessage("Contact position is required"),
  body("contact_phone")
    .notEmpty()
    .isNumeric()
    .withMessage("Valid phone number is required"),
  body("contact_email")
    .notEmpty()
    .isEmail()
    .withMessage("Valid email is required"),
];

module.exports = { warehouseValidationRules };
