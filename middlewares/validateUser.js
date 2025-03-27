import { body, validationResult } from "express-validator";

export const validateUser = [
  body("email").optional().trim().isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("name").optional().trim().escape().isLength({ min: 2, max: 15 }).withMessage("Name must be between 2 and 15 characters"),
  body("password")
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
