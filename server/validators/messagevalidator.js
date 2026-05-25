import { body, validationResult } from "express-validator";

export const validateMessage = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required")
    .isLength({ min: 2 }).withMessage("First name must be at least 2 characters"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid")
    .normalizeEmail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];