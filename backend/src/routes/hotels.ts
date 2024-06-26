import express from "express";
import {
  getHotels,
  getHotel,
  createPaymentIntent,
} from "../controllers/hotels";
import { param } from "express-validator";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get("/search", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is Required")],
  validationMiddleware,
  getHotel
);

router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  createPaymentIntent
);
export default router;
