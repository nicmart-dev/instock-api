const { body } = require("express-validator");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

const isPhoneNumberValid = (phoneNumber) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "US");
  return parsedPhoneNumber && parsedPhoneNumber.isValid();
};

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
    .withMessage("Phone number is required")
    .custom((value) => isPhoneNumberValid(value))
    .withMessage("Valid phone number is required"),
  body("contact_email")
    .notEmpty()
    .isEmail()
    .withMessage("Valid email is required"),
];

module.exports = { warehouseValidationRules };
