import express from "express";
import { loginController } from "../controllers/auth";
import { loginValidator } from "../utils/validators/loginValidator";

const router = express.Router();

router.post("/login", loginValidator, loginController);

export default router;
