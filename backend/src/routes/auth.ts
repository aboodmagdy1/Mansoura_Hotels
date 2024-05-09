import express from "express";
import {
  loginController,
  verifyTokenController,
  logoutController,
} from "../controllers/auth";
import { loginValidator } from "../utils/validators/loginValidator";
import verifyTokenMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/sign-in", loginValidator, loginController);
router.post("/logout", logoutController);
router.get("/validate-token", verifyTokenMiddleware, verifyTokenController);

export default router;
