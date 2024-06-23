import express from "express";
import { currentLoggedUser, registerController } from "./../controllers/user";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post("/register", registerController);
router.get("/me", verifyToken, currentLoggedUser);

export default router;
