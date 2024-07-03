import express from "express";
import verifyToken from "../middlewares/auth";
import { allHotels, approveHotel, getHotel } from "../controllers/admin";
import { allowedTo } from "../controllers/user";
const router = express.Router();

router.use(verifyToken, allowedTo("admin"));
router.get("/", allHotels);
router.get("/:hotelId", getHotel);
router.put("/:hotelId", approveHotel);

export default router;
