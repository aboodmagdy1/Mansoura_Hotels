import express from "express";
import verifyToken from "../middlewares/auth";
import { getBookings } from "../controllers/my-bookings";

const router = express.Router();

router.get("/", verifyToken, getBookings);

export default router;
