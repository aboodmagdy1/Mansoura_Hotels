"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const loginValidator_1 = require("../utils/validators/loginValidator");
const auth_2 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/sign-in", loginValidator_1.loginValidator, auth_1.loginController);
router.post("/logout", auth_1.logoutController);
router.get("/validate-token", auth_2.default, auth_1.verifyTokenController);
exports.default = router;
