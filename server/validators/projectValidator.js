import { body, validationResult } from "express-validator";

export const createProjectValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

  body("location")
    .notEmpty().withMessage("Location is required")
    .isString().withMessage("Location must be a string"),

  body("description")
    .notEmpty().withMessage("Description is required")
    .isString().withMessage("Description must be a string"),

  body("year")
    .notEmpty().withMessage("Year is required")
    .isNumeric().withMessage("Year must be a number")
    .isInt({ min: 1900, max: 2100 }).withMessage("Year is not valid"),

  // check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateProjectValidator = [
  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

  body("location")
    .optional()
    .isString().withMessage("Location must be a string"),

  body("description")
    .optional()
    .isString().withMessage("Description must be a string"),

  body("year")
    .optional()
    .isNumeric().withMessage("Year must be a number")
    .isInt({ min: 1900, max: 2100 }).withMessage("Year is not valid"),


  // check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];