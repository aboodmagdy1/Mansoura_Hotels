import express from "express";
import { loginController, verifyTokenController } from "../controllers/auth";
import { loginValidator } from "../utils/validators/loginValidator";
import verifyTokenMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/login", loginValidator, loginController);
router.get("/validate-token", verifyTokenMiddleware, verifyTokenController);

export default router;
