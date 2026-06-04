import { body, validationResult } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid")
    .customSanitizer(val => val.replace(/[${}]/g, "")), // ✅ removes NoSQL injection chars

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  // check if there are errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];