import { body, validationResult } from "express-validator";

export const createNewsValidator = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

  body("content")
    .notEmpty().withMessage("Content is required")
    .isString().withMessage("Content must be a string")
    .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),

  body("date")
    .optional()
    .isDate().withMessage("Date is not valid"),

  // check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const updateNewsValidator = [
  body("title")
    .optional()
    .isString().withMessage("Title must be a string")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

  body("content")
    .optional()
    .isString().withMessage("Content must be a string")
    .isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),

  body("date")
    .optional()
    .isDate().withMessage("Date is not valid"),

  body("published")
    .optional()
    .isBoolean().withMessage("Published must be true or false"),

  // check errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];