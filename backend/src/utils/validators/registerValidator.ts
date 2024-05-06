import { check } from "express-validator";
import { validationMiddleware } from "../../middlewares/validationMiddleware";

// check is a middleware so we pass to the route array of middlewares
export const registerValidator = [
  check("firstName", "First Name is required").isString(),
  check("lastName", "Last Name is required").isString(),
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  validationMiddleware,
];
