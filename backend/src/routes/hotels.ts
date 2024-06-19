import express from "express";
import { getHotels, getHotel } from "../controllers/hotels";
import { param } from "express-validator";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const router = express.Router();

router.get("/search", getHotels);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel Id is Required")],
  validationMiddleware,
  getHotel
);

export default router;
