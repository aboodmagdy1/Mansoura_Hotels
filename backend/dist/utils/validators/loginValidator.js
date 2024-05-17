"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const validationMiddleware_1 = require("../../middlewares/validationMiddleware");
// check is a middleware so we pass to the route array of middlewares
exports.loginValidator = [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    validationMiddleware_1.validationMiddleware,
];