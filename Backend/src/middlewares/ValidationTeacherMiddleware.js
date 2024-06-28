const { body, validationResult } = require("express-validator");

const validateTeacher = [
  body("username").isString().withMessage("Username must be a string"),
  body("role")
    .isIn(["Full-Time", "Half-Time"])
    .withMessage("Role must be either Full-Time or Half-Time"),
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string"),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string"),
  body("dob")
    .optional()
    .isDate()
    .withMessage("Date of birth must be a valid date"),
  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either Male or Female"),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),
  body("address.city")
    .optional()
    .isString()
    .withMessage("City must be a string"),
  body("address.state")
    .optional()
    .isString()
    .withMessage("State must be a string"),
  body("address.zip")
    .optional()
    .isString()
    .withMessage("ZIP code must be a string"),
  body("subjects")
    .optional()
    .isArray()
    .withMessage("Subjects must be an array of strings"),
  body("experience")
    .optional()
    .isNumeric()
    .withMessage("Experience must be a number"),
  body("qualifications")
    .optional()
    .isArray()
    .withMessage("Qualifications must be an array of strings"),
  body("hireDate")
    .optional()
    .isDate()
    .withMessage("Hire date must be a valid date"),
  body("salary").optional().isNumeric().withMessage("Salary must be a number"),
  body("NumberOfHours")
    .optional()
    .isNumeric()
    .withMessage("Number of hours must be a number"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateAvailability = [
  body("dayOfWeek")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ])
    .withMessage("Day of week must be a valid day"),
  body("availabilitySlots")
    .isArray()
    .withMessage("Availability slots must be an array"),
  body("availabilitySlots.*.startTime")
    .isString()
    .withMessage("Start time must be a string"),
  body("availabilitySlots.*.endTime")
    .isString()
    .withMessage("End time must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateTeacher,
  validateAvailability,
};
